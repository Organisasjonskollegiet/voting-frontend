import React from 'react';
import { Center, Button } from '@chakra-ui/react';
import { VotationStatus, useUpdateVotationStatusMutation } from '../../__generated__/graphql-types';

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
    <Center mt="3em">
      <Button
        onClick={() =>
          updateVotationStatus({
            variables: { id: votationId, status: getNextStatus() },
          })
        }
        p="1.5em 4em"
        borderRadius="16em"
        bgColor="darkred"
        color="white"
      >
        {getText()}
      </Button>
    </Center>
  );
};

export default VotationController;
