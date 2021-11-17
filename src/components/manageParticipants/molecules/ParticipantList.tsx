import { Checkbox, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ParticipantOrInvite, Role } from '../../../__generated__/graphql-types';
import { boxShadow } from '../../styles/formStyles';
import SelectRole from '../atoms/SelectRole';
import ToggleVotingEligibility from '../atoms/ToggleVotingEligibility';
import { darkblue, lightblue } from '../../styles/colors';

interface ParticipantListProps {
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

const ParticipantList: React.FC<ParticipantListProps> = ({
  participants,
  selectedParticipantsEmails,
  toggleSelectedParticipant,
  changeParticipantRights,
  ownerEmail,
}) => {
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

  return (
    <VStack
      width="100%"
      backgroundColor="white"
      borderRadius="4px"
      boxShadow={boxShadow}
      spacing="0"
      overflowY="auto"
      maxH="15em"
      sx={customScrollbar}
    >
      {participants.length === 0 ? (
        <Text p="1em 2em">Kunne ikke finne noen deltagere som matchet søket</Text>
      ) : (
        participants.map((participant, index) => (
          <React.Fragment key={participant.email}>
            {index > 0 && <Divider width="100%" m="0.5em 0" />}
            <HStack key={participant.email} width="100%" justifyContent="space-between" p="1px" pl="1rem">
              <HStack spacing="2">
                <Checkbox
                  isChecked={selectedParticipantsEmails.includes(participant.email)}
                  onChange={() => toggleSelectedParticipant(participant.email)}
                  isDisabled={participant.email === ownerEmail}
                />
                <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                  {participant.email}
                </Text>
              </HStack>
              <HStack spacing="1em">
                <ToggleVotingEligibility
                  toggle={() => changeParticipantRights(participant, undefined, true)}
                  isChecked={participant.isVotingEligible}
                />
                <SelectRole
                  onChange={(role) => changeParticipantRights(participant, role)}
                  value={participant.role}
                  disabled={participant.email === ownerEmail}
                />
              </HStack>
            </HStack>
          </React.Fragment>
        ))
      )}
    </VStack>
  );
};

export default ParticipantList;
