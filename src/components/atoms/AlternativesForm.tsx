import React, { useState } from 'react';
import { FormControl, FormLabel, VStack, HStack, Input, Button } from '@chakra-ui/react';
import RemoveIcon from '../../static/removeIcon.svg';
import AddIcon from '../../static/addIcon.svg';
import { v4 as uuid } from 'uuid';
import { labelStyle, inputStyle, pointerStyle, highlightedInputStyle } from '../particles/formStyles';
import { Votation, Alternative } from '../../types/types';

interface IProps {
  votation: Votation;
  updateVotation: (votation: Votation) => void;
  deleteAlternative: (alternativeId: string, votationId: string) => void;
}

const AlternativesForm: React.FC<IProps> = ({ votation, updateVotation, deleteAlternative }) => {
  const [nextIndex, setNextIndex] = useState<number>(
    Math.max(...votation.alternatives.map((alternative, index) => alternative.index ?? index)) + 1
  );

  const handleClickRemoveAlterantive = (alternative: Alternative) => {
    updateVotation({
      ...votation,
      alternatives: votation.alternatives.filter((a) => a.id !== alternative.id),
    });
    if (alternative.existsInDb) deleteAlternative(alternative.id, votation.id);
  };

  return (
    <FormControl>
      <FormLabel sx={labelStyle}>Svaralternativer</FormLabel>
      <VStack spacing="5" align="left">
        {votation.alternatives
          .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
          .map((alternative) => (
            <HStack key={alternative.id} spacing="4">
              <Input
                key={alternative.id}
                id={alternative.id}
                onChange={(event) => {
                  updateVotation({
                    ...votation,
                    isEdited: true,
                    alternatives: [
                      ...votation.alternatives.filter((a) => a.id !== alternative.id),
                      {
                        id: alternative.id,
                        existsInDb: alternative.existsInDb,
                        text: event.target.value,
                        index: alternative.index,
                      },
                    ],
                  });
                }}
                value={alternative.text}
                sx={inputStyle}
                _focus={highlightedInputStyle}
                placeholder="Navn på alternativ"
              />
              <img
                alt="remove"
                style={pointerStyle}
                src={RemoveIcon}
                onClick={() => handleClickRemoveAlterantive(alternative)}
              />
            </HStack>
          ))}
        <Button
          width="190px"
          fontWeight="normal"
          leftIcon={<img alt="add" src={AddIcon} />}
          bg="white"
          variant="link"
          onClick={() => {
            updateVotation({
              ...votation,
              isEdited: true,
              alternatives: [...votation.alternatives, { id: uuid(), text: '', existsInDb: false, index: nextIndex }],
            });
            setNextIndex(nextIndex + 1);
          }}
        >
          Legg til svaralternativ
        </Button>
      </VStack>
    </FormControl>
  );
};

export default AlternativesForm;
