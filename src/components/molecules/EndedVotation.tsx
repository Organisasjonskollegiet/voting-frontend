import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  IconButton,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Votation } from '../../types/types';
import { collapsedStyle, highlightedStyle } from '../particles/formStyles';
import { Role, VotationStatus } from '../../__generated__/graphql-types';
import Hammer from '../../static/hammer.svg';
import CustomTag from '../atoms/CustomTag';
import DuplicateIcon from '../../static/duplicateIcon.svg';

interface EndedVotationProps {
  votation: Votation;
  duplicateVotation: (votation: Votation) => void;
  role: Role | undefined;
}

const EndedVotation: React.FC<EndedVotationProps> = ({ votation, duplicateVotation, role }) => {
  return (
    <AccordionItem
      key={votation.id}
      sx={{ ...collapsedStyle, padding: '0' }}
      mb="1.5em"
      _disabled={{ ...collapsedStyle, padding: '0' }}
    >
      <HStack w="90vw" maxWidth="800px" justifyContent="space-between" pr={role === Role.Admin ? '0' : '1.5em'}>
        <AccordionButton
          cursor={votation.alternatives.filter((a) => a.isWinner).length > 1 ? 'pointer' : 'default'}
          p="1em"
          pr="0"
          _hover={votation.alternatives.filter((a) => a.isWinner).length > 1 ? {} : { bg: 'white' }}
        >
          <HStack w="100%" justifyContent="space-between" bgColor="rgba(255, 255, 255, 0.5)">
            <HStack spacing="8" opacity="0.6">
              <Text sx={highlightedStyle}>{`${votation.index + 1}`}</Text>
              <Text>{votation.title}</Text>
            </HStack>
            <HStack ml="auto">
              {votation.status === VotationStatus.PublishedResult && (
                <HStack opacity="0.5">
                  <img alt="hammer" style={{ width: '24px' }} src={Hammer} />
                  <Text isTruncated maxWidth="150px">
                    {votation.alternatives.filter((a) => a.isWinner).length > 0
                      ? votation.alternatives
                          .filter((a) => a.isWinner)
                          .map(
                            (a, index) =>
                              `${a.text}${
                                index !== votation.alternatives.filter((a) => a.isWinner).length - 1 ? ', ' : ''
                              }`
                          )
                      : 'Ingen vinner'}
                  </Text>
                </HStack>
              )}
              {votation.status === VotationStatus.Invalid && <CustomTag bgColor="#b5bfca" text="Ugyldig" />}{' '}
            </HStack>
          </HStack>
          {votation.status === VotationStatus.PublishedResult &&
            votation.alternatives.filter((a) => a.isWinner).length > 1 && <AccordionIcon ml="0.5rem" />}
        </AccordionButton>
        {role === Role.Admin && (
          <Tooltip label="Dupliser votering">
            <IconButton
              aria-label="Dupliser votering"
              h="fit-content"
              bg={'white'}
              p="1em"
              borderRadius="4px"
              onClick={() => duplicateVotation(votation)}
              icon={<img alt="duplicate" src={DuplicateIcon} style={{ padding: '1em 0' }} />}
            />
          </Tooltip>
        )}
      </HStack>
      <AccordionPanel>
        <HStack alignItems="flex-end">
          <Text fontWeight="bold" fontSize="1rem">
            Vinnere:
          </Text>
          {votation.alternatives
            .filter((a) => a.isWinner)
            .map((a) => (
              <Text key={a.id} alignSelf="flex-end">
                {a.text}
              </Text>
            ))}
        </HStack>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default EndedVotation;
