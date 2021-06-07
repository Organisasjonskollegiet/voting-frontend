import React, { useState } from 'react'
import { VStack, FormControl, FormLabel, Input, Divider, Text, HStack, Box, Icon } from '@chakra-ui/react'
import { inputStyle, labelStyle } from '../particles/formStyles';
import UploadIcon from './uploadIcon.svg'

const AddParticipantsForm = () => {

  const [participants, setParticipants] = useState<string[]>([]);

  const onFileUpload = (event: any) => {
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      const emails: any[] = []
      const content = evt.target.result;
      const lines = content.split('\n').filter((line: any) => line.length > 0);
      const indexOfEmail = lines[0].split(',').map((content: any) => content.trim()).indexOf('email')
      for (let i = 1; i < lines.length; i++){
        const lineList = lines[i].split(',').filter((email: any) => email.trim().length > 0);
        const email = lineList[indexOfEmail]
        console.log(lineList);
        const emailExists = emails.indexOf(email) >= 0;
        if (email && !emailExists) emails.push(email)
      }
      setParticipants(emails);
    };
    reader.readAsText(file, 'UTF-8');
  }

  console.log(participants)

  return (
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
            <img src={UploadIcon} />
            <Text>
              Last opp deltagerliste fra CSV-fil
            </Text>
          </HStack>
        </FormLabel>
        <Input 
          sx={inputStyle}
          placeholder="Inviter deltaker med epostadresse"
        />
      </FormControl>
      <Divider m="3em 0" />
      <FormControl>
        <FormLabel sx={labelStyle}>
          Gi redigeringstilgang
        </FormLabel>
        <Input 
          sx={inputStyle}
          placeholder="Inviter administrator med epostadresse"
        />
      </FormControl>
    </VStack>
  )
}

export default AddParticipantsForm;