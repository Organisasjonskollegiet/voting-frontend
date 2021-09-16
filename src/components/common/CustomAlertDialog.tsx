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

interface CustomAlertDialogProps {
  dialogIsOpen: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  type: DialogType;
  itemToBeConfirmed?: string;
}

export enum DialogType {
  MEETING = 'Slett møte',
  VOTATION = 'Slett votering',
  PARTICIPANT = 'Slett deltager',
  CLOSE = 'Avslutt votering',
  PUBLISH = 'Publiser resultat',
  INVALIDATE = 'Erklær resultatet ugyldig',
}

const WarningBody = new Map<DialogType, string>([
  [
    DialogType.MEETING,
    'Er du sikker på at du vil slette møtet? All informasjon knyttet til møtet, inkludert avstemninger og stemmer vil bli slettet for godt.',
  ],
  [
    DialogType.VOTATION,
    'Er du sikker på at du vil slette voteringen? All informasjon knyttet til voteringen vil bli slettet for godt.',
  ],
  [DialogType.PARTICIPANT, 'Er du sikker på at du vil slette følgende deltager?'],
  [DialogType.CLOSE, 'Er du sikker på at du vil stenge voteringen?'],
  [DialogType.INVALIDATE, 'Er du sikker på at du vil erklære voteringen ugyldig?'],
  [DialogType.PUBLISH, 'Er du sikker på at du vil publisere resultatet?'],
]);

const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
  dialogIsOpen,
  handleCancel,
  handleConfirm,
  type,
  itemToBeConfirmed,
}) => {
  const cancelRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={dialogIsOpen} onClose={handleCancel}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {type}
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>{WarningBody.get(type)}</Text>
            {itemToBeConfirmed && (
              <Text as="span" fontWeight="bold">
                {itemToBeConfirmed}
              </Text>
            )}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleCancel}>
              Avbryt
            </Button>
            <Button colorScheme="red" onClick={handleConfirm} ml={3}>
              Bekreft
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
