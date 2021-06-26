import React, { useState } from 'react'
import { ParticipantInput, Role } from '../../__generated__/graphql-types'
import { VStack, FormControl, FormLabel, Input, Divider, Text, HStack } from '@chakra-ui/react'
import { inputStyle, labelStyle } from '../particles/formStyles';
import UploadIcon from './uploadIcon.svg'
import Loading from '../atoms/Loading';

interface IProps {
  participants: ParticipantInput[];
  handleAddParticipants: (participants: ParticipantInput[]) => void;
}

const AddParticipantsForm: React.FC<IProps> = ({ handleAddParticipants, participants }) => {

  const [readingFiles, setReadingFiles] = useState<boolean>(false);

  const getRole = (role: string) => {
    switch (role.toLowerCase().trim()) {
      case 'teller':
        return Role.Counter;
      case 'administrator' || 'admin':
        return Role.Admin;
      default:
        return Role.Participant;
    }
  }

  const handleEnterPressed = (event: any, elementId: string, participants: ParticipantInput[], role: Role) => {
    if (event.keyCode !== 13) return;
    const input = document.getElementById(elementId) as HTMLInputElement;
    if (!input || !input.value || input.value.trim().length === 0) return;
    const email = input.value;
    const emailAlreadyAdded = participants.filter(participant => participant.email === email).length > 0;
    if (!emailAlreadyAdded) {
      handleAddParticipants([{
        email,
        role,
        isVotingEligible: true,
      }])
    }
    input.value = '';
  }

  const onFileUpload = (event: any) => {
    setReadingFiles(true);
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      const participants: ParticipantInput[] = []
      const content = evt.target.result;
      const lines = content.split('\n').filter((line: string) => line.length > 0);
      const firstRowArray = lines[0].split(',').map((content: string) => content.trim())
      const indexOfEmail = firstRowArray.indexOf('email')
      const indexOfRole = firstRowArray.indexOf('rolle')
      for (let i = 1; i < lines.length; i++){
        const lineList = lines[i].split(',').filter((email: string) => email.trim().length > 0);
        const email = lineList[indexOfEmail]
        const role = indexOfRole === -1 ? Role.Participant : getRole(lineList[indexOfRole])
        const emailExists = participants.indexOf(email) >= 0;
        if (email && !emailExists) {
          participants.push({
            email, 
            role, 
            isVotingEligible: true 
          })
        }
      }
      handleAddParticipants(participants)
      setReadingFiles(false);
    };
    reader.readAsText(file, 'UTF-8');
  }

  return (
    <>
    {(readingFiles) && 
        <Loading asOverlay={true} text='Henter deltakere fra fil' />
      }
    <VStack spacing='7'>
      <FormControl>
        <FormLabel sx={labelStyle}>
          Inviter møtedeltagere
        </FormLabel>
        <FormLabel>
          <Input display="none" type='file' accept='text/csv' onChange={onFileUpload}/> 
          <HStack 
            sx={inputStyle} 
            maxWidth='320px'
            padding='8px'
            justify='center'
            borderRadius='4px'
            >
            <img alt="upload" src={UploadIcon} />
            <Text>
              Last opp deltagerliste fra CSV-fil
            </Text>
          </HStack>
        </FormLabel>
        <Input 
          id='participantInput'
          sx={inputStyle}
          placeholder="Inviter deltaker med epostadresse"
          onKeyDown={(event) => 
            handleEnterPressed(
              event, 
              'participantInput', 
              participants, 
              Role.Participant)}
        />
      </FormControl>
      <Divider m="3em 0" />
      <FormControl>
        <FormLabel sx={labelStyle}>
          Gi redigeringstilgang
        </FormLabel>
        <Input 
          id='adminInput'
          sx={inputStyle}
          placeholder="Inviter administrator med epostadresse"
          onKeyDown={(event) => 
            handleEnterPressed(
              event, 
              'adminInput', 
              participants,
              Role.Admin)}
        />
      </FormControl>
    </VStack>
    </>
  )
}

export default AddParticipantsForm;