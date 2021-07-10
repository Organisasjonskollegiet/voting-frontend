import React, { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/layout';
import MeetingList from '../molecules/MeetingList';
import {
  Center,
  Spinner,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  Button,
} from '@chakra-ui/react';
import { MeetingStatus, useGetMeetingsQuery, useDeleteMeetingMutation } from '../../__generated__/graphql-types';
import { MeetingProps } from '../atoms/Meeting';
import PageContainer from '../atoms/PageContainer';
import DeleteAlertDialog from '../atoms/DeleteAlertDialog';

const MyMeetings: React.FC = () => {
  const { data, loading, error, refetch } = useGetMeetingsQuery();
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const [deleteMeeting, deleteMeetingResult] = useDeleteMeetingMutation();
  const [meetingToDelete, setMeetingToDelete] = useState<string>('');
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  const meetingsData = data?.meetings;

  const handleDeleteMeeting = (id: string) => {
    setMeetingToDelete(id);
    setDialogIsOpen(true);
  };

  const handleConfirmDeleteMeeting = () => {
    if (meetingToDelete && meetingToDelete.length > 0) {
      deleteMeeting({ variables: { id: meetingToDelete } });
      setMeetingToDelete('');
      setDialogIsOpen(false);
    }
  };

  const handleCancelDeleteMeeting = () => {
    setMeetingToDelete('');
    setDialogIsOpen(false);
  };

  useEffect(() => {
    if (deleteMeetingResult.data?.deleteMeeting) {
      if (meetingsData?.map((meeting) => meeting?.id).includes(deleteMeetingResult.data.deleteMeeting.id)) {
        refetch();
      }
    }
  }, [deleteMeetingResult, meetingsData, refetch]);

  if (error)
    return (
      <Center mt="20vh">
        <Text>Det skjedde noe galt under innlastingen</Text>
      </Center>
    );

  if (loading)
    return (
      <Center mt="15vh">
        <Spinner size="xl" />
      </Center>
    );

  if (!meetingsData)
    return (
      <Center mt="20vh">
        <Text>Du har ingen møter</Text>
      </Center>
    );

  const upcomingMeetings = meetingsData.filter((meeting) => meeting?.status === MeetingStatus.Upcoming);
  const ongoingMeetings = meetingsData.filter((meeting) => meeting?.status === MeetingStatus.Ongoing);
  const endedMeetings = meetingsData.filter((meeting) => meeting?.status === MeetingStatus.Ended);

  return (
    <PageContainer>
      <Box w="65vw" m="auto" pt="5em" pb="1.125em" maxWidth="700px">
        {meetingsData.length === 0 && (
          <Center mb="2.625em">
            <Text>Du har ingen kommende møter</Text>
          </Center>
        )}
        {ongoingMeetings.length > 0 && (
          <Box mb="2.625em">
            <Heading as="h1" fontSize="1em" mb="1.125em">
              Pågående møter
            </Heading>
            <MeetingList handleDeleteMeeting={handleDeleteMeeting} meetings={ongoingMeetings as Array<MeetingProps>} />
          </Box>
        )}
        {upcomingMeetings.length > 0 && (
          <Box mb="2.625em">
            <Heading as="h1" fontSize="1em" mb="1.125em">
              Kommende møter
            </Heading>
            <MeetingList handleDeleteMeeting={handleDeleteMeeting} meetings={upcomingMeetings as Array<MeetingProps>} />
          </Box>
        )}
        {endedMeetings.length > 0 && (
          <Box mb="2.625em">
            <Heading as="h1" fontSize="1em" mb="1.125em">
              {' '}
              Tidligere møter
            </Heading>
            <MeetingList handleDeleteMeeting={handleDeleteMeeting} meetings={endedMeetings as Array<MeetingProps>} />
          </Box>
        )}
      </Box>
      <DeleteAlertDialog
        dialogIsOpen={dialogIsOpen}
        handleCancelDelete={handleCancelDeleteMeeting}
        handleConfirmDelete={handleConfirmDeleteMeeting}
      />
    </PageContainer>
  );
};

export default MyMeetings;
