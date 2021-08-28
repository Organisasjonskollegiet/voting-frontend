import { HStack, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Role } from '../../../__generated__/graphql-types';
import SelectRole from './SelectRole';
import { boxShadow } from '../../particles/formStyles';

interface InviteParticipantProps {
  selectRole: (role: Role) => void;
  onEnter: (email: string) => void;
  participantRole: Role;
}

const InviteParticipant: React.FC<InviteParticipantProps> = ({ selectRole, onEnter, participantRole }) => {
  const [email, setEmail] = useState<string>('');
  return (
    <HStack
      width="100%"
      style={{
        borderRadius: '4px',
        boxShadow,
        background: '#fff',
        zIndex: 10,
      }}
    >
      <Input
        width="80%"
        style={{ border: 'none' }}
        placeholder="Inviter deltaker med epostadresse"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(event) => {
          if (event.code === 'Enter') onEnter(email);
        }}
      />
      <SelectRole onChange={(role: Role) => selectRole(role)} value={participantRole} />
    </HStack>
  );
};

export default InviteParticipant;
