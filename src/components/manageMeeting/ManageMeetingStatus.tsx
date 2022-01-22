import React from 'react';
import { HStack, Text, Divider, Center } from '@chakra-ui/react';
import useScreenWidth from '../../hooks/ScreenWidth';

interface IProps {
  active: number;
  handleNavigation: (nextIndex: number) => void;
}

const steps = ['Opprette møte', 'Legge til voteringer', 'Invitere deltagere'];

const ManageMeetingStatus: React.FC<IProps> = ({ active, handleNavigation }) => {
  const screenWidth = useScreenWidth();
  return (
    <Center>
      <HStack width="100%" spacing="4" marginBottom="32px">
        {steps.map((step, index) => (
          <React.Fragment key={'step' + index}>
            {index !== 0 && <Divider sx={dividerStyle} />}
            <Text as="a" onClick={() => handleNavigation(index)} sx={active === index ? activeStyle : undefined}>
              {screenWidth > 400 ? step : index + 1}
            </Text>
          </React.Fragment>
        ))}
      </HStack>
    </Center>
  );
};

const dividerStyle = {
  border: '2px solid',
  width: '46px',
  borderColor: '#718096',
} as React.CSSProperties;

const activeStyle = {
  color: '#43679C',
  fontWeight: 'bold',
} as React.CSSProperties;

export default ManageMeetingStatus;
