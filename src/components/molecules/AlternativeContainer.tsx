import React, { useState } from 'react';
import { Alternative as AlternativeType } from '../../__generated__/graphql-types';
import Alternative from '../atoms/Alternative';
import { ComponentStyleConfig, useStyleConfig, SimpleGrid } from '@chakra-ui/react';

export interface AlternativeContainerProps {
  alternatives: Array<AlternativeType>;
}

const AlternativeContainer: React.FC<AlternativeContainerProps> = ({ alternatives }) => {
  const [selectedAlternative, setSelectedAlternative] = useState<AlternativeType | null>(null);

  function updateSelected(id: string) {
    setSelectedAlternative(selectedAlternative?.id === id ? null : alternatives.find((alt) => alt.id === id) || null);
  }

  const containerStyles = useStyleConfig('AlternativeContainer');

  return (
    <SimpleGrid columns={1} spacingY="25px" sx={containerStyles}>
      {alternatives.map((alt) => (
        <Alternative
          alternative={alt}
          selected={alt.id === selectedAlternative?.id}
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
