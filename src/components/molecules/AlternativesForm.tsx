import React, { useState } from 'react';
import { FormControl, FormLabel, VStack, HStack, Input, Button } from '@chakra-ui/react'
import RemoveIcon from  './removeIcon.svg'
import AddIcon from './addIcon.svg'
import {v4 as uuid} from 'uuid'
import { labelStyle, inputStyle, pointerStyle } from '../particles/formStyles'
import { Votation } from '../../types/types'
import Alternative from '../atoms/Alternative';
interface IProps {
  votation: Votation;
  updateVotation: (votation: Votation) => void;
  deleteAlternative: (id: string) => void;
}

const AlternativesForm: React.FC<IProps> = ({ votation, updateVotation, deleteAlternative }) => {
  
  const [nextIndex, setNextIndex] = useState<number>(Math.max(...votation.alternatives.map(alternative => alternative.index)) + 1);

  const handleClickRemoveAlterantive = (id: string) => {
    updateVotation({
      ...votation,
      alternatives: votation.alternatives.filter(a => a.id !== id)
    })
    deleteAlternative(id)
  }

  return (
    <FormControl >
      <FormLabel sx={labelStyle}>
        Svaralternativer
      </FormLabel>
      <VStack spacing='5' align='left'>
        {
          votation.alternatives.sort((a, b) => a.index - b.index).map(alternative => 
            <HStack key={alternative.id} spacing='4'>
              <Input 
                key={alternative.id}
                id={alternative.id}
                onChange={(event) => {
                  updateVotation({...votation, isEdited: true, alternatives: [...votation.alternatives.filter(a => a.id !== alternative.id), {id: alternative.id, text: event.target.value, index: alternative.index}]})
                }}
                value={alternative.text} 
                sx={inputStyle} 
                placeholder='Navn på alternativ' />
              <img 
                alt="remove"
                style={pointerStyle} 
                src={RemoveIcon} 
                onClick={() => 
                  handleClickRemoveAlterantive(alternative.id)} />
            </HStack>
          )
        }
        <Button 
          width='190px' 
          fontWeight='normal'
          leftIcon={<img alt="add" src={AddIcon} />} 
          bg='white' 
          variant='link'
          onClick={() => {
            updateVotation({...votation, isEdited: true, alternatives: [...votation.alternatives, {id: uuid(), text: '', index: nextIndex}]})
            setNextIndex(nextIndex + 1)
          }}
        >
          Legg til svaralternativ
        </Button>
      </VStack>
    </FormControl>
  )
}

export default AlternativesForm;