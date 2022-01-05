import React, { useEffect, useRef, useState } from 'react';
import { Box, Text, Tooltip } from '@chakra-ui/react';
import { collapsedStyle } from '../../styles/formStyles';
import { Votation } from '../../../types/types';
import { Role } from '../../../__generated__/graphql-types';
import useScreenWidth from '../../../hooks/ScreenWidth';
import EndedVotationMobile from './EndedVotationMobile';
import EndedVotationTemplate from './EndedVotationTemplate';

export interface EndedVotationProps {
  votation: Votation;
  duplicateVotation: (votation: Votation) => void;
  role: Role | undefined;
  onClick: () => void;
}

const EndedVotation: React.FC<EndedVotationProps> = ({ votation, duplicateVotation, role, onClick }) => {
  const [isOverflown, setIsOverflown] = useState(false);
  const screenWidth = useScreenWidth();
  const isTouchDevice = () => {
    return window.matchMedia('(pointer: coarse)').matches;
  };
  const ref = useRef<HTMLDivElement>(null);

  const winners = votation.alternatives.filter((a) => a.isWinner);
  const numberOfWinners = winners.length;
  const winnerString =
    numberOfWinners > 0
      ? winners
          .map(
            (a, index) => `${a.text}${index < winners.length - 2 ? ', ' : index === winners.length - 2 ? ' og ' : ''}`
          )
          .reduce((a, b) => a + b)
      : 'Ingen vinner';

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    setIsOverflown(element.scrollWidth > element.clientWidth);
  }, [ref]);

  if (isTouchDevice()) {
    return (
      <EndedVotationMobile
        winnerString={winnerString}
        votation={votation}
        duplicateVotation={duplicateVotation}
        role={role}
        onClick={onClick}
      />
    );
  }

  return (
    <Box sx={endedVotationStyles}>
      <EndedVotationTemplate votation={votation} duplicateVotation={duplicateVotation} role={role} onClick={onClick}>
        <Tooltip label={winnerString} isDisabled={!isOverflown}>
          <Text isTruncated ref={ref} maxWidth={screenWidth > 500 ? '200px' : `${screenWidth - 300}px`}>
            {winnerString}
          </Text>
        </Tooltip>
      </EndedVotationTemplate>
    </Box>
  );
};

export const endedVotationStyles = {
  ...collapsedStyle,
  padding: 0,
  marginBottom: '1.5em',
};

export default EndedVotation;
