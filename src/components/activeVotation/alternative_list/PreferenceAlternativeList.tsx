import React, { useState, useEffect } from 'react';
import { Divider, VStack } from '@chakra-ui/react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { AlternativeWithIndex } from '../../../pages/ActiveVotation';
import DraggableAlternative from '../alternative/DraggableAlternative';
import { lightGray } from '../../styles/colors';

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

  const updateOrderOfAlternatives = (
    ranked: AlternativeWithIndex[],
    unranked: AlternativeWithIndex[],
    oldList: string,
    newList: string,
    oldIndex: number,
    newIndex: number
  ) => {
    const { newRankedAlternatives, newUnrankedAlternatives } = reorder(
      ranked,
      unranked,
      oldList,
      newList,
      oldIndex,
      newIndex
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

    updateOrderOfAlternatives(
      rankedAlternatives,
      unrankedAlternatives,
      result.source.droppableId,
      result.destination.droppableId,
      result.source.index,
      result.destination.index
    );
  }

  const move = (
    alternative: AlternativeWithIndex,
    list: AlternativeWithIndex[],
    listName: 'ranked' | 'unranked',
    direction: 'up' | 'down'
  ) => {
    if (!rankedAlternatives || !unrankedAlternatives) return;
    const index = list.indexOf(alternative);
    // if alternative is on the bottom of a list and down is pressed, it is moved to
    // unranked if in ranked, and nothing happens if else
    if (index === list.length - 1 && listName === 'ranked' && direction === 'down') {
      updateOrderOfAlternatives(rankedAlternatives, unrankedAlternatives, 'ranked', 'unranked', index, 0);
      // if alternative is on the top of a list and up is pressed, it is moved to
      // ranked if in unranked, and nothing happens if else
    } else if (listName === 'unranked' && direction === 'up') {
      updateOrderOfAlternatives(
        rankedAlternatives,
        unrankedAlternatives,
        'unranked',
        'ranked',
        index,
        rankedAlternatives.length
      );
    } else {
      updateOrderOfAlternatives(
        rankedAlternatives,
        unrankedAlternatives,
        listName,
        listName,
        index,
        index + (direction === 'up' ? -1 : 1)
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable isDropDisabled={userHasVoted} droppableId="ranked">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <VStack
              spacing="0"
              opacity={userHasVoted ? 0.5 : 1}
              minHeight="68px"
              borderRadius="4px"
              px="4px"
              border={`${!rankedAlternatives || rankedAlternatives.length === 0 ? '1px' : '0'} dashed ${lightGray}`}
            >
              {rankedAlternatives &&
                rankedAlternatives.map((alt) => (
                  <DraggableAlternative
                    moveUp={() => move(alt, rankedAlternatives, 'ranked', 'up')}
                    moveDown={() => move(alt, rankedAlternatives, 'ranked', 'down')}
                    isRanked={true}
                    showVote={!userHasVoted || showVote}
                    alternative={alt}
                  />
                ))}
              {provided.placeholder}
            </VStack>
          </div>
        )}
      </Droppable>
      <Divider />
      <Droppable isDropDisabled={userHasVoted} droppableId="unranked">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <VStack
              minHeight="68px"
              borderRadius="4px"
              px="4px"
              border={`${!unrankedAlternatives || unrankedAlternatives.length === 0 ? '1px' : '0'} dashed ${lightGray}`}
              spacing="0"
              opacity={userHasVoted ? 0.5 : 1}
            >
              {unrankedAlternatives &&
                unrankedAlternatives.map((alt) => (
                  <DraggableAlternative
                    moveUp={() => move(alt, unrankedAlternatives, 'unranked', 'up')}
                    moveDown={() => move(alt, unrankedAlternatives, 'unranked', 'down')}
                    isRanked={false}
                    showVote={!userHasVoted || showVote}
                    alternative={alt}
                  />
                ))}
              {provided.placeholder}
            </VStack>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PreferenceAlternativeList;
