import { useStyleConfig, Button, Text, ComponentStyleConfig } from '@chakra-ui/react';
import React from 'react';
import { boxShadow } from '../../particles/formStyles';

interface AlternativeProps {
  handleClick: () => void;
  selected: boolean;
  disableVoting: boolean;
}

const Alternative: React.FC<AlternativeProps> = ({ children, handleClick, selected, disableVoting }) => {
  const styles = useStyleConfig('Alternative', { variant: selected ? 'selected' : undefined });
  return (
    <Button
      disabled={disableVoting}
      w="100%"
      boxShadow={boxShadow}
      justifyContent="left"
      onClick={handleClick}
      sx={styles}
    >
      <Text color={selected ? 'white' : 'inherit'} isTruncated>
        {children}
      </Text>
    </Button>
  );
};

export const AlternativeConfig: ComponentStyleConfig = {
  baseStyle: {
    height: '52px',
    padding: '12px;',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: '700',
    bg: 'white',
  },
  variants: {
    selected: {
      bg: 'blue.400',
      _hover: { bg: 'blue.200' },
    },
  },
};

export default Alternative;
