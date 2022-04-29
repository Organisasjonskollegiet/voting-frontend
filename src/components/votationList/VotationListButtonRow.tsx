import React from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Button, Divider, VStack } from '@chakra-ui/react';
import { lightblue, offwhite } from '../styles/colors';
import WrapStack from '../common/layout/WrapStack';

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
    <VStack position="sticky" bottom="0" w="100%" spacing="0" zIndex="10">
      <Divider mb="1rem" />
      <WrapStack
        breakpoint={600}
        w="100%"
        justifyContent="space-between"
        onClick={(e) => e.stopPropagation()}
        bg={offwhite}
        outline={`1rem solid ${offwhite}`}
      >
        <Button
          aria-label="Legg til votering"
          w={'200px'}
          bg={lightblue}
          leftIcon={<AddIcon w={3} h={3} />}
          borderRadius={'16em'}
          onClick={handleAddNewVotation}
        >
          Legg til votering
        </Button>
        <Button disabled={saveIsDisabled} variant="dark" w={'200px'} onClick={handleSave}>
          Lagre
        </Button>
      </WrapStack>
    </VStack>
  );
};

export default VotationListButtonRow;
