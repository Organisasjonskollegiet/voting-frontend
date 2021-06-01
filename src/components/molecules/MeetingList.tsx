import { Flex } from '@chakra-ui/layout';
import React from 'react';
import Meeting, { MeetingProps } from '../atoms/Meeting';

export interface MeetingListProps {
  meetings: Array<MeetingProps>;
}

const MeetingList: React.FC<MeetingListProps> = ({ meetings }) => {
  return (
    <Flex>
      {meetings.map((meeting) => (
        <Meeting {...meeting} key={meeting.id} />
      ))}
    </Flex>
  );
};

export default MeetingList;
