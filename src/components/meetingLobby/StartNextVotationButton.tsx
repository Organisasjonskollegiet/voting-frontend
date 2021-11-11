import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useRef } from 'react';
import { green } from '../styles/colors';

interface StartNextVotationButtonProps {
  handleStartVotation: () => void;
  checkIfAnyChanges: () => boolean;
  handleSaveChanges: () => Promise<void>;
}

const StartNextVotationButton: React.FC<StartNextVotationButtonProps> = ({
  handleStartVotation,
  checkIfAnyChanges,
  handleSaveChanges,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const cancelRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const openVotationIfNoChanges = () => {
    if (checkIfAnyChanges()) {
      setIsOpen(true);
    } else {
      handleStartVotation();
    }
  };

  const saveBeforeStartVotation = async (saveChanges: boolean) => {
    setIsOpen(false);
    if (saveChanges) {
      await handleSaveChanges();
    }
    handleStartVotation();
  };

  return (
    <>
      <Button onClick={openVotationIfNoChanges} w={'250px'} bg={green} color="white" borderRadius={'16em'}>
        Start neste votering
      </Button>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={() => setIsOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Du har ulagrede endringer
            </AlertDialogHeader>

            <AlertDialogBody>Endringene dine vil bli forkastet om du starter votering uten å lagre</AlertDialogBody>
            <AlertDialogFooter justifyContent="center">
              <VStack alignItems="left" spacing="3">
                <Button colorScheme={'green'} onClick={() => saveBeforeStartVotation(true)} minW="max-content">
                  Lagre endringer og start votering
                </Button>
                <Button colorScheme="red" onClick={() => saveBeforeStartVotation(false)} minW="max-content">
                  Forkast endringer og start votering
                </Button>
                <Button colorScheme="blue" onClick={() => setIsOpen(false)} ref={cancelRef} minW="max-content">
                  Gå tilbake
                </Button>
              </VStack>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default StartNextVotationButton;
