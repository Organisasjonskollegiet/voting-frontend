import { Box, Flex, Heading, Text, Button, HStack } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Role } from '../../__generated__/graphql-types';
import { useAuth0 } from '@auth0/auth0-react';
import DeleteIcon from '../../static/deleteIcon.svg';
import EditIcon from '../../static/editIcon.svg';

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
  boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
  padding: '1em 2em',
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
    if (
      e.target.name === 'edit-meeting' ||
      e.target.closest('button').name === 'edit-meeting' ||
      e.target.name === 'delete-meeting' ||
      e.target.closest('button').name === 'delete-meeting'
    ) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      history.push(`/meeting/${id}`);
    }
  };

  return (
    <Box _hover={{ cursor: 'pointer' }} onClick={handleClick} sx={styles}>
      <Flex justifyContent="space-between">
        <Box width="100%">
          <Heading as="h2" fontSize="1.125em">
            {' '}
            {title}{' '}
          </Heading>
          <Text mb="1em" fontSize="0.75em">
            {' '}
            {description}{' '}
          </Text>
        </Box>

        {isAdmin && (
          <HStack>
            <Button
              name="edit-meeting"
              leftIcon={<img src={EditIcon} alt="edit" />}
              onClick={() => history.push(`/meeting/${id}/edit`)}
            />
            <Button
              name="delete-meeting"
              leftIcon={<img src={DeleteIcon} alt="delete" />}
              onClick={() => handleDeleteMeeting(id)}
            />
          </HStack>
        )}
      </Flex>
      <Flex justifyContent="space-between" fontSize="0.75em">
        <Text fontWeight="bold"> {organization} </Text>
        <Text fontWeight="bold">{new Date(startTime).toLocaleDateString('nb-no')}</Text>
      </Flex>
    </Box>
  );
};

export default Meeting;
