import React, { useState } from 'react';
import { Heading, VStack, Text} from '@chakra-ui/react';
import AddMeetingVotationList from './AddMeetingVotationList'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { MajorityType } from '../../__generated__/graphql-types';
import {v4 as uuid} from 'uuid'
import AddMeetingController from './AddMeetingController';

interface Alternative {
  id: number;
  text: string;
}

interface Votation {
  id: string;
  title: string;
  description: string;
  alternatives: Alternative[];
  blankVotes: boolean;
  hiddenVotes: boolean;
  severalVotes: boolean;
  majorityType: MajorityType;
  majorityThreshold: number;
}

const AddVotations: React.FC = () => {
 
  const initialValues = [{
    id: uuid(),
    title: '',
    description: '',
    alternatives: [{
      id: 1,
      text: ''
    }],
    blankVotes: false,
    hiddenVotes: false,
    severalVotes: false,
    majorityType: 'SIMPLE' as MajorityType,
    majorityThreshold: 50
  }];
  
  const [state, setState] = useState({ votations: initialValues });

   const h1Style = {
    fontSize: '1.5em',
  }

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

    setState({ votations });
  }

  const updateVotations = (votations: Votation[]) => {
    setState({votations})
  }

  const handleNext = () => {
    return null;
  }

  const handlePrev = () => {
    return null;
  }

  return (
     <>
      <VStack spacing='5' align='left'>
        <Heading sx={h1Style} as='h1'>Legg til møtesaker</Heading>
        <Text fontSize='20px'>Her kan du legge til informasjon om møtet. Saker kan også legges til på et senere tidspunkt.</Text>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <AddMeetingVotationList votations={state.votations} updateVotations={updateVotations} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </VStack>
      <AddMeetingController handleNext={handleNext} showPrev={true} handlePrev={handlePrev} activeTab={1}/>
    </>
  )
   
};

export default AddVotations;