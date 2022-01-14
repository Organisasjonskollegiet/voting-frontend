import { Select } from '@chakra-ui/react';
import React from 'react';
import { boxShadow } from '../../styles/formStyles';

export enum SortingOptions {
  ASC = 'ASC',
  DESC = 'DESC',
}

interface SortParticipantsProps {
  setSortingOption: (option: SortingOptions) => void;
}

const SortParticipants: React.FC<SortParticipantsProps> = ({ setSortingOption }) => {
  return (
    <Select
      onChange={(e) => setSortingOption(e.target.value as SortingOptions)}
      bg="white"
      boxShadow={boxShadow}
      w="min(100%, 200px)"
    >
      <option value={SortingOptions.ASC}>A - Å</option>
      <option value={SortingOptions.DESC}>Å - A</option>
    </Select>
  );
};

export default SortParticipants;
