import { Select } from '@chakra-ui/react';
import React from 'react';
import { Role } from '../../../__generated__/graphql-types';

interface SelectRoleProps {
  onChange: (role: Role) => void;
  value: Role;
  disabled?: boolean;
  id?: string;
}

const SelectRole: React.FC<SelectRoleProps> = ({ onChange, value, disabled, id }) => {
  return (
    <Select
      id={id}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value as Role)}
      style={{ border: 'none' }}
      w="9rem"
      _hover={{ cursor: 'pointer' }}
    >
      <option value={Role.Admin}>Administrator</option>
      <option value={Role.Counter}>Teller</option>
      <option value={Role.Participant}>Deltaker</option>
    </Select>
  );
};

export default SelectRole;
