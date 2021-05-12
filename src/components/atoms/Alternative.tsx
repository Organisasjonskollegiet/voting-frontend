import React from 'react';
import { Alternative as AlternativeType } from '../../__generated__/graphql-types';
import { Button, ComponentStyleConfig, useStyleConfig } from '@chakra-ui/react';

export interface AlternativeProps {
  alternative: AlternativeType;
  selected: boolean;
  onClick: () => void;
}

const Alternative: React.FC<AlternativeProps> = ({ alternative, selected, onClick }) => {
  const styles = useStyleConfig('Alternative', { variant: selected ? 'selected' : undefined });
  return (
    <Button onClick={onClick} sx={styles}>
      {alternative.text}
    </Button>
  );
};

export const AlternativeConfig: ComponentStyleConfig = {
  baseStyle: {
    height: '52px',
    minWidth: '320px',
    width: '100%',
    padding: '12px;',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: '700',
    justifyContent: 'left',
  },
  variants: {
    selected: {
      color: 'white',
      bg: '#718096',
      _hover: { bg: '#8d99ab' },
    },
  },
};

export default Alternative;
