import React, { useEffect, useRef, useState } from 'react';
import EndedVotationTemplate, { EndedVotationProps } from './EndedVotationTemplate';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { collapsedStyle } from '../../styles/formStyles';
import AlternativesString from '../../common/AlternativesString';

const EndedVotation: React.FC<EndedVotationProps> = ({ votation, duplicateVotation, role }) => {
  const [isOverflown, setIsOverflown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const winners = votation.alternatives.filter((a) => a.isWinner);
  const numberOfWinners = winners.length;
  const winnerString =
    numberOfWinners > 0
      ? winners.map(
          (a, index) => `${a.text}${index !== votation.alternatives.filter((a) => a.isWinner).length - 1 ? ', ' : ''}`
        )
      : 'Ingen vinner';

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    setIsOverflown(element.scrollWidth > element.clientWidth);
  }, [ref]);

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
          <Tooltip label={winnerString} isDisabled={!isOverflown}>
            <Text ref={ref} isTruncated maxWidth="150px">
              {winnerString}
            </Text>
          </Tooltip>
          <AccordionIcon />
        </AccordionButton>
      </EndedVotationTemplate>

      <AccordionPanel>
        <HStack alignItems="flex-end" wrap="wrap">
          <Text fontWeight="bold" fontSize="1rem">
            Vinnere:
          </Text>
          <AlternativesString fontWeight="normal" alternatives={winners.map((w) => w.text)} />
        </HStack>
      </AccordionPanel>
    </AccordionItem>
  ) : (
    <Box key={votation.id} sx={styles}>
      <EndedVotationTemplate votation={votation} duplicateVotation={duplicateVotation} role={role}>
        <Tooltip label={winnerString} isDisabled={!isOverflown}>
          <Text isTruncated ref={ref} maxWidth="150px">
            {winnerString}
          </Text>
        </Tooltip>
      </EndedVotationTemplate>
    </Box>
  );
};

export default EndedVotation;
