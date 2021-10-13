import React, { useContext, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Switch, Text } from '@chakra-ui/react';
import { VotationStatus, useUpdateVotationStatusMutation, Role } from '../../__generated__/graphql-types';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import WrapStack from '../common/WrapStack';
import CustomAlertDialog, { DialogType } from '../common/CustomAlertDialog';
import { ActiveVotationContext } from '../../pages/ActiveVotation';

interface VotationControllerProps {
  status: VotationStatus;
  showVote: boolean;
  toggleShowVote: () => void;
  disableShowVote: boolean;
}

const ActiveVotationController: React.FC<VotationControllerProps> = ({
  status,
  showVote,
  toggleShowVote,
  disableShowVote,
}) => {
  const [updateVotationStatus] = useUpdateVotationStatusMutation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { role, votationId } = useContext(ActiveVotationContext);

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

  return (
    <WrapStack breakpoint={400} w="100%" justifyContent="space-between">
      {status === VotationStatus.Open ? (
        <FormControl display="flex" width="fit-content">
          <Switch isDisabled={disableShowVote} id="hide-vote" onChange={toggleShowVote} isChecked={showVote} />
          <FormLabel ml="0.5em" fontWeight="bold" htmlFor="email-alerts" mb="0">
            Vis min stemme
          </FormLabel>
        </FormControl>
      ) : (
        <Box></Box>
      )}
      {role === Role.Admin && (
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
      )}
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
