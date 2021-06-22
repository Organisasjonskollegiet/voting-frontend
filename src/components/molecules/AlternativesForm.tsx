import React, { useState } from 'react';
import { FormControl, FormLabel, VStack, HStack, Input, Button } from '@chakra-ui/react'
import RemoveIcon from  './removeIcon.svg'
import AddIcon from './addIcon.svg'
import { labelStyle, inputStyle, pointerStyle } from '../particles/formStyles'
import { MajorityType } from '../../__generated__/graphql-types'
import { Votation } from '../../types/types'
interface IProps {
  votation: Votation;
  updateVotation: (votation: Votation) => void;
}

const AlternativesForm: React.FC<IProps> = ({ votation, updateVotation }) => {
  
  const [nextId, setNextId] = useState<number>(2);

  return (
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
              <img 
                style={pointerStyle} 
                src={RemoveIcon} 
                onClick={() => 
                  updateVotation({
                    ...votation, 
                    alternatives: [
                      ...votation.alternatives
                      .filter(a => a.id !== alternative.id)
                    ]
                  })} />
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
  )
}

export default AlternativesForm;