import { Box, Text, HStack } from '@chakra-ui/react';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { collapsedStyle, highlightedStyle } from '../../styles/formStyles';
import { Votation } from '../../../types/types';
import { expandAndLift } from '../../styles/styles';
import { DragHandleIcon } from '@chakra-ui/icons';

interface CollapsedVotationFormProps {
  isAdmin: boolean;
  votation: Votation;
  toggleCollapsedVotation: () => void;
  index: number;
}

const CollapsedVotationForm: React.FC<CollapsedVotationFormProps> = ({
  isAdmin,
  votation,
  toggleCollapsedVotation,
  index,
}) => {
  return (
    <Draggable isDragDisabled={!isAdmin} draggableId={votation.id} index={index}>
      {(provided) => (
        <HStack
          w="90vw"
          maxWidth="800px"
          ref={provided.innerRef}
          {...provided.draggableProps}
          justify="space-between"
          marginBottom="16px"
          sx={collapsedStyle}
          cursor={isAdmin ? 'pointer' : 'default'}
          onClick={(e) => {
            e.stopPropagation();
            toggleCollapsedVotation();
          }}
          _hover={isAdmin ? expandAndLift : {}}
        >
          <HStack spacing="8">
            <Text sx={highlightedStyle}>{`${votation.index + 1}`}</Text>
            <Text>{votation.title}</Text>
          </HStack>
          {isAdmin && (
            <Box {...provided.dragHandleProps}>
              <DragHandleIcon />
            </Box>
          )}
        </HStack>
      )}
    </Draggable>
  );
};

export default CollapsedVotationForm;
