import React, { useState } from 'react';
import { Heading, VStack, Text} from '@chakra-ui/react';
import AddMeetingVotationList from './AddMeetingVotationList'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { MajorityType, useCreateVotationsMutation } from '../../__generated__/graphql-types';
import AddMeetingController from './AddMeetingController';
import Loading from '../atoms/Loading';

interface IProps {
  meetingId: string;
  votations: Votation[];
  onVotationsCreated: () => void;
  handlePrevious: (votations: Votation[]) => void;
}

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

const AddVotations: React.FC<IProps> = ({ meetingId, onVotationsCreated, votations, handlePrevious }) => {

  const [createVotations, result] = useCreateVotationsMutation();
  
  const [state, setState] = useState({ votations });

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
    setState({ votations })
  }

  const isValidVotation = (votation: Votation) => {
    return (
      votation.title !== '' &&
      votation.description !== ''
    )
  }

  const handleNext = () => {
    const filteredVotations = state.votations
      .filter(votation => 
        isValidVotation(votation)
      )
      .map(votation => 
        {
          return {
            title: votation.title, 
            description: votation.title,
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
    createVotations({variables: {votations: filteredVotations, meetingId }})
  }

  if (result.data) {
    onVotationsCreated()
  }

  return (
     <>
      {result.loading && <Loading asOverlay={true} text="Oppretter voteringer" />}
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
      <AddMeetingController handleNext={handleNext} showPrev={true} handlePrev={() => handlePrevious(votations)} activeTab={1}/>
    </>
  )
   
};

export default AddVotations;