import { Divider, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ParticipantOrInvite, Role } from '../../../__generated__/graphql-types';
import { boxShadow } from '../../particles/formStyles';
import { lightblue, darkblue } from '../../particles/theme';
import DeleteParticipant from '../atoms/DeleteParticipant';
import SelectRole from '../atoms/SelectRole';
import ToggleVotingEligibility from '../atoms/ToggleVotingEligibility';

interface ParticipantListProps {
  participants: ParticipantOrInvite[];
  ownerEmail: string | undefined;
  //TODO: fjerne undefined?

  deleteParticipant: (participantEmail: string) => void;
  changeParticipantRights: (
    participant: ParticipantOrInvite,
    role: Role | undefined,
    isVotingEligible?: boolean
  ) => void;
}

const ParticipantList: React.FC<ParticipantListProps> = ({
  participants,
  deleteParticipant,
  changeParticipantRights,
  ownerEmail,
}) => {
  return (
    <VStack
      width="100%"
      backgroundColor="white"
      borderRadius="4px"
      boxShadow={boxShadow}
      spacing="0"
      overflowY="scroll"
      maxH="15em"
      pr="3px"
      sx={{
        '&::-webkit-scrollbar': {
          width: '8px',
          borderRadius: '8px',
          backgroundColor: lightblue,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: darkblue,
          borderRadius: '8px',
        },
      }}
    >
      {participants.length === 0 ? (
        <Text p="1em 2em">Kunne ikke finne noen deltagere som matchet søket</Text>
      ) : (
        participants.map((participant, index) => (
          <React.Fragment key={participant.email}>
            {index > 0 && <Divider width="100%" m="0.5em 0" />}
            <HStack key={participant.email} width="100%" justifyContent="space-between" padding="0 0 0 16px">
              <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                {participant.email}
              </Text>
              <HStack spacing="1em">
                <ToggleVotingEligibility
                  onChange={() => changeParticipantRights(participant, undefined, true)}
                  defaultChecked={participant.isVotingEligible}
                />
                <SelectRole
                  onChange={(role) => changeParticipantRights(participant, role)}
                  value={participant.role}
                  disabled={ownerEmail === participant.email}
                />
                <DeleteParticipant
                  onClick={() => deleteParticipant(participant.email)}
                  disabled={ownerEmail === participant.email}
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
