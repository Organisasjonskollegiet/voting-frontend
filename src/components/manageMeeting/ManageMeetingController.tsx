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

  return (
    <>
      <Divider m="3em 0" />
      <VStack spacing="16">
        <Grid templateColumns="repeat(3, 1fr)" templateRows="reapeat(2, 1fr)" gap="2">
          {showPrev && (
            <Button
              variant="standard"
              leftIcon={<img alt="previous" src={ArrowLeft} />}
              maxWidth="100px"
              onClick={() => handleNavigation(activeTab - 1)}
              gridArea={screenWidth > 600 ? '2 / 1' : '1 / 2'}
              justifySelf={screenWidth > 600 ? 'left' : 'center'}
            >
              <Text alignItems="center" as="span">
                Forrige
              </Text>
            </Button>
          )}
          <Button variant="dark" w="245px" gridArea="2 / 2" onClick={() => handleNavigation(activeTab + 1)}>
            {activeTab !== 2 ? 'Neste' : 'Fullfør'}
          </Button>
        </Grid>
        <ManageMeetingStatus handleNavigation={handleNavigation} active={activeTab} />
      </VStack>
    </>
  );
};

export default ManageMeetingController;
