import { CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { Button, Text, HStack, Box } from '@chakra-ui/react';
import React from 'react';
import { darkblue } from '../../styles/colors';

export interface ReviewStatus {
  status: boolean | undefined;
}

interface ReviewVotationProps {
  handleClick: (approved: boolean) => void;
  choice: boolean | undefined;
}

const ReviewVotation: React.FC<ReviewVotationProps> = ({ handleClick, choice }) => {
  return (
    <Box mr="4rem" maxW="100%">
      <Text fontWeight="bold">Gi din tilbakemelding: </Text>
      <HStack spacing="0" border={`1px solid ${darkblue}`} borderRadius="0.5rem" overflow="hidden">
        <Button
          leftIcon={<CloseIcon color="red" w="3.5" />}
          onClick={() => handleClick(false)}
          _focus={{ ...(choice === false && activeButton) }}
          sx={{ ...buttonStyles, ...(choice === false && activeButton) }}
          borderRight={`1px solid ${darkblue}`}
        >
          <Text mt="0.25rem" as="span" color="inherit">
            Ugyldig
          </Text>
        </Button>
        <Button
          variant="standard"
          leftIcon={<CheckIcon color="green" />}
          onClick={() => handleClick(true)}
          _focus={{ ...(choice === true && activeButton) }}
          sx={{ ...buttonStyles, ...(choice === true && activeButton) }}
        >
          <Text mt="0.25rem" as="span" color="inherit">
            Gyldig
          </Text>
        </Button>
      </HStack>
    </Box>
  );
};

export default ReviewVotation;

const buttonStyles = {
  borderRadius: 0,
  width: '175px',
  backgroundColor: 'white',
} as React.CSSProperties;

const activeButton = {
  boxShadow: `inset 0px 2px 8px ${darkblue}`,
  backgroundColor: '#F3F3F3',
  WebKitBoxShadow: `inset 0px 0px 10px ${darkblue}`,
  MozBoxShadow: `inset 0px 0px 10px ${darkblue}`,
} as React.CSSProperties;
