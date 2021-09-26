import React from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Button, HStack } from '@chakra-ui/react';

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
    <HStack w="100%" justifyContent="space-between">
      <Button w={'250px'} rightIcon={<AddIcon w={3} h={3} />} borderRadius={'16em'} onClick={handleAddNewVotation}>
        Legg til votering
      </Button>
      <Button
        disabled={saveIsDisabled}
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