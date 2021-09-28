import React, { useState } from 'react';
import {
  ParticipantOrInvite,
  Role,
  useAddParticipantsMutation,
  useDeleteParticipantsMutation,
  useUpdateParticipantMutation,
} from '../../../__generated__/graphql-types';
import { VStack, FormControl, FormLabel, Divider, HStack, Select, useToast, Text } from '@chakra-ui/react';
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

interface IProps {
  meetingId: string;
  participants: ParticipantOrInvite[];
  setParticipants: (participants: ParticipantOrInvite[]) => void;
  ownerEmail: string | undefined;
}

enum SortingType {
  ASC = 'ASC',
  DESC = 'DESC',
}

const AddParticipantsForm: React.FC<IProps> = ({ meetingId, participants, setParticipants, ownerEmail }) => {
  const [addParticipants, addParticipantsResult] = useAddParticipantsMutation();
  const [updateParticipant, updateParticipantResult] = useUpdateParticipantMutation();
  const [deleteParticipants, deleteParticipantsResult] = useDeleteParticipantsMutation();
  const [readingFiles, setReadingFiles] = useState<boolean>(false);
  const [inputRole, setInputRole] = useState<Role>(Role.Participant);
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

  const deleteParticipantByEmail = (email: string) => {
    deleteParticipants({ variables: { meetingId, emails: [email] } });
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

  return (
    <>
      {readingFiles && <Loading asOverlay={true} text="Henter deltakere fra fil" />}
      {addParticipantsResult.loading && <Loading asOverlay={true} text="Legger til deltaker" />}
      {updateParticipantResult.loading && <Loading asOverlay={true} text="Oppdaterer deltaker" />}
      {deleteParticipantsResult.loading && <Loading asOverlay={true} text="Sletter deltaker" />}
      <VStack spacing="7">
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
          <Text mb="0.5em">{`Antall deltakere: ${participants.length}`}</Text>
          <HStack justifyContent="space-between" spacing="1em" mb="2em">
            <SearchBar value={searchInputValue} setInputValue={setSearchInputValue} />

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

          <ParticipantList
            participants={filteredParticipants}
            ownerEmail={ownerEmail}
            changeParticipantRights={changeParticipantsRights}
            deleteParticipant={deleteParticipantByEmail}
          />
        </FormControl>
      </VStack>
    </>
  );
};

export default AddParticipantsForm;
