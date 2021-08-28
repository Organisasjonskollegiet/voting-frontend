import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { VStack, Heading, Text, Center } from '@chakra-ui/react';
import AddMeetingController from '../../molecules/AddMeetingController';
import AddParticipantsForm from '../molecules/AddParticipantsForm';
import { h1Style } from '../../particles/formStyles';
import { ParticipantOrInvite, useGetParticipantsByMeetingIdLazyQuery } from '../../../__generated__/graphql-types';
import Loading from '../../atoms/Loading';

interface IProps {
  meetingId: string;
  handleNavigation?: (nextIndex: number) => void;
  isActive?: boolean;
  ownerEmail: string | undefined;
  modalView?: boolean;
}

const AddParticipants: React.FC<IProps> = ({ isActive, meetingId, handleNavigation, ownerEmail, modalView }) => {
  const history = useHistory();

  const [getParticipants, { data, loading, error }] = useGetParticipantsByMeetingIdLazyQuery({
    variables: { meetingId },
  });

  useEffect(() => {
    if (meetingId && !data) {
      getParticipants();
    }
  }, [meetingId, getParticipants, data]);

  const [participants, setParticipants] = useState<ParticipantOrInvite[]>([]);

  useEffect(() => {
    if (data?.participants) {
      setParticipants(data.participants as ParticipantOrInvite[]);
    }
  }, [data]);

  if (loading) {
    return <Loading text="henter deltagere" asOverlay={false} />;
  }

  if (error || data?.participants === undefined) {
    return (
      <Center>
        <Text>Det skjedde noe galt under innlastingen</Text>
      </Center>
    );
  }

  const handleNavigationClick = (nextIndex: number) => {
    if (handleNavigation) {
      if (nextIndex > 2) {
        history.push('/');
      } else {
        handleNavigation(nextIndex);
      }
    }
  };

  if (!isActive) return <></>;

  return (
    <>
      <VStack spacing="5" align="left">
        {!modalView && (
          <Heading sx={h1Style} as="h1">
            Administrer deltagere
          </Heading>
        )}
        <Text fontSize="18px" mb={modalView ? '1.5em' : 0}>
          Her kan du invitere deltagere og gi redigeringstilgang
        </Text>
      </VStack>
      <AddParticipantsForm
        meetingId={meetingId}
        participants={participants}
        setParticipants={setParticipants}
        ownerEmail={ownerEmail}
      />
      {handleNavigation && (
        <AddMeetingController showPrev={true} activeTab={2} handleNavigation={handleNavigationClick} />
      )}
    </>
  );
};

export default AddParticipants;
