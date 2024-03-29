import React, { useCallback, useContext, useState } from 'react';
import { ButtonGroup, CSSObject } from '@chakra-ui/react';
import Alternative from '../alternative/Alternative';
import { MeetingContext } from '../../../pages/MeetingLobby';

interface AlternativeChoice {
  id: string;
  text: string;
}

export interface AlternativeListProps {
  alternatives: AlternativeChoice[];
  blankVotes: boolean;
  handleSelect: (id: string | null) => void;
  userHasVoted: boolean;
  showVote: boolean;
  disableVoting: boolean;
}

const blankAlternative: AlternativeChoice = {
  id: 'BLANK',
  text: 'Stem blankt',
};

const AlternativeList: React.FC<AlternativeListProps> = ({
  alternatives,
  blankVotes,
  handleSelect,
  userHasVoted,
  showVote,
  disableVoting,
}) => {
  const { presentationMode } = useContext(MeetingContext);
  const [selectedAlternativeId, setSelectedAlternativeId] = useState<string | null>(null);

  const updateSelected = useCallback(
    (id: string) => {
      const newId = selectedAlternativeId === id ? null : id;
      setSelectedAlternativeId(newId);
      handleSelect(newId);
    },
    [setSelectedAlternativeId, handleSelect, selectedAlternativeId]
  );

  const handleUpdateSelected = (id: string) => {
    if (!userHasVoted && !presentationMode) {
      updateSelected(id);
    }
  };

  return (
    <ButtonGroup sx={styles} spacing={0} isDisabled={userHasVoted}>
      {alternatives.concat(blankVotes ? blankAlternative : []).map((alternative, i) => (
        <Alternative
          key={`${alternative.id}_${i}`}
          handleClick={() => handleUpdateSelected(alternative.id)}
          selected={showVote && selectedAlternativeId === alternative.id}
          disableVoting={disableVoting}
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
