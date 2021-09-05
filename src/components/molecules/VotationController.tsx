import React from 'react';
import { Box, Button, FormControl, FormLabel, Switch, Text } from '@chakra-ui/react';
import { VotationStatus, useUpdateVotationStatusMutation, Role } from '../../__generated__/graphql-types';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import WrapStack from './WrapStack';

interface VotationControllerProps {
  votationId: string;
  status: VotationStatus;
  hideVote: boolean;
  toggleHideVote: () => void;
  disableHideVote: boolean;
  role: Role | null;
}

const VotationController: React.FC<VotationControllerProps> = ({
  votationId,
  status,
  hideVote,
  toggleHideVote,
  disableHideVote,
  role,
}) => {
  const [updateVotationStatus] = useUpdateVotationStatusMutation();

  const getText = () => {
    switch (status) {
      case VotationStatus.Open:
        return <Text>Steng avstemning</Text>;
      case VotationStatus.CheckingResult:
        return <Text>Publiser resultater</Text>;
    }
  };

  const getNextStatus = () => {
    switch (status) {
      case VotationStatus.Open:
        return VotationStatus.CheckingResult;
      case VotationStatus.CheckingResult:
        return VotationStatus.PublishedResult;
      default:
        return VotationStatus.CheckingResult;
    }
  };

  return (
    <WrapStack breakpoint={400} w="100%" justifyContent="space-between">
      {status === VotationStatus.Open ? (
        <FormControl display="flex" width="fit-content">
          <Switch isDisabled={disableHideVote} id="hide-vote" onChange={toggleHideVote} isChecked={hideVote} />
          <FormLabel ml="0.5em" fontWeight="bold" htmlFor="email-alerts" mb="0">
            Skjul min stemme
          </FormLabel>
        </FormControl>
      ) : (
        <Box></Box>
      )}
      {role === Role.Admin && (
        <Button
          w="fit-content"
          _hover={{ bg: 'transparent' }}
          onClick={() =>
            updateVotationStatus({
              variables: { id: votationId, status: getNextStatus() },
            })
          }
          p="1.5em 4em"
          borderRadius="16em"
          bg="transparent"
          rightIcon={<ArrowForwardIcon />}
        >
          {getText()}
        </Button>
      )}
    </WrapStack>
  );
};

export default VotationController;
