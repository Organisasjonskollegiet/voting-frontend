import React, { useCallback, useState } from 'react';
import Alternative from '../atoms/alternative/Alternative';
import { ButtonGroup, ComponentStyleConfig, useStyleConfig, VStack } from '@chakra-ui/react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { AlternativeWithIndex } from '../pages/Votation';

export interface AlternativeListProps {
  alternatives: AlternativeWithIndex[];
  blankVotes: boolean;
  handleSelect: (id: string | null) => void;
  userHasVoted: boolean;
  hideVote: boolean;
}

const AlternativeList: React.FC<AlternativeListProps> = ({ alternatives, handleSelect, userHasVoted, hideVote }) => {
  const [selectedAlternativeId, setSelectedAlternativeId] = useState<string | null>(null);

  const updateSelected = useCallback((id: string) => {
    const newId = selectedAlternativeId === id ? null : id;
    setSelectedAlternativeId(newId);
    handleSelect(newId);
    console.log(updateSelected);
  }, []);

  const handleUpdateSelected = (id: string) => {
    if (!userHasVoted) {
      updateSelected(id);
    }
  };

  console.log(hideVote);
  return (
    <ButtonGroup sx={styles} spacing={0} isDisabled={userHasVoted}>
      {alternatives.map((alternative) => (
        <Alternative
          key={`${alternative.votationId}_${alternative.id}`}
          handleClick={() => handleUpdateSelected(alternative.id)}
          selected={(!userHasVoted || !hideVote) && selectedAlternativeId === alternative.id}
        >
          {alternative.text}
        </Alternative>
      ))}
    </ButtonGroup>
  );
};
const styles = {
  flexDirection: 'column',
  justifyContent: 'space-between',
  '& > button': {
    marginBottom: '1em',
  },
};

export const AlternativeListConfig: ComponentStyleConfig = {
  baseStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
};

export default AlternativeList;
