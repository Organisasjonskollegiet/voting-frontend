import React, { useEffect } from 'react';
import { Center, Text, VStack } from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router';
import Loading from '../components/common/Loading';
import { useRegisterAsParticipantMutation } from '../__generated__/graphql-types';

const RegisterForMeeting = () => {
  const history = useHistory();
  const [registerAsParticipant, { data, loading, error }] = useRegisterAsParticipantMutation();

  const { meetingId } = useParams<{ meetingId: string }>();

  useEffect(() => {
    if (meetingId && !loading && !data && !error) {
      registerAsParticipant({ variables: { meetingId } });
    }
  }, [meetingId, data, loading, error]);

  useEffect(() => {
    if (data) {
      history.push(`/meeting/${meetingId}`);
    }
  }, [data]);

  if (loading) return <Loading text="Registrer deg som deltaker" />;

  if (error)
    return (
      <Center mt="10vh">
        <VStack>
          <Text>Kunne ikke registrere deg som deltaker.</Text>
          <Text>Enten finnes ikke møtet, eller så tillater det ikke selvregistrering.</Text>
        </VStack>
      </Center>
    );

  return <></>;
};

export default RegisterForMeeting;
