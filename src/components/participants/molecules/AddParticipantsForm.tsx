import React, { useState } from 'react';
import {
  ParticipantOrInvite,
  Role,
  useAddParticipantsMutation,
  useDeleteParticipantsMutation,
} from '../../../__generated__/graphql-types';
import { VStack, FormControl, FormLabel, Divider, HStack, Select, useToast } from '@chakra-ui/react';
import { labelStyle } from '../../particles/formStyles';
import Loading from '../../atoms/Loading';
import { useEffect } from 'react';
import { boxShadow } from '../../particles/formStyles';
import ParticipantList from './ParticipantList';
import SearchBar from '../atoms/SearchBar';
import InviteParticipant from '../atoms/InviteParticipant';
import { useCallback } from 'react';
import InviteParticipantByFileUpload from '../atoms/InviteParticipantByFileUpload';

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
  const [deleteParticipants, deleteParticipantsResult] = useDeleteParticipantsMutation();
  const [readingFiles, setReadingFiles] = useState<boolean>(false);
  const [inputRole, setInputRole] = useState<Role>(Role.Participant);
  const toast = useToast();

  useEffect(() => {
    if (!participants || !addParticipantsResult.data) return;
    const newParticipants = addParticipantsResult.data?.addParticipants as ParticipantOrInvite[];
    const nonUpdatedParticipants = participants.filter(
      (participant) => !newParticipants.map((p) => p.email).includes(participant.email)
    );
    const sortedParticipants = [...nonUpdatedParticipants, ...newParticipants].sort((a, b) =>
      a.email.localeCompare(b.email)
    );
    setParticipants(sortedParticipants);
    const toastId = 'participantsUpdated';
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        title: 'Deltakerlisten ble oppdatert',
        description: '',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line
  }, [addParticipantsResult.data]);

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
        duration: 9000,
        isClosable: true,
      });
    // eslint-disable-next-line
  }, [deleteParticipantsResult.data]);

  const getRole = (role: string) => {
    switch (role.toLowerCase().trim()) {
      case 'teller':
        return Role.Counter;
      case 'administrator' || 'admin':
        return Role.Admin;
      default:
        return Role.Participant;
    }
  };

  const addParticipantByEmail = (email: string) => {
    //TODO: validate email
    if (!email || email.trim().length === 0) return;
    const emailAlreadyAdded = participants.filter((participant) => participant.email === email).length > 0;
    if (!emailAlreadyAdded && meetingId) {
      addParticipants({
        variables: {
          meetingId,
          participants: [
            {
              email,
              role: inputRole,
              isVotingEligible: true,
            },
          ],
        },
      });
    }
  };

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReadingFiles(true);
    const input = event.target as HTMLInputElement;
    if (!(input.files && input.files.length > 0)) return;
    if (!meetingId) throw new Error('Meeting id not defined');
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (evt: ProgressEvent<FileReader>) => {
      const newParticipants: ParticipantOrInvite[] = [];
      if (!evt.target) return;
      const content = evt.target.result as string;
      if (!content) return;
      const lines = content.split('\n').filter((line: string) => line.length > 0);
      const firstRowArray = lines[0].split(',').map((content: string) => content.trim());
      const indexOfEmail = firstRowArray.indexOf('email');
      const indexOfRole = firstRowArray.indexOf('rolle');
      for (let i = 1; i < lines.length; i++) {
        const lineList = lines[i].split(',').filter((email: string) => email.trim().length > 0);
        const email = lineList[indexOfEmail];
        const role = indexOfRole === -1 ? Role.Participant : getRole(lineList[indexOfRole]);
        const emailExists = [...participants, ...newParticipants].map((p) => p.email).indexOf(email) >= 0;
        if (email && !emailExists) {
          newParticipants.push({
            email,
            role,
            isVotingEligible: true,
            // existsInDb: false,
          });
        }
      }
      addParticipants({
        variables: {
          meetingId,
          participants: newParticipants,
        },
      });
    };
    reader.readAsText(file, 'UTF-8');
    setReadingFiles(false);
  };

  const deleteParticipantByEmail = (email: string) => {
    deleteParticipants({ variables: { meetingId, emails: [email] } });
  };

  const changeParticipantsRights = (
    participant: ParticipantOrInvite,
    newRole?: Role,
    toggleVotingEligibility = false
  ) => {
    if (!meetingId) return;
    addParticipants({
      variables: {
        meetingId,
        participants: [
          {
            email: participant.email,
            role: newRole ?? participant.role,
            isVotingEligible: toggleVotingEligibility ? !participant.isVotingEligible : participant.isVotingEligible,
          },
        ],
      },
    });
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

  console.log('Rerenders ');

  return (
    <>
      {readingFiles && <Loading asOverlay={true} text="Henter deltakere fra fil" />}
      {addParticipantsResult.loading && <Loading asOverlay={true} text="Legger til deltaker" />}
      {deleteParticipantsResult.loading && <Loading asOverlay={true} text="Sletter deltaker" />}
      <VStack spacing="7">
        <FormControl>
          <FormLabel sx={labelStyle}>Inviter møtedeltagere</FormLabel>
          <InviteParticipantByFileUpload handleFileUpload={onFileUpload} />
          <InviteParticipant
            handleOnEnter={addParticipantByEmail}
            selectRole={(role: Role) => setInputRole(role)}
            participantRole={inputRole}
          />
        </FormControl>
        <Divider m="3em 0" />
        <FormControl>
          <FormLabel sx={labelStyle}>Administrer deltagere</FormLabel>
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
