import React from 'react'
import { VStack, Heading, Text } from '@chakra-ui/react'
import AddMeetingController from './AddMeetingController'
import AddParticipantsForm from './AddParticipantsForm'
import {h1Style} from '../particles/formStyles'


const AddParticipants: React.FC = () => {

  const handleNext = () => {
    return null
  }


  return (
    <>
    <VStack spacing='5' align='left'>
      <Heading sx={h1Style} as='h1'>Inviter deltagere</Heading>
      <Text fontSize='20px'>Her kan du invitere deltagere og gi redigeringstilgang</Text>
    </VStack>
    <AddParticipantsForm />
    <AddMeetingController handleNext={handleNext} showPrev={false} activeTab={2} /> 
    </>
  )
};

export default AddParticipants;