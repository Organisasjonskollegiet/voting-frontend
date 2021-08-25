import React, { KeyboardEvent, useState } from 'react';
import { FormControl, FormLabel, VStack, HStack, Input, Button } from '@chakra-ui/react';
import RemoveIcon from '../../static/removeIcon.svg';
import AddIcon from '../../static/addIcon.svg';
import { v4 as uuid } from 'uuid';
import { labelStyle, inputStyle, pointerStyle, highlightedInputStyle } from '../particles/formStyles';
import { Votation, Alternative } from '../../types/types';
import { useEffect } from 'react';

interface IProps {
  votation: Votation;
  updateVotation: (votation: Votation) => void;
  deleteAlternative: (id: string) => void;
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
    if (alternative.existsInDb) deleteAlternative(alternative.id);
  };

  const [alternativeFocus, setAlternativeFocus] = useState<string | null>(null);

  useEffect(() => {
    if (alternativeFocus) {
      document.getElementById(alternativeFocus)?.focus();
    }
  }, [alternativeFocus, votation]);

  function addNewAlternative() {
    if (votation.alternatives.length === 0 || votation.alternatives[votation.alternatives.length - 1].text) {
      const newId = uuid();
      updateVotation({
        ...votation,
        isEdited: true,
        alternatives: [...votation.alternatives, { id: newId, text: '', existsInDb: false, index: nextIndex }],
      });
      setAlternativeFocus(newId);
      setNextIndex(nextIndex + 1);
    }
  }

  const onEnterSubmitAlternative = (e: KeyboardEvent) => {
    if (e.key === 'Enter') addNewAlternative();
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
                onKeyDown={onEnterSubmitAlternative}
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
              <button onClick={() => handleClickRemoveAlterantive(alternative)}>
                <img alt="remove" style={pointerStyle} src={RemoveIcon} />
              </button>
            </HStack>
          ))}
        <Button
          width="190px"
          fontWeight="normal"
          leftIcon={<img alt="add" src={AddIcon} />}
          bg="white"
          variant="link"
          onClick={() => addNewAlternative()}
        >
          Legg til svaralternativ
        </Button>
      </VStack>
    </FormControl>
  );
};

export default AlternativesForm;
