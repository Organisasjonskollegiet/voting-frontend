import { Box, HStack } from '@chakra-ui/layout';
import React from 'react';
import { Role, VotationStatus } from '../../../__generated__/graphql-types';
import CustomTag from '../../common/CustomTag';
import DuplicateVotation from './DuplicateVotationButton';
import Hammer from '../../../static/hammer.svg';
import { EndedVotationProps } from './EndedVotation';
import CollapsedVotationRow from './CollapsedVotationRow';

const EndedVotationTemplate: React.FC<EndedVotationProps> = ({
  role,
  votation,
  duplicateVotation,
  children,
  onClick,
}) => {
  return (
    <Box key={votation.id} onClick={onClick} w="90vw" maxW="800px" h="56px" paddingLeft="1.25em" bg="white">
      <HStack
        h="100%"
        justifyContent="space-between"
        _hover={
          (role === Role.Admin || role === Role.Counter) && votation.status === VotationStatus.PublishedResult
            ? { cursor: 'pointer' }
            : {}
        }
        pr={role !== Role.Admin ? '1.5em' : '0'}
      >
        <HStack flex="1" justifyContent="space-between" opacity="0.5">
          <CollapsedVotationRow title={votation.title} index={votation.index} />
          <HStack ml="auto">
            {votation.status === VotationStatus.PublishedResult && (
              <HStack>
                <img alt="hammer" style={{ width: '24px', padding: '1em 0' }} src={Hammer} />
                {children}
              </HStack>
            )}
            {votation.status === VotationStatus.Invalid && <CustomTag bgColor="#b5bfca" text="Avbrutt" />}
          </HStack>
        </HStack>
        <Box opacity="0.5" _hover={{ opacity: '1' }}>
          {role === Role.Admin && <DuplicateVotation handleDuplicateVotation={() => duplicateVotation(votation)} />}
        </Box>
      </HStack>
    </Box>
  );
};

export default EndedVotationTemplate;
