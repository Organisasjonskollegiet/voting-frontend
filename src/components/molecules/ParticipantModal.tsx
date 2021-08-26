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
import AddParticipants from '../particles/AddParticipants';

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Administrer deltagere</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddParticipants meetingId={meetingId} ownerEmail={ownerEmail}></AddParticipants>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ParticipantModal;
