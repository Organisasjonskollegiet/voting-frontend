import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  Button,
  Text,
} from '@chakra-ui/react';

interface DeleteAlertDialogProps {
  dialogIsOpen: boolean;
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
  type: DeleteAlternative;
  itemToBeDeleted?: string;
}

export enum DeleteAlternative {
  MEETING = 'møte',
  VOTATION = 'votering',
  PARTICIPANT = 'deltager',
}

const WarningBody = new Map<DeleteAlternative, string>([
  [
    DeleteAlternative.MEETING,
    'Er du sikker på at du vil slette møtet? All informasjon knyttet til møtet, inkludert avstemninger og stemmer vil bli slettet for godt.',
  ],
  [
    DeleteAlternative.VOTATION,
    'Er du sikker på at du vil slette voteringen? All informasjon knyttet til voteringen vil bli slettet for godt.',
  ],
  [DeleteAlternative.PARTICIPANT, 'Er du sikker på at du vil slette følgende deltager?'],
]);

const DeleteAlertDialog: React.FC<DeleteAlertDialogProps> = ({
  dialogIsOpen,
  handleCancelDelete,
  handleConfirmDelete,
  type,
  itemToBeDeleted,
}) => {
  const cancelRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={dialogIsOpen} onClose={handleCancelDelete}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {`Slett ${type}`}
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>{WarningBody.get(type)}</Text>
            {itemToBeDeleted && (
              <Text as="span" fontWeight="bold">
                {itemToBeDeleted}
              </Text>
            )}
          </AlertDialogBody>

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
