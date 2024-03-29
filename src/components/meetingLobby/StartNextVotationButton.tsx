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
  Flex,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useRef } from 'react';
import useScreenWidth from '../../hooks/ScreenWidth';
import { MeetingContext } from '../../pages/MeetingLobby';
import { useStartNextVotationMutation } from '../../__generated__/graphql-types';

export interface StartNextVotationButtonProps {
  checkIfAnyChanges?: () => boolean;
  handleSaveChanges?: () => Promise<unknown>; //method can return a value, but not relevant for this component
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
    let title;
    let description;
    let status: 'error' | 'success';
    if (response.data?.startNextVotation?.__typename === 'OpenedVotation') {
      title = 'Votering åpnet.';
      description = `${response.data.startNextVotation.title} ble åpnet.`;
      status = 'success';
    } else {
      title = 'Kunne ikke åpne votering.';
      description = response.data.startNextVotation.message;
      status = 'error';
    }
    toast({
      title,
      description,
      status,
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

  const screenWidth = useScreenWidth();
  const isMobile = screenWidth <= 601;

  return (
    <Flex w="100%">
      <Button onClick={openVotationIfNoChanges} w={'250px'} variant="green" mx={isMobile ? 'auto' : undefined}>
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
                <Button colorScheme="green" onClick={() => saveBeforeStartVotation(true)} minW="max-content">
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
    </Flex>
  );
};

export default StartNextVotationButton;
