import React from 'react';
import Meeting, { MeetingProps } from '../atoms/Meeting';
import { SimpleGrid } from '@chakra-ui/layout';

export interface MeetingListProps {
  meetings: Array<MeetingProps>;
  handleDeleteMeeting: (id: string) => void;
}

const MeetingList: React.FC<MeetingListProps> = ({ meetings, handleDeleteMeeting }) => {
  return (
    <SimpleGrid col="1" gap="1.5em">
      {meetings.map((meeting) => (
        <Meeting {...meeting} handleDeleteMeeting={handleDeleteMeeting} key={meeting.id} />
      ))}
    </SimpleGrid>
  );
};

export default MeetingList;
