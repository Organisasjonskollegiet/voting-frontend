import React, { useState, useEffect } from 'react';
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
  const [unrankedAlternatives, setUnrankedAlternatives] = useState<AlternativeWithIndex[]>();
  const [rankedAlternatives, setRankedAlternatives] = useState<AlternativeWithIndex[]>();

  useEffect(() => {
    if (alternatives) {
      setUnrankedAlternatives(alternatives.filter((a) => !a.isRanked));
      setRankedAlternatives(alternatives.filter((a) => a.isRanked));
    }
  }, [alternatives]);

  const reorderSameList = (list: AlternativeWithIndex[], oldIndex: number, newIndex: number) => {
    const reordered = Array.from(list);
    const [removed] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, removed);
    return reordered;
  };

  const reorderListShift = (
    fromList: AlternativeWithIndex[],
    toList: AlternativeWithIndex[],
    oldIndex: number,
    newIndex: number
  ) => {
    const newFromList = Array.from(fromList);
    const newToList = Array.from(toList);
    const [removed] = newFromList.splice(oldIndex, 1);
    newToList.splice(newIndex, 0, removed);
    return { newFromList, newToList };
  };

  const reorder = (
    ranked: AlternativeWithIndex[],
    unranked: AlternativeWithIndex[],
    oldList: string,
    newList: string,
    oldIndex: number,
    newIndex: number
  ) => {
    if (oldList === 'ranked') {
      if (newList === 'ranked') {
        return {
          newUnrankedAlternatives: unranked,
          newRankedAlternatives: reorderSameList(ranked, oldIndex, newIndex),
        };
      } else {
        const { newFromList, newToList } = reorderListShift(ranked, unranked, oldIndex, newIndex);
        return { newUnrankedAlternatives: newToList, newRankedAlternatives: newFromList };
      }
    } else {
      if (newList === 'unranked') {
        return {
          newUnrankedAlternatives: reorderSameList(unranked, oldIndex, newIndex),
          newRankedAlternatives: ranked,
        };
      } else {
        const { newFromList, newToList } = reorderListShift(unranked, ranked, oldIndex, newIndex);
        return { newUnrankedAlternatives: newFromList, newRankedAlternatives: newToList };
      }
    }
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

    if (!unrankedAlternatives || !rankedAlternatives) return;

    const { newRankedAlternatives, newUnrankedAlternatives } = reorder(
      rankedAlternatives,
      unrankedAlternatives,
      result.source.droppableId,
      result.destination.droppableId,
      result.source.index,
      result.destination.index
    );

    setRankedAlternatives(newRankedAlternatives);
    setUnrankedAlternatives(newUnrankedAlternatives);

    const updatedAlternatives = [
      ...newRankedAlternatives.map((votation, index) => {
        return {
          ...votation,
          index: index,
          isEdited: true,
          isRanked: true,
        };
      }),
      ...newUnrankedAlternatives.map((votation, index) => {
        return {
          ...votation,
          index: index,
          isEdited: true,
          isRanked: false,
        };
      }),
    ];

    updateAlternatives(updatedAlternatives);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable isDropDisabled={userHasVoted} droppableId="ranked">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <VStack spacing="0" opacity={userHasVoted ? 0.5 : 1}>
              {rankedAlternatives &&
                rankedAlternatives.map((alt) => (
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
              {unrankedAlternatives &&
                unrankedAlternatives.map((alt) => (
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
