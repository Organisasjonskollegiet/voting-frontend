import React from 'react';
import { Heading, VStack, Text } from '@chakra-ui/react';
import MeetingInformationForm from '../molecules/MeetingInformationForm';
import AddMeetingController from '../molecules/AddMeetingController';
import { h1Style } from './formStyles';
import { MeetingWorking } from '../../types/types';

interface IProps {
  meeting: MeetingWorking;
  updateMeeting: (meeting: MeetingWorking) => void;
  handleNavigation: (nextIndex: number) => void;
  isActive: boolean;
}

const AddMeetingInformation: React.FC<IProps> = ({ isActive, updateMeeting, meeting, handleNavigation }) => {
  const onChange = (meeting: MeetingWorking) => {
    updateMeeting(meeting);
  };

  if (!isActive) return <></>;

  return (
    <>
      <VStack spacing="5" align="left">
        <Heading sx={h1Style} as="h1">
          Legg til møteinformasjon
        </Heading>
        <Text fontSize="20px">Her kan du legge til informasjon om møtet </Text>
      </VStack>
      <MeetingInformationForm meeting={meeting} onChange={onChange} />
      <AddMeetingController handleNavigation={handleNavigation} showPrev={false} activeTab={0} />
    </>
  );
};

export default AddMeetingInformation;
