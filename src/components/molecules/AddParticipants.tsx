import React, { useState } from 'react'
import { ParticipantInput, useAddParticipantsMutation } from '../../__generated__/graphql-types'
import { VStack, Heading, Text, useToast } from '@chakra-ui/react'
import AddMeetingController from './AddMeetingController'
import AddParticipantsForm from './AddParticipantsForm'
import Loading from '../atoms/Loading';
import { h1Style } from '../particles/formStyles'

interface IProps {
  meetingId: string | undefined;
  onParticipantsAdded: () => void;
  handlePrevious: (participants: ParticipantInput[]) => void;
  previouslyAddedParticipants: ParticipantInput[];
  isActive: boolean;
}

const AddParticipants: React.FC<IProps> = ({ isActive, meetingId, onParticipantsAdded, previouslyAddedParticipants, handlePrevious }) => {

  const [participants, setParticipants] = useState<ParticipantInput[]>(previouslyAddedParticipants);
  const [addParticipants, addParticipantsResult] = useAddParticipantsMutation();
  const toast = useToast();
  const handleAddParticipants = (newParticipants: ParticipantInput[]) => {
    setParticipants([...participants, ...newParticipants])
  }

  const handleNext = () => {
    if (!meetingId) return;
    addParticipants({
      variables: {
        meetingId, 
        participants
      }})
  }

  if (addParticipantsResult.data?.addParticipants){
    const toastId = 'participants-toast';
    if (toast.isActive(toastId)){
      toast({
        id: toastId,
        title: "Deltakere lagt til.",
        description: "Deltakerne har blitt lagt til møtet",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    }
    onParticipantsAdded();
  }

  if (!isActive) return <></>

  return (
    <>
    {(addParticipantsResult.loading) && 
        <Loading asOverlay={true} text='Legger til deltakere' />
      }
    <VStack spacing='5' align='left'>
      <Heading sx={h1Style} as='h1'>Inviter deltagere</Heading>
      <Text fontSize='20px'>Her kan du invitere deltagere og gi redigeringstilgang</Text>
    </VStack>
    <AddParticipantsForm 
      participants={participants} 
      handleAddParticipants={handleAddParticipants} />
    <AddMeetingController 
      handleNext={handleNext} 
      showPrev={true} 
      activeTab={2} 
      handlePrev={() => handlePrevious(participants)} /> 
    </>
  )
};

export default AddParticipants;