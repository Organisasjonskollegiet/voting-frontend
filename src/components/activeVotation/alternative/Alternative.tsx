import { useStyleConfig, Button, Text, ComponentStyleConfig } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { MeetingContext } from '../../../pages/MeetingLobby';
import { boxShadow } from '../../styles/formStyles';
import { green } from '../../styles/colors';

interface AlternativeProps {
  handleClick: () => void;
  selected: boolean;
  disableVoting: boolean;
}

const Alternative: React.FC<AlternativeProps> = ({ children, handleClick, selected, disableVoting }) => {
  const styles = useStyleConfig('Alternative', { variant: selected ? 'selected' : undefined });
  const { presentationMode } = useContext(MeetingContext);
  return (
    <Button
      disabled={disableVoting}
      w="100%"
      boxShadow={boxShadow}
      justifyContent="left"
      onClick={handleClick}
      _focus={!selected ? { border: `2px solid ${green(0.3)}` } : undefined}
      _hover={{ cursor: presentationMode ? 'default' : 'pointer' }}
      sx={styles}
    >
      <Text isTruncated>{children}</Text>
    </Button>
  );
};

export const AlternativeConfig: ComponentStyleConfig = {
  baseStyle: {
    height: '52px',
    padding: '12px;',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: '700',
    bg: 'white',
  },
  variants: {
    selected: {
      border: `2px solid ${green()}`,
      boxShadow: `0px 0px 2px ${green()}`,
    },
  },
};

export default Alternative;
