import React from 'react';
import { Divider, VStack, Grid, Button, Box } from '@chakra-ui/react';
import ArrowLeft from '../../static/arrowLeft.svg';
import AddMeetingStatus from './AddMeetingStatus';

interface IProps {
  handleNavigation: (nextIndex: number) => void;
  showPrev: boolean;
  activeTab: number;
}

const AddMeetingController: React.FC<IProps> = ({ handleNavigation, showPrev, activeTab }) => {
  const buttonStyle = {
    bg: 'gray.500',
    color: 'white',
    width: '245px',
    borderRadius: '16em',
  } as React.CSSProperties;

  return (
    <>
      <Divider m="3em 0" />
      <VStack spacing="16">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {showPrev ? (
            <Button
              leftIcon={<img alt="previous" src={ArrowLeft} />}
              variant="ghost"
              maxWidth="100px"
              fontWeight="normal"
              bg="#f9f9f9"
              onClick={() => handleNavigation(activeTab - 1)}
            >
              Forrige
            </Button>
          ) : (
            <Box />
          )}
          <Button sx={buttonStyle} onClick={() => handleNavigation(activeTab + 1)}>
            {activeTab !== 2 ? 'Neste' : 'Fullfør'}
          </Button>
        </Grid>
        <AddMeetingStatus handleNavigation={handleNavigation} active={activeTab} />
      </VStack>
    </>
  );
};

export default AddMeetingController;
