import { Checkbox } from '@chakra-ui/react';
import React from 'react';

interface SelectParticipantProps {
  checked: boolean;
  onChange: () => void;
}

const SelectParticipant: React.FC<SelectParticipantProps> = ({ checked, onChange }) => {
  return <Checkbox isChecked={checked} onChange={onChange} />;
};

export default SelectParticipant;
