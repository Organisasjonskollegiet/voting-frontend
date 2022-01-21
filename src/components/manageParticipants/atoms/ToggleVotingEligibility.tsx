import { Switch } from '@chakra-ui/react';
import React from 'react';

interface ToggleVotingEligibilityProps {
  toggle: () => void;
  isChecked: boolean;
}

const ToggleVotingEligibility: React.FC<ToggleVotingEligibilityProps> = ({ toggle, isChecked }) => {
  return <Switch isChecked={isChecked} onChange={toggle} aria-label="Har stemmerett" />;
};

export default ToggleVotingEligibility;
