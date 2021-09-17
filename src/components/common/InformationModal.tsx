import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/modal';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { offwhite, darkblue } from '../styles/theme';
import { InfoIcon } from '@chakra-ui/icons';

interface InformationModalProps {
  ariaLabel: string;
  title: string;
  alignWithText?: boolean;
}

const InformationModal: React.FC<InformationModalProps> = ({ children, ariaLabel, title, alignWithText }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label={ariaLabel}
        icon={<InfoIcon color={darkblue} />}
        onClick={onOpen}
        bg="none"
        borderRadius="5px"
        size="md"
        mb={alignWithText ? '-0.25em' : ''}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={offwhite} textColor={darkblue} p="2em">
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter justifyContent="flex-start">
            {/* <ReturnToPreviousButton onClick={onClose} text="Tilbake"></ReturnToPreviousButton> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InformationModal;
