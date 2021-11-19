import { useDisclosure } from '@chakra-ui/hooks';
import React from 'react';
import CustomAlertDialog, { DialogType } from '../../common/CustomAlertDialog';
import DeleteButton from '../../common/DeleteButton';

interface DeleteParticipantsProps {
  handleDeleteParticipants: () => void;
  disabled: boolean;
  participantsToDelete: string[];
}

const DeleteParticipants: React.FC<DeleteParticipantsProps> = ({
  handleDeleteParticipants,
  disabled,
  participantsToDelete,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const participantsToDeleteString = participantsToDelete.join(', ');

  return (
    <>
      <DeleteButton onClick={onOpen} label="Slett valgte deltagere" disabeled={disabled} />
      <CustomAlertDialog
        dialogIsOpen={isOpen}
        type={DialogType.PARTICIPANTS}
        handleConfirm={() => {
          handleDeleteParticipants();
          onClose();
        }}
        itemToBeConfirmed={participantsToDeleteString}
        handleCancel={onClose}
        confirmColor="red"
      />
    </>
  );
};

export default DeleteParticipants;
