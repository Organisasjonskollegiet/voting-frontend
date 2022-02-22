import React from 'react';
import { Heading, VStack, Text } from '@chakra-ui/react';
import MeetingInformationForm from './MeetingInformationForm';
import { MeetingWorking } from '../../types/types';

interface IProps {
  meeting: MeetingWorking;
  updateMeeting: (meeting: MeetingWorking) => void;
}

const ManageMeetingInformation: React.FC<IProps> = ({ updateMeeting, meeting }) => {
  const onChange = (meeting: MeetingWorking) => {
    updateMeeting(meeting);
  };

  return (
    <>
      <VStack spacing="5" align="left">
        <Heading size="lg">Legg til møteinformasjon</Heading>
        <Text fontSize="lg">Her kan du legge til informasjon om møtet </Text>
      </VStack>
      <MeetingInformationForm meeting={meeting} onChange={onChange} />
    </>
  );
};

export default ManageMeetingInformation;
