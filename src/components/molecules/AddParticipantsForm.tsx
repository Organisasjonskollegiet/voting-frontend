import React, { useState } from 'react';
import {
  ParticipantOrInvite,
  Role,
  useAddParticipantsMutation,
  useDeleteParticipantsMutation,
} from '../../__generated__/graphql-types';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Text,
  HStack,
  Select,
  useToast,
  Tooltip,
  CloseButton,
} from '@chakra-ui/react';
import { inputStyle, labelStyle } from '../particles/formStyles';
import UploadIcon from '../../static/uploadIcon.svg';
import Loading from '../atoms/Loading';
// import { ParticipantOrInvite } from '../../types/types';
import { useEffect } from 'react';
import { boxShadow } from '../particles/formStyles';

interface IProps {
  meetingId: string | undefined;
  participants: ParticipantOrInvite[];
  setParticipants: (participants: ParticipantOrInvite[]) => void;
  ownerEmail: string | undefined;
}

const AddParticipantsForm: React.FC<IProps> = ({ meetingId, participants, setParticipants, ownerEmail }) => {
  const [addParticipants, addParticipantsResult] = useAddParticipantsMutation();
  const [deleteParticipants, deleteParticipantsResult] = useDeleteParticipantsMutation();
  const [readingFiles, setReadingFiles] = useState<boolean>(false);
  const [inputRole, setInputRole] = useState<Role>(Role.Participant);
  const toast = useToast();
  const participantInputElementId = 'participantInput';

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
    const input = document.getElementById(participantInputElementId) as HTMLInputElement;
    input.value = '';
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

  const handleEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>, participants: ParticipantOrInvite[]) => {
    if (event.code !== 'Enter') return;
    const input = document.getElementById(participantInputElementId) as HTMLInputElement;
    if (!input || !input.value || input.value.trim().length === 0) return;
    const email = input.value;
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
          participants.push({
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

  return (
    <>
      {readingFiles && <Loading asOverlay={true} text="Henter deltakere fra fil" />}
      {addParticipantsResult.loading && <Loading asOverlay={true} text="Legger til deltaker" />}
      {deleteParticipantsResult.loading && <Loading asOverlay={true} text="Sletter deltaker" />}
      <VStack spacing="7">
        <FormControl>
          <FormLabel sx={labelStyle}>Inviter møtedeltagere</FormLabel>
          <FormLabel maxWidth="320px" w="30vw">
            <Input disabled={!meetingId} display="none" type="file" accept="text/csv" onChange={onFileUpload} />
            <HStack sx={inputStyle} _hover={{ cursor: 'pointer' }} padding="8px" justify="center" borderRadius="4px">
              <img alt="upload" src={UploadIcon} />
              <Text>Last opp deltagerliste fra CSV-fil</Text>
            </HStack>
          </FormLabel>
          <HStack
            width="100%"
            style={{
              borderRadius: '4px',
              boxShadow,
              background: '#fff',
              zIndex: 10,
            }}
          >
            <Input
              id={participantInputElementId}
              disabled={!meetingId}
              width="80%"
              style={{ border: 'none' }}
              placeholder="Inviter deltaker med epostadresse"
              onKeyDown={(event) => handleEnterPressed(event, participants)}
            />
            <Select
              value={inputRole}
              disabled={!meetingId}
              onChange={(e) => setInputRole(e.target.value as Role)}
              style={{ border: 'none' }}
              width="20%"
            >
              <option value={Role.Admin}>Administrator</option>
              <option value={Role.Counter}>Teller</option>
              <option value={Role.Participant}>Deltaker</option>
            </Select>
          </HStack>
        </FormControl>
        <Divider m="3em 0" />
        <VStack width="100%" backgroundColor="white" borderRadius="4px" boxShadow={boxShadow} spacing="0">
          {participants.length > 0 ? (
            participants
              .sort((a, b) => a.email.localeCompare(b.email))
              .map((participant, index) => (
                <React.Fragment key={participant.email}>
                  {index > 0 && <Divider width="100%" m="0.5em 0" />}
                  <HStack key={participant.email} width="100%" justifyContent="space-between" padding="0 0 0 16px">
                    <Text>{participant.email}</Text>
                    <HStack>
                      <Select
                        disabled={ownerEmail === participant.email || !meetingId}
                        width="10em"
                        value={participant.role}
                        onChange={(e) => {
                          if (!meetingId) return;
                          addParticipants({
                            variables: {
                              meetingId,
                              participants: [
                                {
                                  email: participant.email,
                                  role: e.target.value as Role,
                                  isVotingEligible: true,
                                },
                              ],
                            },
                          });
                        }}
                        style={{ border: 'none' }}
                      >
                        <option value={Role.Admin}>Administrator</option>
                        <option value={Role.Counter}>Teller</option>
                        <option value={Role.Participant}>Deltaker</option>
                      </Select>
                      <Tooltip label="Fjern deltager">
                        <CloseButton
                          onClick={() => {
                            if (!meetingId) return;
                            deleteParticipants({ variables: { meetingId, emails: [participant.email] } });
                          }}
                          disabled={ownerEmail === participant.email || !meetingId}
                          background="transparent"
                          _hover={{ background: 'transparent' }}
                          isActive={false}
                        ></CloseButton>
                      </Tooltip>
                    </HStack>
                  </HStack>
                </React.Fragment>
              ))
          ) : (
            <Text>Du har ikke lagt til noen deltakere</Text>
          )}
          )
        </VStack>
      </VStack>
    </>
  );
};

export default AddParticipantsForm;
