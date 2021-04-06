import React from 'react';
import { Alternative as AlternativeType } from '../../__generated__/graphql-types';
import { Box, ComponentStyleConfig, useStyleConfig } from '@chakra-ui/react';

export interface AlternativeProps {
  alternative: AlternativeType;
  selected: boolean;
}

const Alternative: React.FC<AlternativeProps> = ({ alternative, selected }) => {
  const styles = useStyleConfig('Alternative', { variant: selected ? 'selected' : undefined });
  return <Box sx={styles}>{alternative.text}</Box>;
};

export const AlternativeConfig: ComponentStyleConfig = {
  baseStyle: {
    color: '#718096',
    backgroundColor: '#EDF2F7',
    height: '52px',
    width: '320px',
    padding: '12px;',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: '700',
  },
  variants: {
    selected: {
      color: 'white',
      backgroundColor: '#718096',
    },
  },
};

export default Alternative;
