import React, { useEffect } from 'react';
import { Box, Heading, Text } from '@chakra-ui/layout';
import MeetingList from '../components/myMeetings/MeetingList';
import { Center, Spinner, useToast } from '@chakra-ui/react';
import { useGetMeetingsQuery, useDeleteMeetingMutation } from '../__generated__/graphql-types';
import { MeetingProps } from '../components/myMeetings/Meeting';
import PageContainer from '../components/common/PageContainer';
import Loading from '../components/common/Loading';

const MyMeetings: React.FC = () => {
  const { data, loading, error, refetch } = useGetMeetingsQuery();
  const [
    deleteMeeting,
    { data: deleteMeetingData, error: deleteMeetingError, loading: deleteMeetingLoading },
  ] = useDeleteMeetingMutation();
  const toast = useToast();
  const meetingsData = data?.meetings;

  useEffect(() => {
    if (deleteMeetingData?.deleteMeeting) {
      if (meetingsData?.map((meeting) => meeting?.id).includes(deleteMeetingData.deleteMeeting.id)) {
        refetch();
        toast({
          title: 'Møtet ble slettet',
          description: '',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }, [deleteMeetingData, meetingsData, refetch, toast]);

  useEffect(() => {
    const toastId = 'errorDeletingMeeting';
    if (deleteMeetingError && toast.isActive(toastId)) {
      toast({
        id: toastId,
        title: 'Kunne ikke slette møte.',
        description:
          'Det oppstod et problem med å slette måte. Prøv på ny eller ta kontakt med Organisasjonskollegiet.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [deleteMeetingError, toast]);

  if (error) {
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

  const upcomingMeetings = meetingsData
    .filter((meeting) => new Date() < new Date(meeting?.startTime))
    .sort((a, b) => new Date(a?.startTime).getTime() - new Date(b?.startTime).getTime());

  const ongoingMeetings = meetingsData
    .filter((meeting) => {
      const start = new Date(meeting?.startTime);
      const nextMorning = new Date(meeting?.startTime);
      const now = new Date();
      nextMorning.setDate(nextMorning.getDate() + 1);
      nextMorning.setHours(6);
      return start < now && now < nextMorning;
    })
    .sort((a, b) => new Date(a?.startTime).getTime() - new Date(b?.startTime).getTime());

  const endedMeetings = meetingsData
    .filter((meeting) => {
      const nextMorning = new Date(meeting?.startTime);
      nextMorning.setDate(nextMorning.getDate() + 1);
      nextMorning.setHours(6);
      return nextMorning < new Date();
    })
    .sort((a, b) => new Date(b?.startTime).getTime() - new Date(a?.startTime).getTime());

  return (
    <PageContainer>
      {deleteMeetingLoading && <Loading asOverlay text="Sletter møte" />}
      <Box m="auto" pt="5em" pb="1.125em" maxWidth="600px">
        {meetingsData.length === 0 && (
          <Center m="0 2em 2.625em">
            <Text>Du har ingen kommende møter</Text>
          </Center>
        )}
        {(ongoingMeetings.length > 0 || upcomingMeetings.length > 0) && (
          <Heading as="h1" fontSize="1em" mx="2em" mb="1.125em">
            Mine møter
          </Heading>
        )}
        {ongoingMeetings.length > 0 && (
          <Box m="0 2em 1.5em">
            <MeetingList
              meetingStatus="open"
              handleDeleteMeeting={(id: string) => deleteMeeting({ variables: { id } })}
              meetings={ongoingMeetings as Array<MeetingProps>}
            />
          </Box>
        )}
        {upcomingMeetings.length > 0 && (
          <Box m="0 2em 1.5em">
            <MeetingList
              meetingStatus="upcoming"
              handleDeleteMeeting={(id: string) => deleteMeeting({ variables: { id } })}
              meetings={upcomingMeetings as Array<MeetingProps>}
            />
          </Box>
        )}
        {endedMeetings.length > 0 && (
          <Box m="0 2em 2.625em">
            <Heading as="h1" fontSize="1em" mb="1.125em">
              Avsluttede møter
            </Heading>
            <MeetingList
              meetingStatus="ended"
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
