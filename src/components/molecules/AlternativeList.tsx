import React, { useState } from 'react';
import Alternative from '../atoms/Alternative';
import { VStack } from '@chakra-ui/react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { AlternativeWithIndex } from '../pages/Votation';

export interface AlternativeListProps {
  alternatives: AlternativeWithIndex[];
  blankVotes: boolean;
  handleSelect: (id: string | null) => void;
  isStv: boolean;
  updateAlternatives: (alternatives: AlternativeWithIndex[]) => void;
  userHasVoted: boolean;
  hideVote: boolean;
}

const AlternativeList: React.FC<AlternativeListProps> = ({
  alternatives,
  updateAlternatives,
  blankVotes,
  handleSelect,
  isStv,
  userHasVoted,
  hideVote,
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

  const handleUpdateSelected = (id: string) => {
    if (!userHasVoted) {
      updateSelected(id);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="alternatives">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <VStack spacing="1em" opacity={userHasVoted ? 0.5 : 1}>
              {alternatives.map((alt, index) => (
                <Alternative
                  alternative={alt}
                  selected={(!userHasVoted || !hideVote) && selectedAlternativeId === alt.id}
                  onClick={() => handleUpdateSelected(alt.id)}
                  isStv={isStv}
                />
              ))}
            </VStack>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {blankVotes && (
        <Alternative
          alternative={{ id: '0', text: 'Stem blankt', votationId: '0', index: 12 }}
          key={0}
          selected={'0' === selectedAlternativeId}
          onClick={() => updateSelected('0')}
          isStv={isStv}
        />
      )}
    </DragDropContext>
  );
};

export default AlternativeList;
