import React, { useState } from 'react';
import { 
  VStack, 
  FormControl,
  FormLabel, 
  Input, 
  Button, 
  Divider, 
  Checkbox, 
  CheckboxGroup, 
  HStack, 
  Text, 
  Select, 
  IconButton, 
  Box 
} from '@chakra-ui/react'
import { inputStyle } from './MeetingInformationForm'
import AddIcon from './addIcon.svg'
import MoveIcon from './moveIcon.svg'
import RemoveIcon from  './removeIcon.svg'
import DeleteIcon from './deleteIcon.svg'
import DuplicateIcon from './duplicateIcon.svg'
import { MajorityType } from '../../__generated__/graphql-types';
import { Draggable } from 'react-beautiful-dnd'

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

  const [nextId, setNextId] = useState<number>(2);

  const boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';

  const hightlightedStyle = {
    fontStyle: 'normal',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '150%',
  } as React.CSSProperties;

  const containerStyle = {
    boxShadow,
    backgroundColor: 'white',
    padding: '40px 40px 16px',
    borderRadius: '4px',
    marginBottom: '16px'
  } as React.CSSProperties

  const collapsedStyle = {
   boxShadow,
   backgroundColor: 'white', 
   padding: '16px 40px',
   borderRadius: '4px',
   cursor: 'pointer'
  }

  const labelStyle = {
    ...hightlightedStyle,
    marginBottom: '10px'
  } as React.CSSProperties

  const checkboxStyle = {
    boxShadow,
    width: '270px',
    height: '56px',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold'
  } as React.CSSProperties;

  const pointerStyle = {
    cursor: 'pointer'
  } as React.CSSProperties;

  const getOptionValue = (votation: Votation) => {
    switch (votation.majorityType){
      case 'SIMPLE': 
        return 'SIMPLE'
      case 'QUALIFIED':
        return votation.majorityThreshold === 50 ? 'QUALIFIED50' : 'QUALIFIED67'
      default: 
        return '0'
    }
  }

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
            <FormControl >
              <FormLabel sx={labelStyle}>
                Sakstittel
              </FormLabel>
              <Input sx={inputStyle} onChange={(e) => updateVotation({...votation, title: e.target.value})} value={votation.title} placeholder='Eg. Valg av neste styreleder' />
            </FormControl>
            <FormControl >
              <FormLabel sx={labelStyle}>
                Beskrivelse
              </FormLabel>
              <Input sx={inputStyle} onChange={(e) => updateVotation({...votation, description: e.target.value})} value={votation.description} placeholder='Eg. Valg av neste styreleder' />
            </FormControl>
            <FormControl >
              <FormLabel sx={labelStyle}>
                Svaralternativer
              </FormLabel>
              <VStack spacing='5' align='left'>
                {
                  votation.alternatives.sort((a, b) => a.id - b.id).map(alternative => 
                    <HStack spacing='4'>
                      <Input 
                        key={alternative.id}
                        onChange={(event) => {
                          updateVotation({...votation, alternatives: [...votation.alternatives.filter(a => a.id !== alternative.id), {id: alternative.id, text: event.target.value}]})
                        }}
                        value={alternative.text} 
                        sx={inputStyle} 
                        placeholder='Navn på alternativ' />
                      <img style={pointerStyle} src={RemoveIcon} onClick={() => updateVotation({...votation, alternatives: [...votation.alternatives.filter(a => a.id !== alternative.id)]})} />
                    </HStack>
                  )
                }
                <Button 
                  width='190px' 
                  fontWeight='normal'
                  leftIcon={<img src={AddIcon} />} 
                  bg='white' 
                  variant='link'
                  onClick={() => {
                    updateVotation({...votation, alternatives: [...votation.alternatives, {id: nextId, text: ''}]})
                    setNextId(nextId + 1)
                  }}
                >
                  Legg til svaralternativ
                </Button>
              </VStack>
            </FormControl>
          </VStack>
           <VStack flex='1' spacing='7' align='left'>
            <FormControl>
              <FormLabel sx={labelStyle}>
                Stemmeform
              </FormLabel>
              <Select boxShadow={boxShadow} value={getOptionValue(votation)} onChange={(event) => updateVotationFromSelect(event.target.value)} >
                <option value='SIMPLE' >Simpelt flertall</option>
                <option value='QUALIFIED50' >Kvalifisert flertall</option>
                <option value='QUALIFIED67' onChange={() => updateVotation({...votation, majorityType: 'QUALIFIED' as MajorityType, majorityThreshold: 67})}>Kvalifisert 2/3 flertall</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel sx={labelStyle} marginBottom='30px'>
                Valgalternativer
              </FormLabel>
              <CheckboxGroup >
              <VStack spacing='5' align='left'>
                  <Checkbox sx={checkboxStyle} isChecked={votation.blankVotes} onChange={() => updateVotation({...votation, blankVotes: !votation.blankVotes })} colorScheme='gray' spacing='16px' iconSize='150px'>
                    Stemmer kan være blanke
                  </Checkbox>
                  <Checkbox sx={checkboxStyle} isChecked={votation.hiddenVotes} onChange={() => updateVotation({...votation, hiddenVotes: !votation.hiddenVotes })} colorScheme='gray' spacing='16px'>
                    Skjult stemmeresultat
                  </Checkbox>
                  <Checkbox sx={checkboxStyle} isChecked={votation.severalVotes} onChange={() => updateVotation({...votation, severalVotes: !votation.severalVotes })} colorScheme='gray' spacing='16px'>
                    Tillat flere stemmer
                  </Checkbox>
                </VStack>
              </CheckboxGroup>
            </FormControl>
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