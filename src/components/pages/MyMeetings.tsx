import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/layout';
import MeetingList from '../molecules/MeetingList';
import { Center, Spinner } from '@chakra-ui/react';
import { MeetingStatus, useGetMeetingsQuery } from '../../__generated__/graphql-types';
import { MeetingProps } from '../atoms/Meeting';
import PageContainer from '../atoms/PageContainer';
import Navbar from './Navbar';

const MyMeetings: React.FC = () => {
  const { data, loading, error } = useGetMeetingsQuery();
  const meetingsData = data?.meetings;

  if (error) return <Text>Det skjedde noe galt under innlastingen</Text>;
  if (loading)
    return (
<<<<<<< HEAD
      <PageContainer>
        <Navbar />
        <Center mt="5em"><Spinner size="xl" /></Center>
      </PageContainer>    
=======
      <Center mt="10vh">
        <Spinner size="xl" />
      </Center>
    );
  if (!meetingsData)
    return (
      <Center>
        <Text>Du har ingen møter</Text>
      </Center>
>>>>>>> 8778fe18576fa68efd57852ab92708e982982c6a
    );

  const upcomingMeetings = meetingsData.filter((meeting) => meeting?.status === MeetingStatus.Upcoming);
  const ongoingMeetings = meetingsData.filter((meeting) => meeting?.status === MeetingStatus.Ongoing);
  const endedMeetings = meetingsData.filter((meeting) => meeting?.status === MeetingStatus.Ended);

  return (
<<<<<<< HEAD
    <PageContainer>
      <Navbar/>
      <Box w="65vw" m="auto" mt="5em" pb="1.125em"> 
        {ongoingMeetings.length > 0 && (
          <Box mb="2.625em">
            <Heading as="h1" fontSize="1em" mb="1.125em">Pågående møter</Heading>
            <MeetingList meetings={ongoingMeetings as Array<MeetingProps>} />
          </Box>
        )}
        {upcomingMeetings.length > 0 && (
          <Box mb="2.625em">
            <Heading as="h1" fontSize="1em" mb="1.125em">Kommende møter</Heading>
            <MeetingList meetings={upcomingMeetings as Array<MeetingProps>} />
          </Box>
        )}
        {endedMeetings.length > 0 && (
          <Box mb="2.625em"> 
            <Heading as="h1" fontSize="1em" mb="1.125em"> Tidligere møter</Heading>
            <MeetingList meetings={endedMeetings as Array<MeetingProps>} />
          </Box>
        )}
      </Box>
    </PageContainer>
    
=======
    <Box w="65vw" m="auto" mt="10vh">
      {ongoingMeetings.length > 0 && (
        <Box mb="2.625em">
          <Heading as="h1" fontSize="1em" mb="1.125em">
            Pågående møter
          </Heading>
          <MeetingList meetings={ongoingMeetings as Array<MeetingProps>} />
        </Box>
      )}
      {upcomingMeetings.length > 0 && (
        <Box mb="2.625em">
          <Heading as="h1" fontSize="1em" mb="1.125em">
            Kommende møter
          </Heading>
          <MeetingList meetings={upcomingMeetings as Array<MeetingProps>} />
        </Box>
      )}
      {endedMeetings.length > 0 && (
        <Box mb="2.625em">
          <Heading as="h1" fontSize="1em" mb="1.125em">
            {' '}
            Tidligere møter
          </Heading>
          <MeetingList meetings={endedMeetings as Array<MeetingProps>} />
        </Box>
      )}
    </Box>
>>>>>>> 8778fe18576fa68efd57852ab92708e982982c6a
  );
};

export default MyMeetings;
