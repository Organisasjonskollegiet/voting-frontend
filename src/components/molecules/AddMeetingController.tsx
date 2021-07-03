import React from 'react';
import { Divider, VStack, Grid, Button, Box} from '@chakra-ui/react';
import ArrowLeft from '../../static/arrowLeft.svg';
import AddMeetingStatus from './AddMeetingStatus';

interface IProps {
  handleNext: () => void;
  showPrev: boolean;
  handlePrev?: () => void;
  activeTab: number;
}

const AddMeetingController: React.FC<IProps> = ({ handleNext, showPrev, activeTab, handlePrev }) => {

  const buttonStyle = {
    p: "1.5em 4em",
    borderRadius: "16em",
    bg: 'gray.500',
    color: 'white',
    width: '245px'
  } as React.CSSProperties

  return (
    <>
      <Divider m="3em 0" />
      <VStack spacing='16'>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {showPrev ? 
            <Button 
              leftIcon={<img alt="previous" src={ArrowLeft} />} 
              variant='ghost' 
              maxWidth='100px' 
              fontWeight='normal' 
              bg='#f9f9f9'
              onClick={handlePrev}
            >
              Forrige
            </Button> : 
            <Box />}
          <Button
            sx={buttonStyle}
            onClick={handleNext}
          >
            {activeTab !== 2 ? 'Neste' : 'Fullfør'}
          </Button>
        </Grid>
        <AddMeetingStatus active={activeTab} />
      </VStack>
    </>
  )}

export default AddMeetingController;