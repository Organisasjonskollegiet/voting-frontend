import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { labelStyle, inputStyle, highlightedInputStyle } from '../../styles/formStyles';
import { Votation } from '../../../types/types';
import { AutoResizeTextarea } from '../../common/AutosizeTextArea';

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
          _focus={highlightedInputStyle}
          value={votation.title}
          placeholder="F. eks. valg av neste styreleder"
        />
      </FormControl>
      <FormControl>
        <FormLabel sx={labelStyle}>Beskrivelse</FormLabel>
        <AutoResizeTextarea
          sx={inputStyle}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            updateVotation({
              ...votation,
              description: e.target.value,
              isEdited: true,
            })
          }
          _focus={highlightedInputStyle}
          minRows={1}
          value={votation.description}
          placeholder="Vi skal velge vår neste styreleder"
        />
      </FormControl>
    </>
  );
};

export default VotationInfoForm;
