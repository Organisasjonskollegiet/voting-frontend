import React, { useContext, useRef, useState } from 'react';
import {
  VStack,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { NavigationContext } from '../manageMeeting/atoms/NavigationContextProvider';
import ManageMeetingController from '../manageMeeting/molecules/ManageMeetingController';

interface IProps {
  checkIfAnyChanges: () => boolean;
  handleSave: () => Promise<unknown>; //method can return a value, but not relevant for this component
}

const ManageMeetingControllerWithVotationValidation: React.FC<IProps> = ({ checkIfAnyChanges, handleSave }) => {
  const { navigateToTab } = useContext(NavigationContext);

  const [nextIndex, setNextIndex] = useState<number>(2);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cancelRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const openAndSaveNavigationIndex = (index: number) => {
    setIsOpen(true);
    setNextIndex(index);
  };

  const saveAndContinue = async () => {
    await handleSave().then(() => {
      closeAndContinue(nextIndex);
    });
  };

  const closeAndContinue = (index: number) => {
    setIsOpen(false);
    navigateToTab(index);
  };

  return (
    <>
      <ManageMeetingController preventNavigation={checkIfAnyChanges} alternativeAction={openAndSaveNavigationIndex} />

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={() => setIsOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Du har ulagrede endringer
            </AlertDialogHeader>

            <AlertDialogBody>Endringene din vil bli forkastet om går videre uten å lagre</AlertDialogBody>
            <AlertDialogFooter justifyContent="center">
              <VStack alignItems="left" spacing="3">
                <Button colorScheme="green" onClick={() => saveAndContinue()} minW="max-content">
                  Lagre endringer og gå videre
                </Button>
                <Button colorScheme="red" onClick={() => closeAndContinue(nextIndex)} minW="max-content">
                  Forkast endringer og gå videre
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

export default ManageMeetingControllerWithVotationValidation;
