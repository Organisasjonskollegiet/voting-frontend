import React, { useEffect, useState } from 'react';
import { Heading, VStack, Text, useToast } from '@chakra-ui/react';
import AddMeetingVotationList from './AddMeetingVotationList'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { MajorityType, useCreateVotationsMutation, useUpdateVotationsMutation } from '../../__generated__/graphql-types';
import AddMeetingController from './AddMeetingController';
import Loading from '../atoms/Loading';
import { h1Style } from '../particles/formStyles'
import {v4 as uuid} from 'uuid'
import { Votation } from '../../types/types'

interface IProps {
  meetingId: string;
  onVotationsCreated: () => void;
  handlePrevious: () => void;
  isActive: boolean;
}


const initialVotationValues = [{
    id: uuid(),
    title: '',
    description: '',
    index: 1,
    alternatives: [{
      id: uuid(),
      text: '',
      index: 0
    }],
    blankVotes: false,
    hiddenVotes: false,
    severalVotes: false,
    majorityType: 'SIMPLE' as MajorityType,
    majorityThreshold: 50,
    existsInDb: false
  }];


const AddVotations: React.FC<IProps> = ({ isActive, meetingId, handlePrevious, onVotationsCreated }) => {

  const [createVotations, createVotationsResult] = useCreateVotationsMutation();

  const [updateVotations, updateVotationsResult] = useUpdateVotationsMutation();
  
  const [state, setState] = useState({ votations: initialVotationValues });

  const toast = useToast();

  useEffect(() => {
    if (!createVotationsResult.data?.createVotations || !updateVotationsResult.data?.updateVotations) return;
    toast({
      title: "Voteringer oppdatert.",
      description: "Voteringene har blitt opprettet",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
    const votations = [...createVotationsResult.data.createVotations, ...updateVotationsResult.data.updateVotations].map(votation => {
      return {
        ...votation,
        existsInDb: true
      }
    }) as Votation[]
    setState({ votations: votations.sort((a, b) => a.index - b.index) })
    onVotationsCreated();
  }, [createVotationsResult.data?.createVotations, updateVotationsResult.data?.updateVotations])

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const votations = reorder(
      state.votations,
      result.source.index,
      result.destination.index
    );

    const updatedVotations: Votation[] = votations.map((votation, index) => {
      return {
        ...votation,
        index: index
      }
    })

    setState({ votations: updatedVotations});
  }

  const onVotationsUpdated = (votations: Votation[]) => {
    setState({ votations })
  }

  const isValidVotation = (votation: Votation) => {
    return (
      votation.title !== '' &&
      votation.description !== ''
    )
  }

  const handleCreateVotations = (votations: Votation[]) => {
    const preparedVotations = votations.map(votation => {
      return {
        title: votation.title, 
        description: votation.title,
        index: votation.index,
        blankVotes: votation.blankVotes,
        hiddenVotes: votation.hiddenVotes,
        severalVotes: votation.severalVotes,
        majorityType: votation.majorityType,
        majorityThreshold: votation.majorityThreshold,
        alternatives: votation.alternatives
          .map(alternative => 
            alternative.text)
          .filter(alternative => 
            alternative !== '')
      }
    });
    console.log("create", preparedVotations)
    createVotations({variables: {votations: preparedVotations, meetingId }})
  }

  const handleUpdateVotations = (votations: Votation[]) => {
    const preparedVotations = votations.map(votation => {
      return {
        id: votation.id,
        title: votation.title, 
        description: votation.title,
        index: votation.index,
        blankVotes: votation.blankVotes,
        hiddenVotes: votation.hiddenVotes,
        severalVotes: votation.severalVotes,
        majorityType: votation.majorityType,
        majorityThreshold: votation.majorityThreshold,
        alternatives: votation.alternatives
          .map(alternative => {
            return {
              id: alternative.id,
              text: alternative.text
            }
          })
          .filter(alternative => 
            alternative.text !== '') 
      }
    })
    updateVotations({ variables: { votations: preparedVotations } })
  }

  const handleNext = () => {
    let isValid = true;
    state.votations
      .forEach(votation => {
        isValid = isValid && isValidVotation(votation) 
      })
    if (!isValid) {
      toast({
        title: "Kan ikke opprette voteringer",
        description: "Alle voteringer må ha både tittel og beskrivelse",
        status: "error",
        duration: 9000,
        isClosable: true
      })
      return;
    }
    const votationsToCreate = state.votations.filter(votation => !votation.existsInDb);
    const votationsToUpdate = state.votations.filter(votation => votation.existsInDb);
    handleCreateVotations(votationsToCreate);
    handleUpdateVotations(votationsToUpdate);
  }

  console.log("state", state.votations)

  if (!isActive) return <></>

  return (
     <>
      {(createVotationsResult.loading || updateVotationsResult.loading) && <Loading asOverlay={true} text="Oppdaterer voteringer" />}
      <VStack spacing='5' align='left'>
        <Heading sx={h1Style} as='h1'>Legg til møtesaker</Heading>
        <Text fontSize='20px'>Her kan du legge til informasjon om møtet. Saker kan også legges til på et senere tidspunkt.</Text>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <AddMeetingVotationList votations={state.votations} updateVotations={onVotationsUpdated} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </VStack>
      <AddMeetingController handleNext={handleNext} showPrev={true} handlePrev={handlePrevious} activeTab={1}/>
    </>
  )
   
};

export default AddVotations;