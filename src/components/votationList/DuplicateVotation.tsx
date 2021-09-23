import { Tooltip, IconButton } from '@chakra-ui/react';
import React from 'react';
import DuplicateIcon from '../../static/duplicateIcon.svg';

interface DuplicateVotationProps {
  handleDuplicateVotation: () => void;
}

const DuplicateVotation: React.FC<DuplicateVotationProps> = ({ handleDuplicateVotation }) => {
  return (
    <>
      <Tooltip label="Dupliser votering">
        <IconButton
          aria-label="Dupliser votering"
          h="fit-content"
          bg={'white'}
          p="1em"
          borderRadius="4px"
          onClick={handleDuplicateVotation}
          icon={<img alt="duplicate" src={DuplicateIcon} style={{ padding: '1em 0' }} />}
        />
      </Tooltip>
    </>
  );
};

export default DuplicateVotation;
