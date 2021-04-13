import React, { useState } from 'react';
import { Alternative as AlternativeType } from '../../__generated__/graphql-types';
import Alternative from '../atoms/Alternative';
import { ComponentStyleConfig, useStyleConfig, SimpleGrid } from '@chakra-ui/react';

export interface AlternativeContainerProps {
  alternatives: Array<AlternativeType>;
}

const AlternativeContainer: React.FC<AlternativeContainerProps> = ({ alternatives }) => {
  const [selectedAlternativeId, setSelectedAlternativeId] = useState<string | null>(null);

  function updateSelected(id: string) {
    setSelectedAlternativeId(selectedAlternativeId === id ? null : id);
  }

  const containerStyles = useStyleConfig('AlternativeContainer');

  return (
    <SimpleGrid columns={1} spacingY="24px" sx={containerStyles}>
      {alternatives.map((alt) => (
        <Alternative
          alternative={alt}
          key={alt.id}
          selected={alt.id === selectedAlternativeId}
          onClick={() => updateSelected(alt.id)}
        ></Alternative>
      ))}
    </SimpleGrid>
  );
};

export const AlternativeContainerConfig: ComponentStyleConfig = {
  baseStyle: {},
};

export default AlternativeContainer;
