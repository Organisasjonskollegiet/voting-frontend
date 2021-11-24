import React, { useEffect, useRef, useState } from 'react';
import { Box, HStack, Text, Tooltip } from '@chakra-ui/react';
import { collapsedStyle } from '../styles/formStyles';
import { Votation } from '../../types/types';
import { Role, VotationStatus } from '../../__generated__/graphql-types';
import CustomTag from '../common/CustomTag';
import DuplicateVotation from './DuplicateVotation';
import Hammer from '../../static/hammer.svg';
import useScreenWidth from '../../hooks/ScreenWidth';
import CollapsedVotationRow from './CollapsedVotationRow';
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

  if (isTouchDevice() || true) {
    return (
      <EndedVotationMobile
        numberOfWinners={numberOfWinners}
        winnerString={winnerString}
        votation={votation}
        duplicateVotation={duplicateVotation}
        role={role}
        onClick={onClick}
      />
    );
  }

  return (
    <EndedVotationTemplate votation={votation} duplicateVotation={duplicateVotation} role={role} onClick={onClick}>
      <Tooltip label={winnerString} isDisabled={!isOverflown}>
        <Text isTruncated ref={ref} maxWidth={screenWidth > 500 ? '200px' : `${screenWidth - 300}px`}>
          {winnerString}
        </Text>
      </Tooltip>
    </EndedVotationTemplate>
  );

  // return (
  //   <Box key={votation.id} onClick={onClick} w="90vw" maxW="800px" h="56px" sx={styles}>
  //     <HStack
  //       h="100%"
  //       justifyContent="space-between"
  //       _hover={
  //         (role === Role.Admin || role === Role.Counter) && votation.status === VotationStatus.PublishedResult
  //           ? { cursor: 'pointer' }
  //           : {}
  //       }
  //       pr={role !== Role.Admin ? '1.5em' : '0'}
  //     >
  //       <HStack w="100%" justifyContent="space-between" bgColor="rgba(255, 255, 255, 0.5)" opacity="0.5">
  //         <CollapsedVotationRow title={votation.title} index={votation.index} />
  //         <HStack ml="auto">
  //           {votation.status === VotationStatus.PublishedResult && (
  //             <HStack opacity="0.5">
  //               <img alt="hammer" style={{ width: '24px', padding: '1em 0' }} src={Hammer} />
  //             </HStack>
  //           )}
  //           {votation.status === VotationStatus.Invalid && <CustomTag bgColor="#b5bfca" text="Avbrutt" />}
  //         </HStack>
  //       </HStack>
  //       {role === Role.Admin && <DuplicateVotation handleDuplicateVotation={() => duplicateVotation(votation)} />}
  //     </HStack>
  //   </Box>
  // );
};

export default EndedVotation;
