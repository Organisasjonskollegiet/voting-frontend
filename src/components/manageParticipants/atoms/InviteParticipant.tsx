import { Button, Flex, HStack, Input, useToast, Box, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Role } from '../../../__generated__/graphql-types';
import SelectRole from './SelectRole';
import { boxShadow } from '../../styles/formStyles';
import { checkIfEmailIsValid } from '../utils';
import useScreenWidth from '../../../hooks/ScreenWidth';

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

  const screenWidth = useScreenWidth();
  const hasReachedBreakpoint = screenWidth < 500;

  return (
    <Box>
      <label htmlFor="email">Inviter deltaker med epostadresse:</label>
      <HStack mt="0.5rem" w="100%" borderRadius="4px" bg="#fff" zIndex="10" sx={{ boxShadow }}>
        <Input
          id="email"
          w={hasReachedBreakpoint ? '100%' : '80%'}
          style={{ border: 'none' }}
          placeholder="deltager@vedtatt.no"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleOnEnter}
        />
        {!hasReachedBreakpoint && <SelectRole onChange={(role: Role) => selectRole(role)} value={participantRole} />}
      </HStack>
      <Flex flexDirection="column" justifyContent="space-between" alignItems="flex-start">
        {hasReachedBreakpoint && (
          <>
            <VStack spacing="1" alignItems="left" mt="1rem">
              <label htmlFor="standaloneSelectRole">Velg rolle:</label>
              <Box bgColor="white" sx={{ boxShadow }}>
                <SelectRole
                  onChange={(role: Role) => selectRole(role)}
                  value={participantRole}
                  id="standaloneSelectRole"
                />
              </Box>
            </VStack>
          </>
        )}

        <Button onClick={addParticipant} disabled={email === ''} variant="dark" mt="1rem">
          Legg til deltager
        </Button>
      </Flex>
    </Box>
  );
};

export default InviteParticipant;
