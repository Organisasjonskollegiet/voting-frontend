import { CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { Button, Text, HStack, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { darkblue } from '../../styles/theme';

enum ReviewStatus {
  Approved = 'APPROVED',
  Disapproved = 'DISAPPROVED',
  Pending = 'PENDING',
}

interface ReviewVotationProps {
  castVotationReview: (approved: boolean) => void;
}

const ReviewVotation: React.FC<ReviewVotationProps> = ({ castVotationReview }) => {
  const [activeChoice, setActiveChoice] = useState<ReviewStatus>(ReviewStatus.Pending);

  const handleClick = (approved: boolean) => {
    setActiveChoice(approved ? ReviewStatus.Approved : ReviewStatus.Disapproved);
    castVotationReview(approved);
  };

  return (
    <Box mr="4rem">
      <Text fontWeight="bold">Gi din tilbakemelding: </Text>
      <HStack spacing="0" border={`2px solid ${darkblue}`} borderRadius="0.5rem" overflow="hidden">
        <Button
          leftIcon={<CloseIcon color="red" w="3.5" />}
          onClick={() => handleClick(false)}
          sx={{ ...buttonStyles, ...(activeChoice === ReviewStatus.Disapproved && activeButton) }}
          borderRight={`2px solid ${darkblue}`}
        >
          <Text mt="0.25rem" as="span" color="inherit">
            Ugyldig
          </Text>
        </Button>
        <Button
          leftIcon={<CheckIcon color="green" />}
          onClick={() => handleClick(true)}
          sx={{ ...buttonStyles, ...(activeChoice === ReviewStatus.Approved && activeButton) }}
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
  boxShadow: `outset 0px 0px 20px ${darkblue}`,
} as React.CSSProperties;

const activeButton = {
  boxShadow: `inset 0px 0px 10px ${darkblue}`,
  WebKitBoxShadow: `inset 0px 0px 10px ${darkblue}`,
  MozBoxShadow: `inset 0px 0px 10px ${darkblue}`,
} as React.CSSProperties;
