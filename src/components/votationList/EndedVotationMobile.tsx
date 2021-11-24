import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { EndedVotationProps } from './EndedVotation';
import EndedVotationTemplate from './EndedVotationTemplate';

interface EndedVotationMobileProps extends EndedVotationProps {
  numberOfWinners: number;
  winnerString: string;
}

const EndedVotationMobile: React.FC<EndedVotationMobileProps> = ({
  numberOfWinners,
  winnerString,
  votation,
  role,
  duplicateVotation,
  onClick,
}) => {
  return numberOfWinners > 1 ? (
    <AccordionItem key={votation.id} border="none">
      <EndedVotationTemplate onClick={onClick} votation={votation} role={role} duplicateVotation={duplicateVotation}>
        <AccordionButton onClick={(e) => e.stopPropagation()} p="1em 0">
          <Text isTruncated maxWidth="150px">
            {winnerString}
          </Text>
          <AccordionIcon />
        </AccordionButton>
      </EndedVotationTemplate>

      <AccordionPanel>
        <HStack alignItems="flex-end" wrap="wrap">
          <Text fontWeight="bold" fontSize="1rem">
            Vinnere:
          </Text>
          <Text>{winnerString}</Text>
        </HStack>
      </AccordionPanel>
    </AccordionItem>
  ) : (
    <Box key={votation.id} border="none">
      <EndedVotationTemplate onClick={onClick} votation={votation} duplicateVotation={duplicateVotation} role={role}>
        <Text isTruncated maxWidth="150px">
          {winnerString}
        </Text>
      </EndedVotationTemplate>
    </Box>
  );
};

export default EndedVotationMobile;
