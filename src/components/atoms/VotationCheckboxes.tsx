import React from 'react';
import { FormControl, FormLabel, CheckboxGroup, VStack, Checkbox } from '@chakra-ui/react';
import { labelStyle, checkboxStyle } from '../particles/formStyles';
import { Votation } from '../../types/types';

interface IProps {
  votation: Votation;
  updateVotation: (votation: Votation) => void;
}

const VotationCheckboxes: React.FC<IProps> = ({ votation, updateVotation }) => {
  return (
    <FormControl>
      <FormLabel sx={labelStyle} marginBottom="30px">
        Valgalternativer
      </FormLabel>
      <CheckboxGroup>
        <VStack spacing="5" align="left">
          <Checkbox
            sx={checkboxStyle}
            isChecked={votation.blankVotes}
            onChange={() =>
              updateVotation({
                ...votation,
                isEdited: true,
                blankVotes: !votation.blankVotes,
              })
            }
            colorScheme="gray"
            spacing="16px"
            iconSize="150px"
          >
            Stemmer kan være blanke
          </Checkbox>
          <Checkbox
            sx={checkboxStyle}
            isChecked={votation.hiddenVotes}
            onChange={() =>
              updateVotation({
                ...votation,
                isEdited: true,
                hiddenVotes: !votation.hiddenVotes,
              })
            }
            colorScheme="gray"
            spacing="16px"
          >
            Skjult stemmeresultat
          </Checkbox>
        </VStack>
      </CheckboxGroup>
    </FormControl>
  );
};

export default VotationCheckboxes;
