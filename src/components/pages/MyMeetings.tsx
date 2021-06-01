import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/layout';
import MeetingList from '../molecules/MeetingList';
import { Center, Spinner } from '@chakra-ui/react';
import { Status, useGetMeetingsQuery } from '../../__generated__/graphql-types';

const MyMeetings = () => {
  //TODO lage følgende query
  const { data, loading, error } = useGetMeetingsQuery();

  const meetingsData = data?.meetings;

  if (error) return <Text>Det skjedde noe galt under innlastingen</Text>;
  if (loading)
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );

  const upcomingMeetings = meetingsData?.filter((meeting) => meeting?.status === Status.Upcoming);
  const ongoingMeetings = meetingsData?.filter((meeting) => meeting?.status === Status.Ongoing);
  const endedMeetings = meetingsData?.filter((meeting) => meeting?.status === Status.Ended);

  return (
    <Box>
      {upcomingMeetings && (
        <Box>
          <Heading as="h1">Kommende møter</Heading>
          <MeetingList meetings={upcomingMeetings} />
        </Box>
      )}
      {ongoingMeetings && (
        <Box>
          <Heading as="h1">Pågående møter</Heading>
          <MeetingList meetings={ongoingMeetings} />
        </Box>
      )}
      {endedMeetings && (
        <Box>
          <Heading as="h1">Pågående møter</Heading>
          <MeetingList meetings={endedMeetings} />
        </Box>
      )}
    </Box>
  );
};

export default MyMeetings;
