import { Box, HStack, Text } from '@chakra-ui/layout';
import React from 'react';
import { Role, VotationStatus } from '../../__generated__/graphql-types';
import CustomTag from '../common/CustomTag';
import DuplicateVotation from './DuplicateVotation';
import Hammer from '../../static/hammer.svg';
import { Votation } from '../../types/types';
import CollapsedVotationRow from './CollapsedVotationRow';
import { collapsedStyle } from '../styles/formStyles';

export interface EndedVotationProps {
  votation: Votation;
  duplicateVotation: (votation: Votation) => void;
  role: Role | undefined;
  onClick: () => void;
}

const EndedVotationTemplate: React.FC<EndedVotationProps> = ({
  role,
  votation,
  duplicateVotation,
  children,
  onClick,
}) => {
  const styles = {
    ...collapsedStyle,
    padding: 0,
    paddingLeft: '1.25em',
    marginBottom: '1.5em',
  };
  return (
    <Box key={votation.id} onClick={onClick} w="90vw" maxW="800px" h="56px" sx={styles}>
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
        <HStack w="100%" justifyContent="space-between" bgColor="rgba(255, 255, 255, 0.5)" opacity="0.5">
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
        {role === Role.Admin && <DuplicateVotation handleDuplicateVotation={() => duplicateVotation(votation)} />}
      </HStack>
    </Box>
  );

  return (
    <HStack w="90vw" maxW="800px" h="56px" justifyContent="space-between" pr={role !== Role.Admin ? '1.5em' : '0'}>
      <HStack w="100%" justifyContent="space-between" bgColor="rgba(255, 255, 255, 0.5)" opacity="0.5">
        <CollapsedVotationRow title={votation.title} index={votation.index} />
        <HStack ml="auto">
          {votation.status === VotationStatus.PublishedResult && (
            <HStack>
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
