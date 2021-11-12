import React from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Button, HStack } from '@chakra-ui/react';
import { boxShadow } from '../styles/formStyles';

interface VotationListButtonRowProps {
  handleAddNewVotation: () => void;
  saveIsDisabled: boolean;
  handleSave: () => void;
}

const VotationListButtonRow: React.FC<VotationListButtonRowProps> = ({
  handleAddNewVotation,
  saveIsDisabled,
  handleSave,
}) => {
  return (
    <HStack
      position="sticky"
      bottom="3rem"
      onClick={(e) => e.stopPropagation()}
      width="100%"
      zIndex="1"
      justifyContent="space-between"
    >
      <Button
        w={'250px'}
        boxShadow={boxShadow}
        rightIcon={<AddIcon w={3} h={3} />}
        borderRadius={'16em'}
        onClick={handleAddNewVotation}
      >
        Legg til votering
      </Button>
      <Button
        disabled={saveIsDisabled}
        boxShadow={boxShadow}
        bg="gray.500"
        color="white"
        w={'250px'}
        borderRadius={'16em'}
        onClick={handleSave}
      >
        Lagre endringer
      </Button>
    </HStack>
  );
};

export default VotationListButtonRow;
