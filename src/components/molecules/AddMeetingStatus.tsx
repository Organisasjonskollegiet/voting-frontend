import React from 'react';
import { HStack, Text, Divider, Center } from '@chakra-ui/react';

interface IProps {
  active: string;
}

const AddMeetingStatus: React.FC<IProps> = ({active}) => {

  const dividerStyle = {
    border:'2px solid',
    width:'46px',
    borderColor: '#718096'
  } as React.CSSProperties

  const activeStyle = {
    color:'#43679C',
    fontWeight:'bold',
  } as React.CSSProperties
  
  return (
    <Center>
      <HStack width='100%' spacing='4'>
        <Text sx={active === 'AddMeetingInformation' ? activeStyle : undefined} >
          Opprette møte
        </Text>
        <Divider sx={dividerStyle} />
        <Text sx={active === 'AddVotations' ? activeStyle : undefined}>
          Legge til møtesaker
        </Text>
        <Divider sx={dividerStyle} />
        <Text sx={active === 'AddParticipants' ? activeStyle : undefined}>
          Invitere møtedeltakere
        </Text>
      </HStack>
    </Center>
  )
}

export default AddMeetingStatus;