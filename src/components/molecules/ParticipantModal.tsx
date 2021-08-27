import {
  Text,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import participantIcon from '../../static/participantIcon.svg';
import ReturnToPreviousButton from '../atoms/ReturnToPreviousButton';
import AddParticipants from '../particles/AddParticipants';
import { darkblue, offwhite } from '../particles/theme';

interface ParticipantModalProps {
  meetingId: string;
  ownerEmail: string | undefined;
}

const ParticipantModal: React.FC<ParticipantModalProps> = ({ meetingId, ownerEmail }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button leftIcon={<img alt="Deltager" src={participantIcon} />} onClick={onOpen} w="fit-content" bg="transparent">
        <Text fontWeight="normal" fontSize="15px" decoration="underline">
          Administrer deltagere
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent bg={offwhite} textColor={darkblue} p="2em">
          <ModalHeader>Administrer deltagere</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddParticipants meetingId={meetingId} ownerEmail={ownerEmail} isActive={true} modalView={true} />
          </ModalBody>

          <ModalFooter justifyContent="flex-start">
            <ReturnToPreviousButton onClick={onClose} text="Tilbake"></ReturnToPreviousButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ParticipantModal;
