import { SearchIcon } from '@chakra-ui/icons';
import { InputGroup, InputLeftElement, Input, InputRightElement, CloseButton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useDebounce from '../../../hooks/Debounce';
import { boxShadow } from '../../styles/formStyles';

interface SearchBarProps {
  setSearchValue: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchValue }) => {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce(value);

  useEffect(() => {
    setSearchValue(debouncedValue);
  }, [debouncedValue, setSearchValue]);

  const handleClear = () => {
    setValue('');
  };

  return (
    <InputGroup boxShadow={boxShadow} borderRadius="20px" w="min(100%, 420px)" bg="white">
      <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
      <Input
        borderRadius="20px"
        placeholder="Søk etter deltager"
        aria-label="Søk etter deltager"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <InputRightElement>
          <CloseButton onClick={handleClear}></CloseButton>
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default SearchBar;
