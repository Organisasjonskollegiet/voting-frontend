import React, { useCallback, useState } from 'react';
import Alternative from '../atoms/alternative/Alternative';
import { ButtonGroup, CSSObject } from '@chakra-ui/react';

interface AlternativeChoice {
  id: string;
  text: string;
}

export interface AlternativeListProps {
  alternatives: AlternativeChoice[];
  blankVotes: boolean;
  handleSelect: (id: string | null) => void;
  userHasVoted: boolean;
  hideVote: boolean;
}

const blankAlternative: AlternativeChoice = {
  id: 'BLANK',
  text: 'Stem Blankt',
};

const AlternativeList: React.FC<AlternativeListProps> = ({
  alternatives,
  blankVotes,
  handleSelect,
  userHasVoted,
  hideVote,
}) => {
  const [selectedAlternativeId, setSelectedAlternativeId] = useState<string | null>(null);

  const updateSelected = useCallback(
    (id: string) => {
      const newId = selectedAlternativeId === id ? null : id;
      setSelectedAlternativeId(newId);
      handleSelect(newId);
    },
    [setSelectedAlternativeId, handleSelect]
  );

  const handleUpdateSelected = (id: string) => {
    if (!userHasVoted) {
      updateSelected(id);
    }
  };

  return (
    <ButtonGroup sx={styles} spacing={0} isDisabled={userHasVoted}>
      {alternatives.concat(blankVotes ? blankAlternative : []).map((alternative, i) => (
        <Alternative
          key={`${alternative.id}_${i}`}
          handleClick={() => handleUpdateSelected(alternative.id)}
          selected={(!userHasVoted || !hideVote) && selectedAlternativeId === alternative.id}
        >
          {alternative.text}
        </Alternative>
      ))}
    </ButtonGroup>
  );
};

const styles: CSSObject = {
  flexDirection: 'column',
  justifyContent: 'space-between',
  '& > button': {
    marginBottom: '1em',
  },
};
export default AlternativeList;
