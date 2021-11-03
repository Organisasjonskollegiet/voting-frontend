import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Switch, Text } from '@chakra-ui/react';
import { VotationStatus, useUpdateVotationStatusMutation, Role } from '../../__generated__/graphql-types';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import WrapStack from '../common/WrapStack';
import { useHistory } from 'react-router';
import CustomAlertDialog, { DialogType } from '../common/CustomAlertDialog';

interface VotationControllerProps {
  votationId: string;
  meetingId: string;
  status: VotationStatus;
  showVote: boolean;
  toggleShowVote: () => void;
  disableShowVote: boolean;
  role: Role | null;
}

const ActiveVotationController: React.FC<VotationControllerProps> = ({
  meetingId,
  votationId,
  status,
  showVote,
  toggleShowVote,
  disableShowVote,
  role,
}) => {
  const [updateVotationStatus] = useUpdateVotationStatusMutation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [invalidateVotationDialogOpen, setInvalidateVotationDialogOpen] = useState(false);
  const history = useHistory();

  const getText = () => {
    switch (status) {
      case VotationStatus.Open:
        return <Text>Steng votering</Text>;
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

  const getDialogType = () => {
    switch (status) {
      case VotationStatus.Open:
        return DialogType.CLOSE;
      case VotationStatus.CheckingResult:
        return DialogType.PUBLISH;
      default:
        return DialogType.PUBLISH;
    }
  };

  const handleConfirm = () => {
    updateVotationStatus({
      variables: { votationId, status: getNextStatus() },
    });
    setDialogOpen(false);
  };

  const handleInvalidResult = async () => {
    await updateVotationStatus({ variables: { votationId, status: VotationStatus.Invalid } });
    history.push(`/meeting/${meetingId}`);
  };

  return (
    <WrapStack breakpoint={400} w="100%" justifyContent="space-between">
      {status === VotationStatus.Open && (
        <FormControl display="flex" width="fit-content">
          <FormLabel ml="0.5em" fontWeight="bold" htmlFor="email-alerts" mb="0">
            Vis meg hva jeg stemte
          </FormLabel>
          <Switch isDisabled={disableShowVote} id="hide-vote" onChange={toggleShowVote} isChecked={showVote} />
        </FormControl>
      )}
      {role === Role.Admin && (
        <>
          <Button
            p="1.5em 4em"
            bg="transparent"
            borderRadius="16em"
            onClick={() => setInvalidateVotationDialogOpen(true)}
          >
            Avbryt votering
          </Button>
          <Button
            w="fit-content"
            _hover={{ bg: 'transparent' }}
            onClick={() => setDialogOpen(true)}
            p="1.5em 4em"
            borderRadius="16em"
            bg="transparent"
            rightIcon={<ArrowForwardIcon />}
          >
            {getText()}
          </Button>
        </>
      )}
      <CustomAlertDialog
        dialogIsOpen={invalidateVotationDialogOpen}
        handleCancel={() => setInvalidateVotationDialogOpen(false)}
        handleConfirm={handleInvalidResult}
        type={DialogType.INVALIDATE}
      />
      <CustomAlertDialog
        dialogIsOpen={dialogOpen}
        handleCancel={() => setDialogOpen(false)}
        handleConfirm={handleConfirm}
        type={getDialogType()}
      />
    </WrapStack>
  );
};

export default ActiveVotationController;
