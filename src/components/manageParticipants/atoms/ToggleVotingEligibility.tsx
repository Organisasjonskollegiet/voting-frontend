import { FormLabel, Text, Switch, HStack } from '@chakra-ui/react';
import React from 'react';

interface ToggleVotingEligibilityProps {
  onChange: () => void;
  defaultChecked: boolean;
}

const ToggleVotingEligibility: React.FC<ToggleVotingEligibilityProps> = ({ onChange, defaultChecked }) => {
  return (
    <HStack>
      <FormLabel mb="0">
        <Text whiteSpace="nowrap">Har stemmerett</Text>
      </FormLabel>
      <Switch onChange={() => onChange()} aria-label="Har stemmerett" defaultChecked={defaultChecked}></Switch>
    </HStack>
  );
};

export default ToggleVotingEligibility;
