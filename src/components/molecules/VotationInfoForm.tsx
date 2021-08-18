import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { labelStyle, inputStyle } from '../particles/formStyles';
import { Votation } from '../../types/types';

interface IProps {
  votation: Votation;
  updateVotation: (votation: Votation) => void;
}

const VotationInfoForm: React.FC<IProps> = ({ votation, updateVotation }) => {
  return (
    <>
      <FormControl>
        <FormLabel sx={labelStyle}>Tittel</FormLabel>
        <Input
          sx={inputStyle}
          onChange={(e) =>
            updateVotation({
              ...votation,
              title: e.target.value,
              isEdited: true,
            })
          }
          value={votation.title}
          placeholder="Eg. Valg av neste styreleder"
        />
      </FormControl>
      <FormControl>
        <FormLabel sx={labelStyle}>Beskrivelse</FormLabel>
        <Input
          sx={inputStyle}
          onChange={(e) =>
            updateVotation({
              ...votation,
              description: e.target.value,
              isEdited: true,
            })
          }
          value={votation.description}
          placeholder="Eg. Valg av neste styreleder"
        />
      </FormControl>
    </>
  );
};

export default VotationInfoForm;
