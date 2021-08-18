import React, { useState, useEffect } from 'react';
import { Center, VStack, useToast, Text } from '@chakra-ui/react';
import AddVotations from '../molecules/AddVotations';
import { useUpdateMeetingMutation, useGetMeetingByIdQuery } from '../../__generated__/graphql-types';
import AddMeetingInformation from '../molecules/AddMeetingInformation';
import AuthWrapper from '../../services/auth/AuthWrapper';
import AddParticipants from '../molecules/AddParticipants';
import { useParams } from 'react-router';
import { MeetingWorking, ParticipantWorking } from '../../types/types';
import Loading from '../atoms/Loading';

const AddMeeting: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { data, loading, error } = useGetMeetingByIdQuery({
    variables: {
      meetingId,
    },
  });

  const toast = useToast();

  const emptyMeeting = {
    title: '',
    organization: '',
    startTime: new Date(),
    description: '',
  };

  const [meeting, setMeeting] = useState<MeetingWorking>(emptyMeeting);

  const [meetingHasBeenEdited, setMeetingHasBeenEdited] = useState<boolean>(false);

  const [participants, setParticipants] = useState<ParticipantWorking[]>([]);

  const [updateMeeting, updateMeetingResult] = useUpdateMeetingMutation();

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleCreatedOrUpdatedMeeting = (meeting: MeetingWorking, action: 'updated' | 'created') => {
    setMeeting({
      id: meeting.id,
      title: meeting.title,
      description: meeting.description ?? '',
      organization: meeting.organization,
      startTime: new Date(meeting.startTime),
    });
    setMeetingHasBeenEdited(false);
    setActiveTab(1);
    const responseKeyWord = action === 'created' ? 'opprettet' : 'oppdatert';
    toast({
      title: `Møte ${responseKeyWord}`,
      description: `Møtet ble ${responseKeyWord}.`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (data?.meetingById && !meeting.id) {
      const meeting = data.meetingById;
      setMeeting({
        id: meeting.id,
        title: meeting.title,
        description: meeting.description ?? '',
        organization: meeting.organization,
        startTime: new Date(meeting.startTime),
      });
      if (data.participants) {
        setParticipants(
          data.participants.map((participant) => {
            return {
              ...participant,
              existsInDb: true,
            };
          }) as ParticipantWorking[]
        );
      }
    }
  }, [data, meeting.id]);

  useEffect(() => {
    if (!updateMeetingResult.data?.updateMeeting) return;
    const updatedMeeting = updateMeetingResult.data.updateMeeting as MeetingWorking;
    handleCreatedOrUpdatedMeeting(updatedMeeting, 'updated');
    // eslint-disable-next-line
  }, [updateMeetingResult.data?.updateMeeting]);

  const isMeetingInformationValid = () => {
    return meeting.organization !== '' && meeting.title !== '' && meeting.description !== '';
  };

  const handleNextFromMeeting = () => {
    const isValid = isMeetingInformationValid();
    if (!isValid) {
      toast({
        title: 'Kan ikke opprette møte',
        description: 'Du må fylle ut alle felter markert med *',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (meeting.id && meetingHasBeenEdited) {
      updateMeeting({ variables: { meeting: { ...meeting, id: meeting.id } } });
    } else {
      setActiveTab(1)
    }
  };

  const onVotationsCreated = () => {
    setActiveTab(2);
  };

  const handlePrevFromVotation = () => {
    try {
      setActiveTab(activeTab - 1);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handlePrevFromParticipants = (participants: ParticipantWorking[]) => {
    try {
      setActiveTab(activeTab - 1);
      setParticipants(participants);
    } catch (error) {
      console.log('error', error);
    }
  };

  if (error) {
    return (
      <Center mt="10vh">
        <Text>Det skjedde noe galt under innlastingen</Text>
      </Center>
    );
  }

  if (loading) {
    return <Loading asOverlay={false} text={'Henter møteinformasjon'} />;
  }

  const outerContainer = {
    paddingTop: '5rem',
    width: '100%',
    bg: '#f9f9f9',
    color: '#718096',
  } as React.CSSProperties;

  const centerContainer = {
    minWidth: '320px',
    width: '100%',
    maxWidth: '800px',
  } as React.CSSProperties;

  return (
    <AuthWrapper>
      <Center sx={outerContainer}>
        {updateMeetingResult.loading && <Loading asOverlay={true} text="Oppdaterer møte" />}
        <VStack spacing="10" align="left" sx={centerContainer}>
          <AddMeetingInformation
            isActive={activeTab === 0}
            meeting={meeting}
            updateMeeting={(meeting: MeetingWorking) => {setMeeting(meeting); setMeetingHasBeenEdited(true);}}
            handleNext={handleNextFromMeeting}
          />
          <AddVotations
            isActive={activeTab === 1}
            onVotationsCreated={onVotationsCreated}
            meetingId={meeting?.id ?? ''}
            handlePrevious={handlePrevFromVotation}
          />
          <AddParticipants
            isActive={activeTab === 2}
            previouslyAddedParticipants={participants}
            meetingId={meeting?.id ?? undefined}
            handlePrevious={handlePrevFromParticipants}
            ownerEmail={data?.meetingById?.owner?.email}
          />
        </VStack>
      </Center>
    </AuthWrapper>
  );
};

export default AddMeeting;
