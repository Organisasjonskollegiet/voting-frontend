import React from 'react';
import { Box, Text, HStack, useStyleConfig, IconButton } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import { AlternativeWithIndex } from '../../../pages/ActiveVotation';
import { ArrowUpIcon, ArrowDownIcon, DragHandleIcon } from '@chakra-ui/icons';

export interface DraggableAlternativeProps {
  alternative: AlternativeWithIndex;
  moveUp: () => void;
  moveDown: () => void;
  showVote: boolean;
  isRanked: boolean;
}

const DraggableAlternative: React.FC<DraggableAlternativeProps> = ({
  alternative,
  showVote,
  isRanked,
  moveUp,
  moveDown,
}) => {
  const styles = useStyleConfig('Alternative');
  return (
    <Draggable key={alternative.id} draggableId={alternative.id} index={alternative.index}>
      {(provided) => (
        <HStack py="0.5rem" w="100%" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <HStack w="100%">
            <Text w="30px" fontSize="24px" fontWeight="bold" opacity="0.5">
              {isRanked ? alternative.index + 1 : ''}
            </Text>
            <HStack w="100%" justifyContent="space-between" sx={styles}>
              <Text>{showVote ? alternative.text : 'Stemmer skjult'}</Text>
              <HStack>
                {/* Arrow up should not show if alternative is at the top of ranked list */}
                {!(isRanked && alternative.index === 0) && (
                  <IconButton onClick={moveUp} icon={<ArrowUpIcon />} aria-label="Flytt opp" />
                )}
                {isRanked && <IconButton onClick={moveDown} icon={<ArrowDownIcon />} aria-label="Flytt ned" />}
                <Box {...provided.dragHandleProps}>
                  <DragHandleIcon />
                </Box>
              </HStack>
            </HStack>
          </HStack>
        </HStack>
      )}
    </Draggable>
  );
};

export default DraggableAlternative;
