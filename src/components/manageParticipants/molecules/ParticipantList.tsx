import { Checkbox, Flex, Table, HStack, Text, Th, Thead, Tr, Tbody, Td, VStack } from '@chakra-ui/react';
import React from 'react';
import { ParticipantOrInvite, Role } from '../../../__generated__/graphql-types';
import { boxShadow } from '../../styles/formStyles';
import SelectRole from '../atoms/SelectRole';
import ToggleVotingEligibility from '../atoms/ToggleVotingEligibility';
import { darkblue, lightblue } from '../../styles/colors';
import useScreenWidth from '../../../hooks/ScreenWidth';

interface ParticipantListRemakeProps {
  participants: ParticipantOrInvite[];
  ownerEmail: string | undefined;
  selectedParticipantsEmails: string[];
  toggleSelectedParticipant: (participantEmail: string) => void;

  changeParticipantRights: (
    participant: ParticipantOrInvite,
    role: Role | undefined,
    isVotingEligible?: boolean
  ) => void;
}

const ParticipantListRemake: React.FC<ParticipantListRemakeProps> = ({
  participants,
  selectedParticipantsEmails,
  toggleSelectedParticipant,
  changeParticipantRights,
  ownerEmail,
}) => {
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 600;

  return (
    <VStack
      width="100%"
      backgroundColor="white"
      borderRadius="4px"
      boxShadow={boxShadow}
      spacing="0"
      overflowY="auto"
      overflowX="scroll"
      maxH="15em"
      sx={customScrollbar}
      alignItems="left"
    >
      {participants.length === 0 ? (
        <Text p="1em 2em">Kunne ikke finne noen deltagere som matchet søket</Text>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th pl="1rem">
                <Text>Epost:</Text>
              </Th>
              <Th pl="1rem">
                <Text whiteSpace={isMobile ? undefined : 'nowrap'}>Har stemmerett?</Text>
              </Th>
              <Th pl={isMobile ? '1rem' : '3rem'}>
                <Text>Rolle:</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {participants.map((participant) => (
              <Tr key={participant.email}>
                <Td p="0" w="80%" maxW={isMobile ? '200px' : '45vw'} whiteSpace="nowrap">
                  <HStack spacing="2" pl="1rem">
                    <Checkbox
                      isChecked={selectedParticipantsEmails.includes(participant.email)}
                      onChange={() => toggleSelectedParticipant(participant.email)}
                      isDisabled={participant.email === ownerEmail}
                    />
                    <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                      {participant.email}
                    </Text>
                  </HStack>
                </Td>
                <Td p="0" pl="1rem">
                  <Flex justifyContent="center" pr="1rem">
                    <ToggleVotingEligibility
                      toggle={() => changeParticipantRights(participant, undefined, true)}
                      isChecked={participant.isVotingEligible}
                    />
                  </Flex>
                </Td>
                <Td p="0" pl={isMobile ? '0' : '2rem'}>
                  <SelectRole
                    onChange={(role) => changeParticipantRights(participant, role)}
                    value={participant.role}
                    disabled={participant.email === ownerEmail}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </VStack>
  );
};

const customScrollbar = {
  '&::-webkit-scrollbar': {
    width: '8px',
    borderRadius: '8px',
    backgroundColor: lightblue,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: darkblue,
    borderRadius: '8px',
  },
};

export default ParticipantListRemake;
