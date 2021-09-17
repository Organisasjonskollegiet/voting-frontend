import React from 'react';
import EndedVotationTemplate, { EndedVotationProps } from './EndedVotationTemplate';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, HStack, Text } from '@chakra-ui/react';
import { collapsedStyle } from '../../styles/formStyles';

const EndedVotation: React.FC<EndedVotationProps> = ({ votation, duplicateVotation, role }) => {
  const numberOfWinners = votation.alternatives.filter((a) => a.isWinner).length;
  const winner =
    votation.alternatives.filter((a) => a.isWinner).length > 0
      ? votation.alternatives
          .filter((a) => a.isWinner)
          .map(
            (a, index) => `${a.text}${index !== votation.alternatives.filter((a) => a.isWinner).length - 1 ? ', ' : ''}`
          )
      : 'Ingen vinner';

  const styles = {
    ...collapsedStyle,
    padding: 0,
    paddingLeft: '1.25em',
    marginBottom: '1.5em',
  };

  return numberOfWinners > 1 ? (
    <AccordionItem key={votation.id} sx={styles}>
      <EndedVotationTemplate votation={votation} role={role} duplicateVotation={duplicateVotation}>
        <AccordionButton>
          <Text isTruncated maxWidth="150px">
            {winner}
          </Text>
          <AccordionIcon />
        </AccordionButton>
      </EndedVotationTemplate>

      <AccordionPanel>
        <HStack alignItems="flex-end" wrap="wrap">
          <Text fontWeight="bold" fontSize="1rem">
            Vinnere:
          </Text>
          <Text>{winner}</Text>
        </HStack>
      </AccordionPanel>
    </AccordionItem>
  ) : (
    <Box key={votation.id} sx={styles}>
      <EndedVotationTemplate votation={votation} duplicateVotation={duplicateVotation} role={role}>
        <Text isTruncated maxWidth="150px">
          {winner}
        </Text>
      </EndedVotationTemplate>
    </Box>
  );
};

export default EndedVotation;
