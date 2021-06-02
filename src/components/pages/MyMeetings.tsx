import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/layout';
import MeetingList from '../molecules/MeetingList';
import { Center, extendTheme, Spinner } from '@chakra-ui/react';
import { Status, useGetMeetingsQuery } from '../../__generated__/graphql-types';
import Meeting, { MeetingProps } from '../atoms/Meeting';

const MyMeetings = () => {
  const { data, loading, error } = useGetMeetingsQuery();

  const meetingsData = data?.meetings;

  if (error) return <Text>Det skjedde noe galt under innlastingen</Text>;
  if (loading)
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );

  if(!meetingsData) return <Center><Text>Du har ingen møter</Text></Center>

  const upcomingMeetings = meetingsData.filter((meeting) => meeting?.status === Status.Upcoming);
  const ongoingMeetings = meetingsData.filter((meeting) => meeting?.status === Status.Ongoing);
  const endedMeetings = meetingsData.filter((meeting) => meeting?.status === Status.Ended);

  return (
    <Box w="80vw" m="auto"> 
      {upcomingMeetings && (
        <Box>
          <Heading as="h1">Kommende møter</Heading>
          <MeetingList meetings={upcomingMeetings as Array<MeetingProps>} />
        </Box>
      )}
      {ongoingMeetings && (
        <Box>
          <Heading as="h1">Pågående møter</Heading>
          <MeetingList meetings={ongoingMeetings as Array<MeetingProps>} />
        </Box>
      )}
      {endedMeetings && (
        <Box>
          <Heading as="h1">Tidligere møter</Heading>
          <MeetingList meetings={endedMeetings as Array<MeetingProps>} />
        </Box>
      )}
    </Box>
  );
};

export default MyMeetings;
