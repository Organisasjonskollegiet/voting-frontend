import React, { useState } from 'react';
import { Tooltip, CloseButton } from '@chakra-ui/react';
import CustomAlertDialog, { DialogType } from '../../common/CustomAlertDialog';

interface DeleteParticipantProps {
  handleDeleteParticipant: () => void;
  disabled: boolean;
  participantName: string;
}

const DeleteParticipant: React.FC<DeleteParticipantProps> = ({
  handleDeleteParticipant,
  disabled,
  participantName,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Tooltip label="Fjern deltager">
        <CloseButton
          onClick={() => setIsDialogOpen(true)}
          disabled={disabled}
          background="transparent"
          _hover={{ background: 'transparent' }}
        ></CloseButton>
      </Tooltip>
      <CustomAlertDialog
        dialogIsOpen={isDialogOpen}
        type={DialogType.PARTICIPANT}
        handleConfirm={handleDeleteParticipant}
        itemToBeConfirmed={participantName}
        handleCancel={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default DeleteParticipant;
