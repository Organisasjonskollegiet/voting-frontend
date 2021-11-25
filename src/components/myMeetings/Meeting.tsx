import { Heading, Text, HStack, VStack, Box } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Role } from '../../__generated__/graphql-types';
import { useAuth0 } from '@auth0/auth0-react';
import CustomAlertDialog, { DialogType } from '../common/CustomAlertDialog';
import { boxShadow } from '../styles/formStyles';
import { /*expandAndLift,*/ transition } from '../styles/styles';
import CustomTag from '../common/CustomTag';
import { green, lightGray } from '../styles/colors';
import { formatMeetingTime, formatTimeLeftToMeeting } from './utils';
import MeetingActionsWithPopover from './MeetingActionsWithPopover';

interface ParticipantResult {
  user: {
    id: string;
  };
  role: Role;
}
export interface MeetingProps {
  id: string;
  title: string;
  description?: string | null;
  startTime: string;
  organization: string;
  participants: ParticipantResult[];
}

const styles = {
  width: '100%',
  borderRadius: '4px',
  boxShadow,
  padding: '1em 2em',
  overflow: 'hidden',
  ...transition,
} as React.CSSProperties;

const Meeting: React.FC<
  MeetingProps & { handleDeleteMeeting: (id: string) => void; meetingStatus: 'open' | 'upcoming' | 'ended' }
> = ({ id, title, startTime, participants, handleDeleteMeeting, meetingStatus }) => {
  const { user } = useAuth0();
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  useEffect(() => {
    if (user?.sub && participants.length > 0) {
      setIsAdmin(
        participants.filter((participant) => `auth0|${participant.user?.id}` === user?.sub)[0].role === Role.Admin
      );
    }
  }, [user?.sub, participants]);

  // eslint-disable-next-line
  const handleClick = (e: any) => {
    // check if the button clicked was the edit or delete button and if so,
    // avoid navigating to the meeting
    // if e.target.closest('button').name gives an error, that is because you are pressing
    // div or text inside, so you should navigate to meeting
    try {
      if (e.target.closest('button').name === 'edit-meeting' || e.target.closest('button').name === 'delete-meeting') {
        e.preventDefault();
        e.stopPropagation();
      } else {
        history.push(`/meeting/${id}`);
      }
    } catch (error) {
      history.push(`/meeting/${id}`);
    }
  };

  return (
    <VStack
      alignItems="start"
      spacing="1rem"
      _hover={{ cursor: 'pointer' /*, ...expandAndLift*/ }}
      onClick={handleClick}
      sx={styles}
    >
      <HStack justifyContent="space-between" w="100%">
        {meetingStatus === 'open' || meetingStatus === 'ended' ? (
          <CustomTag
            bgColor={meetingStatus === 'open' ? green() : lightGray}
            text={meetingStatus === 'open' ? 'Aktiv' : 'Avsluttet'}
          />
        ) : (
          <Text color={lightGray} fontWeight="bold" fontSize="0.75rem">
            {formatTimeLeftToMeeting(new Date(startTime), new Date())}
          </Text>
        )}
        {isAdmin && <CustomTag bgColor={lightGray} text="Admin" />}
      </HStack>
      <VStack alignItems="start">
        <Heading size="lg">{title}</Heading>
        <Text fontSize="md">{formatMeetingTime(new Date(startTime))}</Text>
      </VStack>
      {isAdmin ? (
        <MeetingActionsWithPopover
          meetingStatus={meetingStatus}
          onEditClick={() => history.push(`/meeting/${id}/edit`)}
          onDeleteClick={() => setDialogIsOpen(true)}
        />
      ) : (
        <Box h="1rem" />
      )}
      <CustomAlertDialog
        dialogIsOpen={dialogIsOpen}
        handleConfirm={() => {
          setDialogIsOpen(false);
          handleDeleteMeeting(id);
        }}
        handleCancel={() => setDialogIsOpen(false)}
        type={DialogType.MEETING}
        confirmColor="red"
      />
    </VStack>
  );
};

export default Meeting;
