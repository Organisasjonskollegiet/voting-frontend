import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/modal';
import { useDisclosure, Link } from '@chakra-ui/react';
import React from 'react';
import { offwhite, darkblue } from '../../styles/colors';

interface ModalLinkProps {
  label: string;
  title: string;
}

const ModalLink: React.FC<ModalLinkProps> = ({ children, label, title, }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
        <Link textDecoration="underline" fontStyle="italic" onClick={onOpen}>{label}</Link>
        
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent mx="2rem" bg={offwhite} textColor={darkblue} p="2em">
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{children}</ModalBody>
        </ModalContent>
        </Modal>
    </>
  );
};

export default ModalLink;
