import React from 'react';
import { Divider, VStack, Grid, Button, Text } from '@chakra-ui/react';
import ArrowLeft from '../../static/arrowLeft.svg';
import ManageMeetingStatus from './ManageMeetingStatus';
import useScreenWidth from '../../hooks/ScreenWidth';

interface IProps {
  activeTab: number;
  handleNavigation: (nextIndex: number) => void;
}

const ManageMeetingController: React.FC<IProps> = ({ activeTab, handleNavigation }) => {
  const screenWidth = useScreenWidth();
  const hasReachedBreakpoint = screenWidth < 600;

  const showPrev = activeTab > 0;

  const next = () => {
    handleNavigation(activeTab + 1);
  };
  const previous = () => {
    handleNavigation(activeTab - 1);
  };

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
              onClick={previous}
              gridArea={hasReachedBreakpoint ? '1 / 2' : '2 / 1'}
              justifySelf={hasReachedBreakpoint ? 'center' : 'left'}
            >
              <Text alignItems="center" as="span">
                Forrige
              </Text>
            </Button>
          )}
          <Button variant="dark" w="min(100%, 245px)" gridArea="2 / 2" onClick={next}>
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
