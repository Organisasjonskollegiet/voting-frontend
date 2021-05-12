import React, { useState } from 'react';
import { Heading, VStack, Text, Center, Divider, Button} from '@chakra-ui/react';
import MeetingInformationForm from './MeetingInformationForm'

const AddMeetingInformation: React.FC = () => {
 
  const [date, setDate] = useState<Date>(new Date())
  // const alternativeStyle = useStyleConfig('Alternative');

   const h1Style = {
    fontSize: '1.5em',
  }


  return (
    <>
      <VStack spacing='5' align='left'>
        <Heading sx={h1Style} as='h1'>Legg til møteinformasjon</Heading>
        <Text fontSize='20px'>Her kan du legge til informasjon om møtet </Text>
      </VStack>
      <MeetingInformationForm />
    </>
  )
   
};

export default AddMeetingInformation;