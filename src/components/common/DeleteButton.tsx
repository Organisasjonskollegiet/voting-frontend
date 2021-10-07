import React from 'react';
import { Tooltip, IconButton } from '@chakra-ui/react';
import DeleteIcon from '../../static/deleteIcon.svg';

interface DeleteButtonProps {
  onClick: () => void;
  label: string;
  disabeled?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, label, disabeled }) => {
  return (
    <>
      <Tooltip label={label}>
        <IconButton
          borderRadius="4px"
          aria-label={label}
          bg={'transparent'}
          onClick={onClick}
          icon={<img alt={label} src={DeleteIcon} />}
          disabled={disabeled}
        />
      </Tooltip>
    </>
  );
};

export default DeleteButton;
