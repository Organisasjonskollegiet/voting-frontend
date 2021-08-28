import { HStack, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Role } from '../../../__generated__/graphql-types';
import SelectRole from './SelectRole';
import { boxShadow } from '../../particles/formStyles';

interface InviteParticipantProps {
  selectRole: (role: Role) => void;
  inviteParticipant: (email: string) => boolean;
  participantRole: Role;
}

const InviteParticipant: React.FC<InviteParticipantProps> = ({ selectRole, inviteParticipant, participantRole }) => {
  const [email, setEmail] = useState<string>('');

  const handleOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      if (inviteParticipant(email)) {
        setEmail('');
      }
    }
  };

  return (
    <HStack w="100%" borderRadius="4px" bg="#fff" zIndex="10" sx={{ boxShadow }}>
      <Input
        w="80%"
        style={{ border: 'none' }}
        placeholder="Inviter deltaker med epostadresse"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleOnEnter}
      />
      <SelectRole onChange={(role: Role) => selectRole(role)} value={participantRole} />
    </HStack>
  );
};

export default InviteParticipant;
