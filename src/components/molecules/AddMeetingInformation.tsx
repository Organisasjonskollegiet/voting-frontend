import React from 'react';
import { Heading, VStack, Text } from '@chakra-ui/react';
import MeetingInformationForm from './MeetingInformationForm'
import AddMeetingController from './AddMeetingController';
import {h1Style} from '../particles/formStyles'
import { MeetingWorking } from '../../types/types'

interface IProps {
  meeting: MeetingWorking;
  updateMeeting: (meeting: MeetingWorking) => void;
  handleNext: () => void;
  isActive: boolean;
}


const AddMeetingInformation: React.FC<IProps> = ({ isActive, updateMeeting, meeting, handleNext }) => {
 
  const onChange = (meeting: MeetingWorking) => {
    updateMeeting(meeting)
  }

  if (!isActive) return <></>;

  return (
    <>
      <VStack spacing='5' align='left'>
        <Heading sx={h1Style} as='h1'>Legg til møteinformasjon</Heading>
        <Text fontSize='20px'>Her kan du legge til informasjon om møtet </Text>
      </VStack>
      <MeetingInformationForm meeting={meeting} onChange={onChange} />
      <AddMeetingController handleNext={handleNext} showPrev={false} activeTab={0} /> 
    </>
  )
   
};

export default AddMeetingInformation;