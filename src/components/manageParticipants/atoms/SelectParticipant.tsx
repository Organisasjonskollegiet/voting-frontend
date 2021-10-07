import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Checkbox } from '@chakra-ui/react';

interface SelectParticipantProps {
  checked: boolean;
  onChange: () => void;
  participantEmail: string;
}

const SelectParticipant: React.FC<SelectParticipantProps> = ({ checked, onChange, participantEmail }) => {
  const { user } = useAuth0();

  return <Checkbox isChecked={checked} onChange={onChange} isDisabled={user?.email === participantEmail} />;
};

export default SelectParticipant;
