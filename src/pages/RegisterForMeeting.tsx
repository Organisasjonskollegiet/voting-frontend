import React, { useEffect } from 'react';
import { Center, Text, useToast, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/common/Loading';
import { useRegisterAsParticipantMutation } from '../__generated__/graphql-types';

const RegisterForMeeting: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [registerAsParticipant, { data, loading, error }] = useRegisterAsParticipantMutation();

  const { meetingId } = useParams<{ meetingId: string }>();

  useEffect(() => {
    if (meetingId && !loading && !data && !error) {
      registerAsParticipant({ variables: { meetingId } });
    }
  }, [meetingId, data, loading, error, registerAsParticipant]);

  useEffect(() => {
    if (data) {
      toast({
        title: 'Du ble lagt til i møtet',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate(`/meeting/${meetingId}`, { replace: true });
    }
  }, [data, navigate, meetingId, toast]);

  if (loading) return <Loading text="Registrerer deg som deltaker" />;

  if (error)
    return (
      <Center mt="10vh" mb="1vh">
        <VStack>
          <Text as="b">Kunne ikke registrere deg som deltaker.</Text>
          <Text>Enten finnes ikke møtet, eller så tillater det ikke selvregistrering.</Text>
        </VStack>
      </Center>
    );

  return <></>;
};

export default RegisterForMeeting;
