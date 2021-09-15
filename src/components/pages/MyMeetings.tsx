import React, { useEffect } from 'react';
import { Box, Heading, Text } from '@chakra-ui/layout';
import MeetingList from '../particles/MeetingList';
import { Center, Spinner, useToast } from '@chakra-ui/react';
import { useGetMeetingsQuery, useDeleteMeetingMutation } from '../../__generated__/graphql-types';
import { MeetingProps } from '../molecules/Meeting';
import PageContainer from '../atoms/PageContainer';
import Loading from '../atoms/Loading';

const MyMeetings: React.FC = () => {
  const { data, loading, error, refetch } = useGetMeetingsQuery();
  const [deleteMeeting, deleteMeetingResult] = useDeleteMeetingMutation();
  const toast = useToast();
  const meetingsData = data?.meetings;

  useEffect(() => {
    if (deleteMeetingResult.data?.deleteMeeting) {
      if (meetingsData?.map((meeting) => meeting?.id).includes(deleteMeetingResult.data.deleteMeeting.id)) {
        refetch();
        toast({
          title: 'Møtet ble slettet',
          description: '',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }, [deleteMeetingResult.data, meetingsData, refetch, toast]);

  if (error) {
    console.log(error);
    return (
      <Center mt="20vh">
        <Text>Det skjedde noe galt under innlastingen</Text>
      </Center>
    );
  }
  if (loading) {
    return (
      <Center mt="15vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!meetingsData) {
    return (
      <Center mt="20vh">
        <Text>Du har ingen møter</Text>
      </Center>
    );
  }

  const upcomingMeetings = meetingsData.filter((meeting) => new Date() < new Date(meeting?.startTime));

  const ongoingMeetings = meetingsData.filter((meeting) => {
    const start = new Date(meeting?.startTime);
    const nextMorning = new Date(meeting?.startTime);
    const now = new Date();
    nextMorning.setDate(nextMorning.getDate() + 1);
    nextMorning.setHours(6);
    return start < now && now < nextMorning;
  });

  const endedMeetings = meetingsData.filter((meeting) => {
    const nextMorning = new Date(meeting?.startTime);
    nextMorning.setDate(nextMorning.getDate() + 1);
    nextMorning.setHours(6);
    return nextMorning < new Date();
  });

  return (
    <PageContainer>
      {deleteMeetingResult.loading && <Loading asOverlay={true} text="Sletter møte" />}
      <Box m="auto" pt="5em" pb="1.125em" maxWidth="600px">
        {meetingsData.length === 0 && (
          <Center m="0 2em 2.625em">
            <Text>Du har ingen kommende møter</Text>
          </Center>
        )}
        {ongoingMeetings.length > 0 && (
          <Box m="0 2em 2.625em">
            <Heading as="h1" fontSize="1em" mb="1.125em">
              Pågående møter
            </Heading>
            <MeetingList
              handleDeleteMeeting={(id: string) => deleteMeeting({ variables: { id } })}
              meetings={ongoingMeetings as Array<MeetingProps>}
            />
          </Box>
        )}
        {upcomingMeetings.length > 0 && (
          <Box m="0 2em 2.625em">
            <Heading as="h1" fontSize="1em" mb="1.125em">
              Kommende møter
            </Heading>
            <MeetingList
              handleDeleteMeeting={(id: string) => deleteMeeting({ variables: { id } })}
              meetings={upcomingMeetings as Array<MeetingProps>}
            />
          </Box>
        )}
        {endedMeetings.length > 0 && (
          <Box m="0 2em 2.625em">
            <Heading as="h1" fontSize="1em" mb="1.125em">
              {' '}
              Tidligere møter
            </Heading>
            <MeetingList
              handleDeleteMeeting={(id: string) => deleteMeeting({ variables: { id } })}
              meetings={endedMeetings as Array<MeetingProps>}
            />
          </Box>
        )}
      </Box>
    </PageContainer>
  );
};

export default MyMeetings;
