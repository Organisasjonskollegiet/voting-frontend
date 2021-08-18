import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  Button,
} from '@chakra-ui/react';

interface DeleteAlertDialogProps {
  dialogIsOpen: boolean;
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
  type: 'meeting' | 'votation';
}

const meetingBody =
  'Er du sikker på at du vil slette møte? All informasjon knyttet til møtet, inkludert avstemninger og stemmer vil bli slettet for godt.';
const votationBody =
  'Er du sikker på at du vil slette voteringen? All informasjon knyttet til voteringen, stemmer vil bli slettet for godt.';

const DeleteAlertDialog: React.FC<DeleteAlertDialogProps> = ({
  dialogIsOpen,
  handleCancelDelete,
  handleConfirmDelete,
  type,
}) => {
  const cancelRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={dialogIsOpen} onClose={handleCancelDelete}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {`Slett ${type === 'meeting' ? 'møte' : 'votering'}`}
          </AlertDialogHeader>

          <AlertDialogBody>{type === 'meeting' ? meetingBody : votationBody}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleCancelDelete}>
              Avbryt
            </Button>
            <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
              Slett
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;
