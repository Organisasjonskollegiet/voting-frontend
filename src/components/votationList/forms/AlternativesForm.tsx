import React, { KeyboardEvent, useState } from 'react';
import {
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Input,
  Button,
  Tooltip,
  CloseButton,
  useToast,
} from '@chakra-ui/react';
import AddIcon from '../../../static/addIcon.svg';
import { v4 as uuid } from 'uuid';
import { labelStyle, inputStyle, highlightedInputStyle } from '../../styles/formStyles';
import { Votation, Alternative } from '../../../types/types';
import { useEffect } from 'react';

interface IProps {
  votation: Votation;
  updateVotation: (votation: Votation) => void;
  deleteAlternative: (alternativeId: string, votationId: string) => void;
}

const AlternativesForm: React.FC<IProps> = ({ votation, updateVotation, deleteAlternative }) => {
  const [nextIndex, setNextIndex] = useState<number>(
    Math.max(...votation.alternatives.map((alternative) => alternative.index)) + 1
  );

  const handleClickRemoveAlterantive = (alternative: Alternative) => {
    updateVotation({
      ...votation,
      alternatives: votation.alternatives.filter((a) => a.id !== alternative.id),
    });
    if (alternative.existsInDb) deleteAlternative(alternative.id, votation.id);
  };

  const [alternativeFocus, setAlternativeFocus] = useState<string | null>(null);

  const toast = useToast();

  useEffect(() => {
    if (alternativeFocus) {
      document.getElementById(alternativeFocus)?.focus();
      setAlternativeFocus(null);
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

  const handleAlternativeChange = (alternative: Alternative, event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.value.length < 256) {
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
    } else {
      toast({
        title: 'Alternativer kan maks ha 255 bokstaver.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <FormControl>
      <FormLabel sx={labelStyle}>Svaralternativer</FormLabel>
      <VStack spacing="5" align="left">
        {votation.alternatives
          .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
          .map((alternative) => (
            <HStack key={alternative.id}>
              <Input
                key={alternative.id}
                id={alternative.id}
                onKeyDown={onEnterSubmitAlternative}
                onChange={(e) => handleAlternativeChange(alternative, e)}
                value={alternative.text}
                sx={inputStyle}
                _focus={highlightedInputStyle}
                placeholder="Navn på alternativ"
              />
              <Tooltip label={'Fjern alternativ'}>
                <CloseButton onClick={() => handleClickRemoveAlterantive(alternative)}></CloseButton>
              </Tooltip>
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
