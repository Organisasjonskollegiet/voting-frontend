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
import participantIcon from '../../../static/participantIcon.svg';
import ReturnToPreviousButton from '../../common/ReturnToPreviousButton';
import ManageParticipants from './ManageParticipants';
import { darkblue, offwhite } from '../../styles/colors';

interface ParticipantModalProps {
  meetingId: string;
  ownerEmail: string | undefined;
}

const ParticipantModal: React.FC<ParticipantModalProps> = ({ meetingId, ownerEmail }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button leftIcon={<img alt="Deltager" src={participantIcon} />} onClick={onOpen} w="fit-content" bg="transparent">
        <Text fontWeight="normal" fontSize="md" decoration="underline">
          Administrer deltagere
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent mx="2rem" bg={offwhite} textColor={darkblue} p="2em">
          <ModalHeader>Administrer deltagere</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ManageParticipants meetingId={meetingId} ownerEmail={ownerEmail} isActive={true} modalView={true} />
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
