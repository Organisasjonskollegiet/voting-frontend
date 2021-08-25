import React from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { VotationStatus, useUpdateVotationStatusMutation } from '../../__generated__/graphql-types';
import { ArrowForwardIcon } from '@chakra-ui/icons';

interface VotationControllerProps {
  votationId: string;
  status: VotationStatus;
}

const VotationController: React.FC<VotationControllerProps> = ({ votationId, status }) => {
  const [updateVotationStatus] = useUpdateVotationStatusMutation();

  const getText = () => {
    switch (status) {
      case VotationStatus.Open:
        return 'Steng avstemning';
      case VotationStatus.CheckingResult:
        return 'Publiser resultater';
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
    <HStack w="100%" justifyContent="flex-end">
      <Button
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
    </HStack>
  );
};

export default VotationController;
