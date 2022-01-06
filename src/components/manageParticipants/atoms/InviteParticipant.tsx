import { Button, HStack, Input, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Role } from '../../../__generated__/graphql-types';
import SelectRole from './SelectRole';
import { boxShadow } from '../../styles/formStyles';
import { checkIfEmailIsValid } from '../utils';

interface InviteParticipantProps {
  selectRole: (role: Role) => void;
  inviteParticipant: (email: string) => void;
  participantRole: Role;
}

const InviteParticipant: React.FC<InviteParticipantProps> = ({ selectRole, inviteParticipant, participantRole }) => {
  const [email, setEmail] = useState<string>('');

  const toast = useToast();
  const addParticipant = () => {
    if (checkIfEmailIsValid(email)) {
      inviteParticipant(email);
      setEmail('');
    } else {
      toast({
        title: 'Epost er ikke gyldig',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      addParticipant();
    }
  };

  return (
    <>
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
      <Button onClick={addParticipant} disabled={email === ''} variant="dark" mt="1rem">
        Legg til deltager
      </Button>
    </>
  );
};

export default InviteParticipant;
