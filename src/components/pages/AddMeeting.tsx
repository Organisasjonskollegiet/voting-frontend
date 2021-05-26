import React from 'react'
import { Center, Divider, Button, VStack, Text } from '@chakra-ui/react'
import AddVotations from '../molecules/AddVotations';
import AddMeetingStatus from '../molecules/AddMeetingStatus';

const Votation: React.FC = () => {

  const outerContainer = {
    paddingTop: '5rem',
    width:'100%',
    bg:'#f9f9f9',
    color:"#718096"
  } as React.CSSProperties

  const centerContainer = {
    minWidth: '320px',
    width: '100%',
    maxWidth: '800px',
  } as React.CSSProperties;

  const buttonStyle = {
    p: "1.5em 4em",
    borderRadius: "16em",
    bg: 'gray.500',
    color: 'white',
    width: '245px'
  } as React.CSSProperties

  return (
    <Center sx={outerContainer}>
      <VStack spacing='10' align='left' sx={centerContainer}>
        <AddVotations />
        <Divider m="3em 0" />
        <VStack spacing='8'>
          <Button
            sx={buttonStyle}
          >
            Neste
          </Button>
          <AddMeetingStatus active='AddMeetingInformation' />
        </VStack>
      </ VStack>
    </Center>
  )
};

export default Votation;
