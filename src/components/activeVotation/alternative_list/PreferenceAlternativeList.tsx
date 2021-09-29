import React, { useState } from 'react';
import { Divider, VStack } from '@chakra-ui/react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { AlternativeWithIndex } from '../../../pages/ActiveVotation';
import DraggableAlternative from '../alternative/DraggableAlternative';

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
  const [indexOfFirstUnordered, setIndexOfFirstUnordered] = useState(0);

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

    if (
      result.destination.index === result.source.index &&
      result.destination.droppableId === result.source.droppableId
    ) {
      return;
    }

    const orderedNew = result.destination.droppableId === 'ranked' && result.source.droppableId === 'unranked';

    const unorderedNew = result.destination.droppableId === 'unranked' && result.source.droppableId === 'ranked';

    setIndexOfFirstUnordered(indexOfFirstUnordered + (orderedNew ? 1 : unorderedNew ? -1 : 0));

    const reorderedAlternatives = reorder(alternatives, result.source.index, result.destination.index);

    const updatedAlternatives: AlternativeWithIndex[] = reorderedAlternatives.map((votation, index) => {
      return {
        ...votation,
        index: index,
        isEdited: true,
        isRanked: indexOfFirstUnordered < index,
      };
    });

    updateAlternatives(updatedAlternatives);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable isDropDisabled={userHasVoted} droppableId="ranked">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <VStack spacing="0" opacity={userHasVoted ? 0.5 : 1}>
              {alternatives.slice(0, indexOfFirstUnordered).map((alt) => (
                <DraggableAlternative isRanked={true} showVote={!userHasVoted || showVote} alternative={alt} />
              ))}
            </VStack>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Divider />
      <Droppable isDropDisabled={userHasVoted} droppableId="unranked">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <VStack spacing="0" opacity={userHasVoted ? 0.5 : 1}>
              {alternatives.slice(indexOfFirstUnordered).map((alt) => (
                <DraggableAlternative isRanked={false} showVote={!userHasVoted || showVote} alternative={alt} />
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
