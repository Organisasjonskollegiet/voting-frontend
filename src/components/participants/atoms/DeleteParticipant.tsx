import React, { useState } from 'react';
import { Tooltip, CloseButton } from '@chakra-ui/react';
import DeleteAlertDialog, { DeleteAlternative } from '../../atoms/DeleteAlertDialog';

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
      <DeleteAlertDialog
        dialogIsOpen={isDialogOpen}
        type={DeleteAlternative.PARTICIPANT}
        handleConfirmDelete={handleDeleteParticipant}
        itemToBeDeleted={participantName}
        handleCancelDelete={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default DeleteParticipant;
