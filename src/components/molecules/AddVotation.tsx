import React, { useState } from 'react';
import { Heading, VStack, Text, Center, Divider, Button} from '@chakra-ui/react';
import AddMeetingVotationList from './AddMeetingVotationList'

const AddMeetingInformation: React.FC = () => {
 
  // const alternativeStyle = useStyleConfig('Alternative');

   const h1Style = {
    fontSize: '1.5em',
  }


  return (
    <>
      <VStack spacing='5' align='left'>
        <Heading sx={h1Style} as='h1'>Legg til møtesaker</Heading>
        <Text fontSize='20px'>Her kan du legge til informasjon om møtet. Saker kan også legges til på et senere tidspunkt.</Text>
      </VStack>
      <AddMeetingVotationList />
    </>
  )
   
};

export default AddMeetingInformation;