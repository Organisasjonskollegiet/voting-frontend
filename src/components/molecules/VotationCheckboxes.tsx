import React from 'react'
import { FormControl, FormLabel, CheckboxGroup, VStack, Checkbox } from '@chakra-ui/react'
import { labelStyle, checkboxStyle } from '../particles/formStyles'
import { MajorityType } from '../../__generated__/graphql-types'


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
  votation: Votation;
  updateVotation: (votation: Votation) => void;
}

const VotationCheckboxes: React.FC<IProps> = ({ votation, updateVotation }) => {
  return (
    <FormControl>
      <FormLabel sx={labelStyle} marginBottom='30px'>
        Valgalternativer
      </FormLabel>
      <CheckboxGroup >
      <VStack spacing='5' align='left'>
          <Checkbox 
            sx={checkboxStyle} 
            isChecked={votation.blankVotes} 
            onChange={() => 
              updateVotation({
                ...votation, 
                blankVotes: !votation.blankVotes 
              })} 
            colorScheme='gray' 
            spacing='16px' 
            iconSize='150px'>
            Stemmer kan være blanke
          </Checkbox>
          <Checkbox 
            sx={checkboxStyle} 
            isChecked={votation.hiddenVotes} 
            onChange={() => 
              updateVotation({
                ...votation, 
                hiddenVotes: !votation.hiddenVotes 
              })} 
            colorScheme='gray' 
            spacing='16px'>
            Skjult stemmeresultat
          </Checkbox>
          <Checkbox 
            sx={checkboxStyle} 
            isChecked={votation.severalVotes} 
            onChange={() => 
              updateVotation({
                ...votation, 
                severalVotes: !votation.severalVotes 
              })} 
            colorScheme='gray' 
            spacing='16px'>
            Tillat flere stemmer
          </Checkbox>
        </VStack>
      </CheckboxGroup>
    </FormControl>
  )
}

export default VotationCheckboxes;