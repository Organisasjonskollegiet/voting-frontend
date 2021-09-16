import { Box, Flex, Heading, Text, Button, HStack } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Role } from '../../__generated__/graphql-types';
import { useAuth0 } from '@auth0/auth0-react';
import DeleteIcon from '../../static/deleteIcon.svg';
import EditIcon from '../../static/editIcon.svg';
import CustomAlertDialog, { DialogType } from '../common/CustomAlertDialog';
import { boxShadow } from '../styles/formStyles';
import { expandAndLift, transition } from '../styles/styles';

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
  overflow: 'auto',
  ...transition,
} as React.CSSProperties;

const Meeting: React.FC<MeetingProps & { handleDeleteMeeting: (id: string) => void }> = ({
  id,
  title,
  startTime,
  description,
  organization,
  participants,
  handleDeleteMeeting,
}) => {
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
    <Box _hover={{ cursor: 'pointer', ...expandAndLift }} onClick={handleClick} sx={styles}>
      <Flex justifyContent="space-between">
        <Box width="100%">
          {/* <button onClick={handleClick}> */}
          <Heading as="h2" fontSize="1.125em">
            {' '}
            {title}{' '}
          </Heading>
          {/* </button> */}
          {description && (
            <Text mb="1em" fontSize="0.75em">
              {' '}
              {description}{' '}
            </Text>
          )}
        </Box>

        {isAdmin && (
          <HStack>
            <Button
              bg="transparent"
              name="edit-meeting"
              leftIcon={<img src={EditIcon} alt="edit" />}
              onClick={() => history.push(`/meeting/${id}/edit`)}
            />
            <Button
              bg="transparent"
              name="delete-meeting"
              leftIcon={<img src={DeleteIcon} alt="delete" />}
              onClick={() => setDialogIsOpen(true)}
            />
          </HStack>
        )}
      </Flex>
      <Flex justifyContent="space-between" fontSize="0.75em">
        <Text fontWeight="bold"> {organization} </Text>
        <Text fontWeight="bold">{new Date(startTime).toLocaleDateString('nb-no')}</Text>
      </Flex>
      <CustomAlertDialog
        dialogIsOpen={dialogIsOpen}
        handleConfirm={() => {
          setDialogIsOpen(false);
          handleDeleteMeeting(id);
        }}
        handleCancel={() => setDialogIsOpen(false)}
        type={DialogType.MEETING}
      />
    </Box>
  );
};

export default Meeting;
