import { FormLabel, Text, Switch, HStack } from '@chakra-ui/react';
import React from 'react';

interface ToggleVotingEligibilityProps {
  toggle: () => void;
  isChecked: boolean;
}

const ToggleVotingEligibility: React.FC<ToggleVotingEligibilityProps> = ({ toggle, isChecked }) => {
  return (
    <HStack>
      <FormLabel mb="0">
        <Text whiteSpace="nowrap">Har stemmerett</Text>
      </FormLabel>
      <Switch isChecked={isChecked} onChange={toggle} aria-label="Har stemmerett" />
    </HStack>
  );
};

export default ToggleVotingEligibility;
