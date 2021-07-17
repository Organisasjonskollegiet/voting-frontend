import React, { useState } from 'react';
import { Role } from '../../__generated__/graphql-types';
import { VStack, FormControl, FormLabel, Input, Divider, Button, Text, HStack, Select } from '@chakra-ui/react';
import { inputStyle, labelStyle } from '../particles/formStyles';
import UploadIcon from '../../static/uploadIcon.svg';
import Loading from '../atoms/Loading';
import RemoveIcon from '../../static/removeIcon.svg';
import { ParticipantWorking } from '../../types/types';

interface IProps {
  participants: ParticipantWorking[];
  addOrUpdateParticipants: (addedParticipants: ParticipantWorking[]) => void;
  deleteParticipant: (participant: ParticipantWorking) => void;
}

const AddParticipantsForm: React.FC<IProps> = ({ participants, addOrUpdateParticipants, deleteParticipant }) => {
  const [readingFiles, setReadingFiles] = useState<boolean>(false);
  const [inputRole, setInputRole] = useState<Role>(Role.Participant);

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

  const handleEnterPressed = (
    event: React.KeyboardEvent<HTMLInputElement>,
    elementId: string,
    participants: ParticipantWorking[]
  ) => {
    if (event.code !== 'Enter') return;
    const input = document.getElementById(elementId) as HTMLInputElement;
    if (!input || !input.value || input.value.trim().length === 0) return;
    const email = input.value;
    const emailAlreadyAdded = participants.filter((participant) => participant.email === email).length > 0;
    if (!emailAlreadyAdded) {
      addOrUpdateParticipants([
        {
          email,
          role: inputRole,
          isVotingEligible: true,
          existsInDb: false,
        },
      ]);
    }
    input.value = '';
  };

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReadingFiles(true);
    const input = event.target as HTMLInputElement;
    if (!(input.files && input.files.length > 0)) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (evt: ProgressEvent<FileReader>) => {
      const newParticipants: ParticipantWorking[] = [];
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
            existsInDb: false,
          });
        }
      }
      addOrUpdateParticipants([...newParticipants]);
    };
    reader.readAsText(file, 'UTF-8');
    setReadingFiles(false);
  };

  return (
    <>
      {readingFiles && <Loading asOverlay={true} text="Henter deltakere fra fil" />}
      <VStack spacing="7">
        <FormControl>
          <FormLabel sx={labelStyle}>Inviter møtedeltagere</FormLabel>
          <FormLabel maxWidth="320px" w="30vw">
            <Input display="none" type="file" accept="text/csv" onChange={onFileUpload} />
            <HStack sx={inputStyle} _hover={{ cursor: 'pointer' }} padding="8px" justify="center" borderRadius="4px">
              <img alt="upload" src={UploadIcon} />
              <Text>Last opp deltagerliste fra CSV-fil</Text>
            </HStack>
          </FormLabel>
          <HStack
            width="100%"
            style={{
              borderRadius: '4px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              background: '#fff',
              zIndex: 10,
            }}
          >
            <Input
              id="participantInput"
              width="80%"
              style={{ border: 'none' }}
              placeholder="Inviter deltaker med epostadresse"
              onKeyDown={(event) => handleEnterPressed(event, 'participantInput', participants)}
            />
            <Select
              value={inputRole}
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
        <VStack
          width="100%"
          backgroundColor="white"
          borderRadius="4px"
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          m="3em 0"
          p="0.5em 0"
        >
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
                        width="10em"
                        value={participant.role}
                        onChange={(e) =>
                          addOrUpdateParticipants([
                            {
                              email: participant.email,
                              role: e.target.value as Role,
                              isVotingEligible: true,
                              existsInDb: participant.existsInDb,
                            },
                          ])
                        }
                        style={{ border: 'none' }}
                      >
                        <option value={Role.Admin}>Administrator</option>
                        <option value={Role.Counter}>Teller</option>
                        <option value={Role.Participant}>Deltaker</option>
                      </Select>
                      <Button
                        background="transparent"
                        _hover={{ background: 'transparent' }}
                        isActive={false}
                        leftIcon={<img alt="remove" src={RemoveIcon} onClick={() => deleteParticipant(participant)} />}
                      />
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
