import React from 'react';
import { Divider, VStack, Grid, Button, Text } from '@chakra-ui/react';
import ArrowLeft from '../../static/arrowLeft.svg';
import ManageMeetingStatus from './ManageMeetingStatus';
import useScreenWidth from '../../hooks/ScreenWidth';

interface IProps {
  handleNavigation: (nextIndex: number) => void;
  showPrev: boolean;
  activeTab: number;
}

const ManageMeetingController: React.FC<IProps> = ({ handleNavigation, showPrev, activeTab }) => {
  const screenWidth = useScreenWidth();
  const hasReachedBreakpoint = screenWidth < 600;

  return (
    <>
      <Divider m="3em 0" />
      <VStack spacing="16" w="100%">
        <Grid
          templateColumns={hasReachedBreakpoint ? '1rem 1fr 1rem' : 'repeat(3, 1fr)'}
          templateRows="reapeat(2, 1fr)"
          gap="2"
          w="100%"
          justifyItems="center"
        >
          {showPrev && (
            <Button
              variant="standard"
              leftIcon={<img alt="previous" src={ArrowLeft} />}
              pr="38px"
              maxWidth="100px"
              onClick={() => handleNavigation(activeTab - 1)}
              gridArea={hasReachedBreakpoint ? '1 / 2' : '2 / 1'}
              justifySelf={hasReachedBreakpoint ? 'center' : 'left'}
            >
              <Text alignItems="center" as="span">
                Forrige
              </Text>
            </Button>
          )}
          <Button variant="dark" w="min(100%, 245px)" gridArea="2 / 2" onClick={() => handleNavigation(activeTab + 1)}>
            <Text alignItems="center" as="span" px="2rem" color="inherit">
              {activeTab !== 2 ? 'Neste' : 'Fullfør'}
            </Text>
          </Button>
        </Grid>
        <ManageMeetingStatus handleNavigation={handleNavigation} active={activeTab} />
      </VStack>
    </>
  );
};

export default ManageMeetingController;
