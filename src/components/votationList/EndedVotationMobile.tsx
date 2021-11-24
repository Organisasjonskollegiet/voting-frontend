import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, HStack, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import useScreenWidth from '../../hooks/ScreenWidth';
import { EndedVotationProps, endedVotationStyles } from './EndedVotation';
import EndedVotationTemplate from './EndedVotationTemplate';

interface EndedVotationMobileProps extends EndedVotationProps {
  winnerString: string;
}

const EndedVotationMobile: React.FC<EndedVotationMobileProps> = ({
  winnerString,
  votation,
  role,
  duplicateVotation,
  onClick,
}) => {
  const screenWidth = useScreenWidth();
  const [isOverflown, setIsOverflown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    setIsOverflown(element.scrollWidth > element.clientWidth);
  }, [ref]);

  return isOverflown ? (
    <AccordionItem key={votation.id} border="none" sx={endedVotationStyles} marginBottom="1rem">
      <EndedVotationTemplate onClick={onClick} votation={votation} role={role} duplicateVotation={duplicateVotation}>
        <AccordionButton onClick={(e) => e.stopPropagation()} p="1em 0">
          <Text isTruncated ref={ref} maxWidth={screenWidth > 500 ? '200px' : `${screenWidth - 300}px`}>
            {winnerString}
          </Text>
          <AccordionIcon />
        </AccordionButton>
      </EndedVotationTemplate>

      <AccordionPanel>
        <HStack alignItems="flex-end" spacing="0" wrap="wrap">
          <Text fontWeight="bold" fontSize="1rem" marginRight="1">
            Vinnere:
          </Text>
          <Text>{winnerString}</Text>
        </HStack>
      </AccordionPanel>
    </AccordionItem>
  ) : (
    <Box key={votation.id} border="none" sx={endedVotationStyles}>
      <EndedVotationTemplate onClick={onClick} votation={votation} duplicateVotation={duplicateVotation} role={role}>
        <Text isTruncated ref={ref} maxWidth={screenWidth > 500 ? '200px' : `${screenWidth - 300}px`}>
          {winnerString}
        </Text>
      </EndedVotationTemplate>
    </Box>
  );
};

export default EndedVotationMobile;
