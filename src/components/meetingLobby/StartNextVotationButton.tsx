import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useRef } from 'react';
import { MeetingContext } from '../../pages/MeetingLobby';
import { useStartNextVotationMutation } from '../../__generated__/graphql-types';

interface StartNextVotationButtonProps {
  checkIfAnyChanges?: () => boolean;
  handleSaveChanges?: () => Promise<void>;
}

const StartNextVotationButton: React.FC<StartNextVotationButtonProps> = ({ checkIfAnyChanges, handleSaveChanges }) => {
  const { meetingId } = useContext(MeetingContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [startNextVotation] = useStartNextVotationMutation();

  const cancelRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  const toast = useToast();

  const startVotation = async () => {
    const response = await startNextVotation({ variables: { meetingId } });
    if (!response.data?.startNextVotation?.__typename) return;
    let toastTitle;
    let toastDescription;
    let toastStatus: 'error' | 'success';
    if (response.data?.startNextVotation?.__typename === 'OpenedVotation') {
      toastTitle = 'Votering åpnet.';
      toastDescription = `${response.data.startNextVotation.title} ble åpnet.`;
      toastStatus = 'success';
    } else {
      toastTitle = 'Kunne ikke åpne votering.';
      toastDescription = response.data.startNextVotation.message;
      toastStatus = 'error';
    }
    toast({
      title: toastTitle,
      description: toastDescription,
      status: toastStatus,
      duration: 4000,
      isClosable: true,
    });
  };

  const openVotationIfNoChanges = async () => {
    if (checkIfAnyChanges && checkIfAnyChanges()) {
      setIsOpen(true);
    } else {
      startVotation();
    }
  };

  const saveBeforeStartVotation = async (saveChanges: boolean) => {
    setIsOpen(false);
    if (saveChanges && handleSaveChanges) {
      await handleSaveChanges();
    }
    startVotation();
  };

  return (
    <>
      <Button onClick={openVotationIfNoChanges} w={'250px'} variant="green">
        Start neste votering
      </Button>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={() => setIsOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Du har ulagrede endringer
            </AlertDialogHeader>

            <AlertDialogBody>Endringene din vil bli forkastet om du starter votering uten å lagre</AlertDialogBody>
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
