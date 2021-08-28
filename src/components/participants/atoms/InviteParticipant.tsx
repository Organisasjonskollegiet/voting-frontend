import { HStack, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Role } from '../../../__generated__/graphql-types';
import SelectRole from './SelectRole';
import { boxShadow } from '../../particles/formStyles';

interface InviteParticipantProps {
  selectRole: (role: Role) => void;
  handleOnEnter: (email: string) => void;
  participantRole: Role;
}

const InviteParticipant: React.FC<InviteParticipantProps> = ({ selectRole, handleOnEnter, participantRole }) => {
  const [email, setEmail] = useState<string>('');
  return (
    <HStack w="100%" borderRadius="4px" bg="#fff" zIndex="10" sx={{ boxShadow }}>
      <Input
        w="80%"
        style={{ border: 'none' }}
        placeholder="Inviter deltaker med epostadresse"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(event) => {
          if (event.code === 'Enter') handleOnEnter(email);
        }}
      />
      <SelectRole onChange={(role: Role) => selectRole(role)} value={participantRole} />
    </HStack>
  );
};

export default InviteParticipant;
