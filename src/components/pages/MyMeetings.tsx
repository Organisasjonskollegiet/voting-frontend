import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/layout';
import MeetingList from '../molecules/MeetingList';
import { Center, Spinner } from '@chakra-ui/react';

const MyMeetings = () => {
  //TODO lage følgende query
  const { data, loading, error } = useGetMeetingsByUser();

  const meetingsData = data?.meetingByUser;
  const upcomingMeetings = meetingsData.filter((meeting) => meeting.status === Status.Upcoming);
  const ongoingMeetings = meetingsData.filter((meeting) => meeting.status === Status.Ongoing);
  const endedMeetings = meetingsData.filter((meeting) => meeting.status === Status.Ended);

  if (error) return <Text>Det skjedde noe galt under innlastingen</Text>;
  if (loading)
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );

  return (
    <Box>
      {upcomingMeetings.length() > 0 && (
        <Box>
          <Heading as="h1">Kommende møter</Heading>
          <MeetingList {...upcomingMeetings} />
        </Box>
      )}
      {ongoingMeetings.length() > 0 && (
        <Box>
          <Heading as="h1">Pågående møter</Heading>
          <MeetingList {...ongoingMeetings} />
        </Box>
      )}
      {endedMeetings.length() > 0 && (
        <Box>
          <Heading as="h1">Pågående møter</Heading>
          <MeetingList {...endedMeetings} />
        </Box>
      )}
    </Box>
  );
};

export default MyMeetings;
