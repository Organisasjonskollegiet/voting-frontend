import { Box, Button, VStack } from '@chakra-ui/react';
import React from 'react';

interface LobbyNavigationButtonProps {
  selected: boolean;
  text: string;
  onClick: () => void;
  isDisabled?: boolean;
}

const LobbyNavigationButton: React.FC<LobbyNavigationButtonProps> = ({ selected, text, isDisabled, onClick }) => {
  return (
    <VStack spacing="0">
      <Button _hover={{ bg: 'transparent' }} bg="transparent" disabled={isDisabled} onClick={onClick} fontSize="12px">
        {text}
      </Button>
      <Box
        h="4px"
        w="100%"
        borderBottom={`4px solid ${selected ? '#43679C' : 'rgba(0, 0, 0, 0)'}`}
        borderRadius="10px"
      />
    </VStack>
  );
};

export default LobbyNavigationButton;
