import React from 'react';
import { Divider, VStack, Grid, Button, Box, Text } from '@chakra-ui/react';
import ArrowLeft from '../../static/arrowLeft.svg';
import ManageMeetingStatus from './ManageMeetingStatus';

interface IProps {
  handleNavigation: (nextIndex: number) => void;
  showPrev: boolean;
  activeTab: number;
}

const ManageMeetingController: React.FC<IProps> = ({ handleNavigation, showPrev, activeTab }) => {
  return (
    <>
      <Divider m="3em 0" />
      <VStack spacing="16">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {showPrev ? (
            <Button
              variant="standard"
              leftIcon={<img alt="previous" src={ArrowLeft} />}
              maxWidth="100px"
              onClick={() => handleNavigation(activeTab - 1)}
            >
              <Text alignItems="center" as="span">
                Forrige
              </Text>
            </Button>
          ) : (
            <Box />
          )}
          <Button variant="dark" w="245px" onClick={() => handleNavigation(activeTab + 1)}>
            {activeTab !== 2 ? 'Neste' : 'Fullfør'}
          </Button>
        </Grid>
        <ManageMeetingStatus handleNavigation={handleNavigation} active={activeTab} />
      </VStack>
    </>
  );
};

export default ManageMeetingController;
