import { HStack, Text } from '@chakra-ui/layout';
import React from 'react';
import { Role, VotationStatus } from '../../../__generated__/graphql-types';
import CustomTag from '../../common/CustomTag';
import { highlightedStyle } from '../../styles/formStyles';
import DuplicateVotation from '../DuplicateVotation';
import Hammer from '../../../static/hammer.svg';
import { Votation } from '../../../types/types';

export interface EndedVotationProps {
  votation: Votation;
  duplicateVotation: (votation: Votation) => void;
  role: Role | undefined;
}

const EndedVotationTemplate: React.FC<EndedVotationProps> = ({ role, votation, duplicateVotation, children }) => {
  return (
    <HStack w="90vw" maxW="800px" h="56px" justifyContent="space-between" pr={role !== Role.Admin ? '1.5em' : '0'}>
      <HStack w="100%" justifyContent="space-between" bgColor="rgba(255, 255, 255, 0.5)">
        <HStack spacing="8" opacity="0.6">
          <Text sx={highlightedStyle}>{`${votation.index + 1}`}</Text>
          <Text>{votation.title}</Text>
        </HStack>
        <HStack ml="auto">
          {votation.status === VotationStatus.PublishedResult && (
            <HStack opacity="0.5">
              <img alt="hammer" style={{ width: '24px', padding: '1em 0' }} src={Hammer} />
              {children}
            </HStack>
          )}
          {votation.status === VotationStatus.Invalid && <CustomTag bgColor="#b5bfca" text="Ugyldig" />}
        </HStack>
      </HStack>
      {role === Role.Admin && <DuplicateVotation handleDuplicateVotation={() => duplicateVotation(votation)} />}
    </HStack>
  );
};

export default EndedVotationTemplate;
