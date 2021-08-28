import { Tooltip, CloseButton } from '@chakra-ui/react';
import React from 'react';

interface DeleteParticipantProps {
  onClick: () => void;
  disabled: boolean;
}

const DeleteParticipant: React.FC<DeleteParticipantProps> = ({ onClick, disabled }) => {
  return (
    <Tooltip label="Fjern deltager">
      <CloseButton
        onClick={onClick}
        disabled={disabled}
        background="transparent"
        _hover={{ background: 'transparent' }}
      ></CloseButton>
    </Tooltip>
  );
};

export default DeleteParticipant;
