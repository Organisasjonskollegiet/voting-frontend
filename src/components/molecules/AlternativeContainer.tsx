import React, { useState } from 'react';
import { Alternative as AlternativeType } from '../../__generated__/graphql-types';
import Alternative from '../atoms/Alternative';
import { useStyleConfig, Grid } from '@chakra-ui/react';

export interface AlternativeContainerProps {
  alternatives: Array<AlternativeType>;
  blankVotes: boolean;
  handleSelect: (id: string | null) => void;
}

const AlternativeContainer: React.FC<AlternativeContainerProps> = ({ alternatives, blankVotes, handleSelect }) => {
  const [selectedAlternativeId, setSelectedAlternativeId] = useState<string | null>(null);

  function updateSelected(id: string) {
    const newId = selectedAlternativeId === id ? null : id;
    setSelectedAlternativeId(newId);
    handleSelect(newId);
  }

  const alternativeStyle = useStyleConfig('Alternative');

  return (
    <Grid gap="1.5em" w="100%" templateColumns={`repeat(auto-fit, minmax(${alternativeStyle.minWidth}, 1fr))`}>
      {alternatives.map((alt) => (
        <Alternative
          alternative={alt}
          key={alt.id}
          selected={alt.id === selectedAlternativeId}
          onClick={() => updateSelected(alt.id)}
        ></Alternative>
      ))}
      {blankVotes && (
        <Alternative
          alternative={{ id: '0', text: 'Stem blankt', votationId: '0' }}
          key={0}
          selected={'0' === selectedAlternativeId}
          onClick={() => updateSelected('0')}
        ></Alternative>
      )}
    </Grid>
  );
};

export default AlternativeContainer;
