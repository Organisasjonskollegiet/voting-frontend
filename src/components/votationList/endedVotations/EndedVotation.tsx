import React, { useEffect, useRef, useState } from 'react';
import EndedVotationTemplate, { EndedVotationProps } from './EndedVotationTemplate';
import { Box, Text, Tooltip } from '@chakra-ui/react';
import { collapsedStyle } from '../../styles/formStyles';

const EndedVotation: React.FC<EndedVotationProps> = ({ votation, duplicateVotation, role }) => {
  const [isOverflown, setIsOverflown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const winners = votation.alternatives.filter((a) => a.isWinner);
  const numberOfWinners = winners.length;
  const winnerString =
    numberOfWinners > 0
      ? winners.map(
          (a, index) => `${a.text}${index < winners.length - 2 ? ', ' : index === winners.length - 2 ? ' og ' : ''}`
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

  return (
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
