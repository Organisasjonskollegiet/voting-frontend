import React, { useState } from 'react';
import { Alternative as AlternativeType } from '../../__generated__/graphql-types';
import Alternative from '../atoms/Alternative';
import { useStyleConfig, Grid } from '@chakra-ui/react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { AlternativeWithIndex } from '../pages/Votation';

export interface AlternativeListProps {
  alternatives: AlternativeWithIndex[];
  blankVotes: boolean;
  handleSelect: (id: string | null) => void;
  isStv: boolean;
  updateAlternatives: (alternatives: AlternativeWithIndex[]) => void;
}

const AlternativeList: React.FC<AlternativeListProps> = ({
  alternatives,
  updateAlternatives,
  blankVotes,
  handleSelect,
  isStv,
}) => {
  const [selectedAlternativeId, setSelectedAlternativeId] = useState<string | null>(null);

  function updateSelected(id: string) {
    const newId = selectedAlternativeId === id ? null : id;
    setSelectedAlternativeId(newId);
    handleSelect(newId);
  }

  const reorder = (list: AlternativeWithIndex[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  async function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedAlternatives = reorder(alternatives, result.source.index, result.destination.index);

    const updatedAlternatives: AlternativeWithIndex[] = reorderedAlternatives.map((votation, index) => {
      return {
        ...votation,
        index: index,
        isEdited: true,
      };
    });
    updateAlternatives(updatedAlternatives);
  }

  const alternativeStyle = useStyleConfig('Alternative');

  return (
    <Grid gap="1.5em" w="100%" templateColumns={`repeat(auto-fit, minmax(${alternativeStyle.minWidth}, 1fr))`}>
      <DragDropContext onDragEnd={onDragEnd}>
        {alternatives.map((alt) => (
          <Alternative
            alternative={alt}
            key={alt.id}
            selected={alt.id === selectedAlternativeId}
            onClick={() => updateSelected(alt.id)}
          />
        ))}
      </DragDropContext>
      {blankVotes && (
        <Alternative
          alternative={{ id: '0', text: 'Stem blankt', votationId: '0' }}
          key={0}
          selected={'0' === selectedAlternativeId}
          onClick={() => updateSelected('0')}
        />
      )}
    </Grid>
  );
};

export default AlternativeList;
