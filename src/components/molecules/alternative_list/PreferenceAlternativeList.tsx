import React from 'react';
import { VStack } from '@chakra-ui/react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { AlternativeWithIndex } from '../../pages/Votation';
import DraggableAlternative from '../../atoms/alternative/DraggableAlternative';

export interface AlternativeListProps {
  alternatives: AlternativeWithIndex[];
  updateAlternatives: (alternatives: AlternativeWithIndex[]) => void;
  userHasVoted: boolean;
  showVote: boolean;
}

const PreferenceAlternativeList: React.FC<AlternativeListProps> = ({
  alternatives,
  updateAlternatives,
  userHasVoted,
  showVote,
}) => {
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable isDropDisabled={userHasVoted} droppableId="alternatives">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <VStack spacing="1em" opacity={userHasVoted ? 0.5 : 1}>
              {alternatives.map((alt) => (
                <DraggableAlternative showVote={!userHasVoted || showVote} alternative={alt} />
              ))}
            </VStack>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PreferenceAlternativeList;
