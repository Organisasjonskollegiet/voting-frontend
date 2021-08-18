import React from 'react';
import { HStack, Text, Divider, Center } from '@chakra-ui/react';

interface IProps {
  active: number;
  handleNavigation: (nextIndex: number) => void;
}

const AddMeetingStatus: React.FC<IProps> = ({ active, handleNavigation }) => {
  const dividerStyle = {
    border: '2px solid',
    width: '46px',
    borderColor: '#718096',
  } as React.CSSProperties;

  const activeStyle = {
    color: '#43679C',
    fontWeight: 'bold',
  } as React.CSSProperties;

  return (
    <Center>
      <HStack width="100%" spacing="4" marginBottom="32px">
        <Text
          onClick={() => handleNavigation(0)}
          _hover={{ cursor: 'pointer' }}
          sx={active === 0 ? activeStyle : undefined}
        >
          Opprette møte
        </Text>
        <Divider sx={dividerStyle} />
        <Text
          onClick={() => handleNavigation(1)}
          _hover={{ cursor: 'pointer' }}
          sx={active === 1 ? activeStyle : undefined}
        >
          Legge til voteringer
        </Text>
        <Divider sx={dividerStyle} />
        <Text
          onClick={() => handleNavigation(2)}
          _hover={{ cursor: 'pointer' }}
          sx={active === 2 ? activeStyle : undefined}
        >
          Invitere møtedeltakere
        </Text>
      </HStack>
    </Center>
  );
};

export default AddMeetingStatus;
