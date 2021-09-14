import React from 'react';
import { Box, Text, HStack, useStyleConfig } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import { AlternativeWithIndex } from '../../pages/Votation';
import { DragHandleIcon } from '@chakra-ui/icons';

export interface DraggableAlternativeProps {
  alternative: AlternativeWithIndex;
  showVote: boolean;
}

const DraggableAlternative: React.FC<DraggableAlternativeProps> = ({ alternative, showVote }) => {
  const styles = useStyleConfig('Alternative');
  return (
    <Draggable key={alternative.id} draggableId={alternative.id} index={alternative.index}>
      {(provided) => (
        <HStack w="100%" minWidth="320px" ref={provided.innerRef} {...provided.draggableProps}>
          <HStack w="100%">
            <Text isTruncated fontSize="24px" fontWeight="bold" opacity="0.5">
              {alternative.index + 1}
            </Text>
            <HStack w="100%" justifyContent="space-between" sx={styles}>
              <Text>{showVote ? alternative.text : 'Stemmer skjult'}</Text>
              <Box {...provided.dragHandleProps}>
                <DragHandleIcon />
              </Box>
            </HStack>
          </HStack>
        </HStack>
      )}
    </Draggable>
  );
};

export default DraggableAlternative;
