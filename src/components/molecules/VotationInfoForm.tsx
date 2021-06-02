import React from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { labelStyle, inputStyle } from '../particles/formStyles'
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

const VotationInfoForm: React.FC<IProps> = ({ votation, updateVotation }) => {
  return (
    <>
      <FormControl >
        <FormLabel sx={labelStyle}>
          Sakstittel
        </FormLabel>
        <Input 
          sx={inputStyle} 
          onChange={(e) => 
            updateVotation({
              ...votation, 
              title: e.target.value
            })} 
          value={votation.title} 
          placeholder='Eg. Valg av neste styreleder' />
      </FormControl>
      <FormControl >
        <FormLabel sx={labelStyle}>
          Beskrivelse
        </FormLabel>
        <Input 
          sx={inputStyle} 
          onChange={(e) => 
            updateVotation({
              ...votation, 
              description: e.target.value
            })} 
          value={votation.description} 
          placeholder='Eg. Valg av neste styreleder' />
      </FormControl>
    </>
  )
}

export default VotationInfoForm;