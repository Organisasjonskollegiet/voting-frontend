import {
  Text,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import participantIcon from '../../../static/participantIcon.svg';
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
      <Button
        variant="standard"
        leftIcon={<img alt="Deltager" src={participantIcon} />}
        onClick={onOpen}
        w="fit-content"
      >
        <Text fontWeight="normal" fontSize="md" decoration="underline">
          Administrer deltagere
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent bg={offwhite} textColor={darkblue} p="1rem">
          <ModalHeader>Administrer deltagere</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ManageParticipants
              meetingId={meetingId}
              ownerEmail={ownerEmail}
              // isActive={true}
              modalView={true}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ParticipantModal;
