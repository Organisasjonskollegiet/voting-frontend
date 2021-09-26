import React from 'react';
import EndedVotationTemplate, { EndedVotationProps } from './EndedVotationTemplate';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, HStack, Text } from '@chakra-ui/react';
import { collapsedStyle } from '../../styles/formStyles';

const EndedVotation: React.FC<EndedVotationProps> = ({ votation, duplicateVotation, role }) => {
  const winners = votation.alternatives.filter((a) => a.isWinner);
  const numberOfWinners = winners.length;
  const winnerString =
    numberOfWinners > 0
      ? winners.map(
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
        <AccordionButton p="1em 0">
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
    <Box key={votation.id} sx={styles}>
      <EndedVotationTemplate votation={votation} duplicateVotation={duplicateVotation} role={role}>
        <Text isTruncated maxWidth="150px">
          {winnerString}
        </Text>
      </EndedVotationTemplate>
    </Box>
  );
};

export default EndedVotation;