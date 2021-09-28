import React from 'react';
import Meeting, { MeetingProps } from './Meeting';
import { SimpleGrid } from '@chakra-ui/layout';

export interface MeetingListProps {
  meetings: Array<MeetingProps>;
  handleDeleteMeeting: (id: string) => void;
  meetingStatus: 'open' | 'upcoming' | 'ended';
}

const MeetingList: React.FC<MeetingListProps> = ({ meetings, handleDeleteMeeting, meetingStatus }) => {
  return (
    <SimpleGrid col="1" gap="1.5em">
      {meetings.map((meeting) => (
        <Meeting
          meetingStatus={meetingStatus}
          {...meeting}
          handleDeleteMeeting={handleDeleteMeeting}
          key={meeting.id}
        />
      ))}
    </SimpleGrid>
  );
};

export default MeetingList;
