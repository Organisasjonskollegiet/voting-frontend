import React from 'react';
import { Box, Button, ComponentStyleConfig, Text, HStack, useStyleConfig } from '@chakra-ui/react';
import { boxShadow } from '../particles/formStyles';
import { Draggable } from 'react-beautiful-dnd';
import { AlternativeWithIndex } from '../pages/Votation';
import { DragHandleIcon } from '@chakra-ui/icons';

export interface AlternativeProps {
  alternative: AlternativeWithIndex;
  selected: boolean;
  onClick: () => void;
  isStv: boolean;
}

const Alternative: React.FC<AlternativeProps> = ({ alternative, selected, onClick, isStv }) => {
  const styles = useStyleConfig('Alternative', { variant: selected ? 'selected' : undefined });
  return (
    <Draggable isDragDisabled={!isStv} key={alternative.id} draggableId={alternative.id} index={alternative.index}>
      {(provided) => (
        <HStack w="100%" minWidth="320px" ref={provided.innerRef} {...provided.draggableProps}>
          {isStv ? (
            <HStack w="100%" justifyContent="space-between" sx={styles}>
              <Text>{alternative.text}</Text>
              <Box {...provided.dragHandleProps}>
                <DragHandleIcon />
              </Box>
            </HStack>
          ) : (
            <Button boxShadow={boxShadow} justifyContent="left" onClick={onClick} sx={styles}>
              {alternative.text}
            </Button>
          )}
        </HStack>
      )}
    </Draggable>
  );
};

export const AlternativeConfig: ComponentStyleConfig = {
  baseStyle: {
    height: '52px',
    minWidth: '320px',
    width: '100%',
    padding: '12px;',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: '700',
    bg: 'white',
  },
  variants: {
    selected: {
      color: 'white',
      bg: '#718096',
      _hover: { bg: '#8d99ab' },
    },
  },
};

export default Alternative;
