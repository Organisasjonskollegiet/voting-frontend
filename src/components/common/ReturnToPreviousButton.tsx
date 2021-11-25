import React from 'react';
import { Button, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

interface ReturnToPreviousButtonProps {
  onClick: () => void;
  text: string;
}

const ReturnToPreviousButton: React.FC<ReturnToPreviousButtonProps> = ({ onClick, text }) => {
  return (
    <Button w="fit-content" onClick={onClick} leftIcon={<ArrowBackIcon />}>
      <Text fontWeight="normal" fontSize="md" decoration="underline">
        {text}
      </Text>
    </Button>
  );
};

export default ReturnToPreviousButton;
