import React from 'react';
import { 
  VStack, 
  Divider, 
  HStack, 
  Text, 
  IconButton, 
  Box 
} from '@chakra-ui/react'
import MoveIcon from './moveIcon.svg'
import DeleteIcon from './deleteIcon.svg'
import DuplicateIcon from './duplicateIcon.svg'
import { MajorityType } from '../../__generated__/graphql-types';
import { Draggable } from 'react-beautiful-dnd'
import AlternativesForm from './AlternativesForm'
import VotationTypeSelect from './VotationTypeSelect'
import VotationCheckboxes from './VotationCheckboxes'
import VotationInfoForm from './VotationInfoForm';
import { collapsedStyle, hightlightedStyle, containerStyle } from '../particles/formStyles'

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

interface IProps {
  index: number;
  isActive: boolean;
  votation: Votation;
  toggleCollapsedVotation: () => void;
  updateVotation: (votation: Votation) => void;
  deleteVotation: (id: string) => void;
  duplicateVotation: (votation: Votation) => void;
}

const AddVotationForm: React.FC<IProps> = ({ votation, index, isActive, toggleCollapsedVotation, updateVotation, deleteVotation, duplicateVotation }) => {


  const updateVotationFromSelect = (value: string) => {
    switch (value) {
      case 'SIMPLE':
        updateVotation({...votation, majorityType: 'SIMPLE' as MajorityType})
        break;
      case 'QUALIFIED50':
        updateVotation({...votation, majorityType: 'QUALIFIED' as MajorityType, majorityThreshold: 50})
        break;
      case 'QUALIFIED67':
        updateVotation({...votation, majorityType: 'QUALIFIED' as MajorityType, majorityThreshold: 67})
        break;
      default:
        break;
    }
  }

  if (!isActive) {
    return (
      <Draggable draggableId={votation.id} index={index}>
      {provided => (
        <HStack 
          ref={provided.innerRef}
          {...provided.draggableProps}
          justify="space-between" 
          marginBottom='16px'
          sx={collapsedStyle} 
          onClick={toggleCollapsedVotation}
         >
            <HStack spacing="8">
              <Text sx={hightlightedStyle}>{`Sak ${index + 1}`}</Text>
              <Text>{votation.title}</Text>
            </HStack>
          <img {...provided.dragHandleProps}  src={MoveIcon} /> 
        </HStack>
      )}
    </Draggable>
  )}

  return (
    <Draggable isDragDisabled={true} draggableId={votation.id} index={index}>
      {(provided) => (
        <VStack
          sx={containerStyle}
          ref={provided.innerRef}
          {...provided.draggableProps}
          width='100%'
          spacing='5'
        >
        <HStack spacing='10' width='100%' align='start'>
          <VStack 
            spacing='7'
            flex='2'
          > 
            <VotationInfoForm 
              votation={votation} 
              updateVotation={updateVotation} />
            <AlternativesForm 
              votation={votation} 
              updateVotation={updateVotation} /> 
          </VStack>
          <VStack flex='1' spacing='7' align='left'>
            <VotationTypeSelect 
              votation={votation} 
              updateVotationFromSelect={updateVotationFromSelect} />
            <VotationCheckboxes 
              votation={votation}
              updateVotation={updateVotation} />
          </VStack>
        </HStack>
        <Divider m="3em 0" />
        <Box align='right' width='100%'>
          <IconButton aria-label="Slett møtesak" bg={'white'} onClick={() => deleteVotation(votation.id)} icon={<img src={DeleteIcon} />}/>
          <IconButton aria-label="Dupliser møtesak" bg={'white'} onClick={() => duplicateVotation(votation)} icon={<img src={DuplicateIcon} />}/>
        </Box>
        </VStack>
      )}
    </Draggable>
  )
}

export default AddVotationForm;