import React, { useState, useMemo } from 'react';
import {
  ParticipantOrInvite,
  Role,
  useAddParticipantsMutation,
  useDeleteParticipantsMutation,
  useGetAllowSelfRegistrationQuery,
  useUpdateMeetingMutation,
  useUpdateParticipantMutation,
} from '../../../__generated__/graphql-types';
import { VStack, FormControl, FormLabel, Divider, HStack, Select, useToast, Text, Flex } from '@chakra-ui/react';
import { labelStyle } from '../../styles/formStyles';
import Loading from '../../common/Loading';
import { useEffect } from 'react';
import { boxShadow } from '../../styles/formStyles';
import ParticipantList from './ParticipantList';
import SearchBar from '../atoms/SearchBar';
import InviteParticipant from '../atoms/InviteParticipant';
import { useCallback } from 'react';
import InviteParticipantByFileUpload from '../atoms/InviteParticipantByFileUpload';
import { checkIfEmailIsValid, onFileUpload } from '../utils';
import DeleteParticipants from '../atoms/DeleteParticipants';
import AllowSelfRegistrationSwitch from '../atoms/AllowSelfRegistrationSwitch';

interface IProps {
  meetingId: string;
  participants: ParticipantOrInvite[];
  setParticipants: (participants: ParticipantOrInvite[]) => void;
  ownerEmail: string | undefined;
  participantsLoading: boolean;
}

enum SortingType {
  ASC = 'ASC',
  DESC = 'DESC',
}

const AddParticipantsForm: React.FC<IProps> = ({
  meetingId,
  participants,
  setParticipants,
  ownerEmail,
  participantsLoading,
}) => {
  const [addParticipants, addParticipantsResult] = useAddParticipantsMutation();
  const [updateParticipant, updateParticipantResult] = useUpdateParticipantMutation();
  const [deleteParticipants, deleteParticipantsResult] = useDeleteParticipantsMutation();
  const [updateMeeting] = useUpdateMeetingMutation();
  const { data } = useGetAllowSelfRegistrationQuery({ variables: { meetingId } });
  const [allowSelfRegistration, setAllowSelfRegistration] = useState<boolean | undefined>(undefined);
  const [readingFiles, setReadingFiles] = useState<boolean>(false);
  const [inputRole, setInputRole] = useState<Role>(Role.Participant);
  const [selectedParticipantsEmails, setSelectedParticipantsEmails] = useState<string[]>([]);
  const toast = useToast();

  useEffect(() => {
    if (!participants || !deleteParticipantsResult.data) return;
    setParticipants(participants.filter((p) => !deleteParticipantsResult.data?.deleteParticipants?.includes(p.email)));
    const toastId = 'participantDeleted';
    if (!toast.isActive(toastId))
      toast({
        id: toastId,
        title: `Deltakeren ble slettet.`,
        description: '',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    // eslint-disable-next-line
  }, [deleteParticipantsResult.data]);

  useEffect(() => {
    if (allowSelfRegistration === undefined && data?.meetingById) {
      setAllowSelfRegistration(data.meetingById.allowSelfRegistration);
    }
  }, [data, allowSelfRegistration]);

  const addParticipantByEmail = async (email: string) => {
    if (checkIfEmailIsValid(email)) {
      const lowerCaseEmail = email.toLowerCase().trim();
      const emailAlreadyAdded = participants.filter((participant) => participant.email === lowerCaseEmail).length > 0;
      if (!emailAlreadyAdded && meetingId) {
        await addParticipants({
          variables: {
            meetingId,
            participants: [
              {
                email: lowerCaseEmail,
                role: inputRole,
                isVotingEligible: true,
              },
            ],
          },
        });
        setParticipants([...participants, { email: lowerCaseEmail, role: inputRole, isVotingEligible: true }]);
      } else if (emailAlreadyAdded) {
        const toastId = 'participantAdded';
        toast({
          id: toastId,
          title: 'Deltaker finnes allerede.',
          description: 'Det finnes allerede en deltaker med denne emailen.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      const toastId = 'invalidEmail';
      if (!toast.isActive(toastId))
        toast({
          id: toastId,
          title: `Ugyldig epostadresse`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
    }
  };

  const handleOnFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    const response = await onFileUpload(event, setReadingFiles, meetingId, participants);
    if (response) {
      const { newParticipants, invalidEmailsLineNumbers } = response;
      await addParticipants({
        variables: {
          meetingId,
          participants: newParticipants,
        },
      });
      setParticipants([...participants, ...newParticipants]);
      const toastId = 'invalidEmails';
      if (!toast.isActive(toastId) && invalidEmailsLineNumbers.length > 0)
        toast({
          id: toastId,
          title: `Ugyldige epostadresser`,
          description:
            'Epostadressene på følgende linjenummer er ugyldige og ble ikke lagt til: ' + invalidEmailsLineNumbers,
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      // after file is handled, remove it from input-field
      if (ref.current) ref.current.value = '';
    }
  };

  const deleteSelectedParticipants = () => {
    deleteParticipants({ variables: { meetingId, emails: [...selectedParticipantsEmails] } });
    setSelectedParticipantsEmails([]);
  };

  const toggleSelectedParticipant = (participantEmail: string) => {
    //TODO optimize
    const emailIndex = selectedParticipantsEmails.findIndex((email) => email === participantEmail);
    setSelectedParticipantsEmails(
      emailIndex >= 0
        ? selectedParticipantsEmails.filter((email) => email !== participantEmail)
        : [...selectedParticipantsEmails, participantEmail]
    );
  };

  const changeParticipantsRights = async (
    participant: ParticipantOrInvite,
    newRole?: Role,
    toggleVotingEligibility = false
  ) => {
    if (!meetingId) return;
    const participantInput = {
      email: participant.email,
      role: newRole ?? participant.role,
      isVotingEligible: toggleVotingEligibility ? !participant.isVotingEligible : participant.isVotingEligible,
    };
    await updateParticipant({
      variables: {
        meetingId,
        participant: participantInput,
      },
    });
    setParticipants([...participants.filter((p) => p.email !== participant.email), participantInput]);
  };

  const [ascVsDesc, setAscVsDesc] = useState<SortingType>(SortingType.ASC);
  const sortParticipantsAlphabetically = useCallback(() => {
    const reversed = ascVsDesc === SortingType.DESC;
    return [...participants].sort((a, b) =>
      reversed ? -a.email.localeCompare(b.email) : a.email.localeCompare(b.email)
    );
  }, [participants, ascVsDesc]);

  const [participantsCopy, setParticipantsCopy] = useState<ParticipantOrInvite[]>(sortParticipantsAlphabetically);
  useEffect(() => {
    setParticipantsCopy(sortParticipantsAlphabetically);
  }, [participants, ascVsDesc, sortParticipantsAlphabetically]);

  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [filteredParticipants, setFilteredParticipants] = useState<ParticipantOrInvite[]>(participants);
  useEffect(() => {
    setFilteredParticipants([...participantsCopy].filter((p) => p.email.includes(searchInputValue)));
  }, [searchInputValue, participantsCopy]);

  const toggleSelfRegistration = async () => {
    try {
      await updateMeeting({
        variables: { meeting: { id: meetingId, allowSelfRegistration: !allowSelfRegistration } },
      });
      toast({
        title: 'Tillatelse for selvregistrering oppdatert.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setAllowSelfRegistration(!allowSelfRegistration);
    } catch (error) {
      toast({
        title: 'Kunne ikke oppdatere tillatelse for selvregistrering.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const numberOfVotingEligibleParticipants = useMemo(() => participants.filter((p) => p.isVotingEligible).length, [
    participants,
  ]);

  return (
    <>
      {readingFiles && <Loading asOverlay text="Henter deltakere fra fil" />}
      {addParticipantsResult.loading && <Loading asOverlay text="Legger til deltaker" />}
      {updateParticipantResult.loading && <Loading asOverlay text="Oppdaterer deltaker" />}
      {deleteParticipantsResult.loading && <Loading asOverlay text="Sletter deltaker" />}
      <VStack spacing="7">
        <AllowSelfRegistrationSwitch
          toggleSelfRegistration={toggleSelfRegistration}
          allowSelfRegistration={allowSelfRegistration}
        />
        <FormControl>
          <FormLabel sx={labelStyle}>Inviter møtedeltagere</FormLabel>
          <InviteParticipantByFileUpload handleFileUpload={handleOnFileUpload} />
          <InviteParticipant
            inviteParticipant={addParticipantByEmail}
            selectRole={(role: Role) => setInputRole(role)}
            participantRole={inputRole}
          />
        </FormControl>
        <Divider m="3em 0" />
        <FormControl>
          <FormLabel sx={labelStyle}>Administrer deltagere</FormLabel>
          <Text mb="0.5em">{`Antall deltakere med stemmerett:  ${numberOfVotingEligibleParticipants} av ${participants.length}`}</Text>
          <HStack justifyContent="space-between" spacing="1em" mb="2em">
            <SearchBar setSearchValue={setSearchInputValue} />

            <Select
              onChange={(e) => setAscVsDesc(e.target.value as SortingType)}
              bg="white"
              boxShadow={boxShadow}
              w="200px"
            >
              <option value={SortingType.ASC}>A - Å</option>
              <option value={SortingType.DESC}>Å - A</option>
            </Select>
          </HStack>
          {participantsLoading ? (
            <Loading text="Henter deltagere." asOverlay />
          ) : (
            <ParticipantList
              participants={filteredParticipants}
              ownerEmail={ownerEmail}
              changeParticipantRights={changeParticipantsRights}
              selectedParticipantsEmails={selectedParticipantsEmails}
              toggleSelectedParticipant={toggleSelectedParticipant}
            />
          )}

          <Flex justifyContent="flex-start" borderRadius="4px" alignItems="center" w="100%" mt="1rem">
            <DeleteParticipants
              handleDeleteParticipants={deleteSelectedParticipants}
              disabled={selectedParticipantsEmails.length === 0}
              participantsToDelete={selectedParticipantsEmails}
            />
            <Text as="span" pr="1rem" pt="0.3rem">
              {selectedParticipantsEmails.length > 0
                ? `Valgt ${selectedParticipantsEmails.length} av ${participants.length} deltagere`
                : ''}
            </Text>
          </Flex>
        </FormControl>
      </VStack>
    </>
  );
};

export default AddParticipantsForm;
