import React from 'react';
import Meeting, { MeetingProps } from '../atoms/Meeting';
import { SimpleGrid } from '@chakra-ui/layout';

export interface MeetingListProps {
  meetings: Array<MeetingProps>;
}

const MeetingList: React.FC<MeetingListProps> = ({ meetings }) => {
  return (
    <SimpleGrid col="1" gap="1.5em">
      {meetings.map((meeting) => (
        <Meeting {...meeting} key={meeting.id} />
      ))}
    </SimpleGrid>
  );
};

export default MeetingList;
