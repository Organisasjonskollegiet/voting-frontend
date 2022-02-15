import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VStack, Heading, Text, Center } from '@chakra-ui/react';
import ManageMeetingController from '../../manageMeeting/ManageMeetingController';
import AddParticipantsForm from '../molecules/AddParticipantsForm';
import { ParticipantOrInvite, useGetParticipantsByMeetingIdLazyQuery } from '../../../__generated__/graphql-types';

interface IProps {
  meetingId: string;
  handleNavigation?: (nextIndex: number) => void;
  isActive?: boolean;
  ownerEmail: string | undefined;
  modalView?: boolean;
}

const ManageParticipants: React.FC<IProps> = ({ isActive, meetingId, handleNavigation, ownerEmail, modalView }) => {
  const navigate = useNavigate();

  const [getParticipants, { data, loading, error }] = useGetParticipantsByMeetingIdLazyQuery({
    variables: { meetingId },
    fetchPolicy: 'cache-and-network',
  });

  const [participants, setParticipants] = useState<ParticipantOrInvite[]>([]);

  useEffect(() => {
    if (meetingId && !data) {
      getParticipants();
    }
  }, [meetingId, getParticipants, data]);

  useEffect(() => {
    if (data?.participants) {
      setParticipants(data.participants as ParticipantOrInvite[]);
    }
  }, [data]);

  if (!isActive) return <></>;

  if (!loading && (error || data?.participants === undefined)) {
    return (
      <Center>
        <Text>Det skjedde noe galt under innlastingen</Text>
      </Center>
    );
  }

  const handleNavigationClick = (nextIndex: number) => {
    if (handleNavigation) {
      if (nextIndex > 2) {
        navigate('/', { replace: true });
      } else {
        handleNavigation(nextIndex);
      }
    }
  };

  return (
    <>
      <VStack spacing="5" align="left">
        {!modalView && <Heading size="lg">Administrer deltagere</Heading>}
        <Text fontSize="lg" mb={modalView ? '1.5em' : 0}>
          Her kan du invitere deltagere og gi redigeringstilgang
        </Text>
      </VStack>
      <AddParticipantsForm
        meetingId={meetingId}
        participants={participants}
        setParticipants={setParticipants}
        ownerEmail={ownerEmail}
        participantsLoading={loading}
      />
      {handleNavigation && (
        <ManageMeetingController showPrev={true} activeTab={2} handleNavigation={handleNavigationClick} />
      )}
    </>
  );
};

export default ManageParticipants;
