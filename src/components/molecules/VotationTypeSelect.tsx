import React from 'react'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import { labelStyle, boxShadow } from '../particles/formStyles'
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
  updateVotationFromSelect: (votation: string) => void;
}

const VotationTypeSelect: React.FC<IProps> = ({ votation, updateVotationFromSelect }) => {

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

  return (
    <FormControl>
      <FormLabel sx={labelStyle}>
        Stemmeform
      </FormLabel>
      <Select boxShadow={boxShadow} value={getOptionValue(votation)} onChange={(event) => updateVotationFromSelect(event.target.value)} >
        <option value='SIMPLE' >Simpelt flertall</option>
        <option value='QUALIFIED50' >Kvalifisert flertall</option>
        <option value='QUALIFIED67' >Kvalifisert 2/3 flertall</option>
      </Select>
    </FormControl>
  )
}

export default VotationTypeSelect;