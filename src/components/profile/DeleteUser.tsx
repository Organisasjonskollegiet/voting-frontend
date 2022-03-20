import { Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useDeleteMeMutation } from '../../__generated__/graphql-types';
import CustomAlertDialog, { DialogType } from '../common/CustomAlertDialog';

const DeleteUser: React.FC = () => {
  const [deleteUser] = useDeleteMeMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Slett bruker
      </Button>
      <CustomAlertDialog
        dialogIsOpen={isOpen}
        handleCancel={onClose}
        handleConfirm={() => deleteUser()}
        type={DialogType.USER}
        confirmColor={''}
      />
    </>
  );
};

export default DeleteUser;
