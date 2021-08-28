import { SearchIcon } from '@chakra-ui/icons';
import { InputGroup, InputLeftElement, Input, InputRightElement, CloseButton } from '@chakra-ui/react';
import React from 'react';
import { boxShadow } from '../../particles/formStyles';

interface SearchBarProps {
  value: string;
  setInputValue: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, setInputValue }) => {
  return (
    <>
      <InputGroup boxShadow={boxShadow} w="60%" bg="white">
        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
        <Input
          placeholder="Søk etter deltager"
          aria-label="Søk etter deltager"
          value={value}
          onChange={(e) => setInputValue(e.target.value)}
        ></Input>
        {value && (
          <InputRightElement>
            <CloseButton onClick={() => setInputValue('')}></CloseButton>
          </InputRightElement>
        )}
      </InputGroup>
    </>
  );
};

export default SearchBar;
