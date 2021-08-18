import React, { useState, useEffect } from 'react';
import { Center, VStack, useToast } from '@chakra-ui/react';
import AddVotations from '../molecules/AddVotations';
import { Role, useCreateMeetingMutation, useUpdateMeetingMutation } from '../../__generated__/graphql-types';
import AddMeetingInformation from '../molecules/AddMeetingInformation';
import AuthWrapper from '../../services/auth/AuthWrapper';
import AddParticipants from '../molecules/AddParticipants';
import { useHistory } from 'react-router';
import { MeetingWorking, ParticipantWorking } from '../../types/types';
import Loading from '../atoms/Loading';
import { useAuth0 } from '@auth0/auth0-react';

const AddMeeting: React.FC = () => {
  const { user } = useAuth0();

  const toast = useToast();

  const [meeting, setMeeting] = useState<MeetingWorking>({
    title: '',
    organization: '',
    startTime: new Date(),
    description: '',
  });

  const [participants, setParticipants] = useState<ParticipantWorking[]>([]);

  const [createMeeting, createMeetingResult] = useCreateMeetingMutation();

  const [updateMeeting, updateMeetingResult] = useUpdateMeetingMutation();

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleCreatedOrUpdatedMeeting = (meeting: MeetingWorking, action: 'updated' | 'created') => {
    setParticipants([
      ...participants,
      { email: user?.email ?? '', role: Role.Admin, isVotingEligible: true, existsInDb: true },
    ]);
    setMeeting({
      id: meeting.id,
      title: meeting.title,
      description: meeting.description ?? '',
      organization: meeting.organization,
      startTime: new Date(meeting.startTime),
    });
    const responseKeyWord = action === 'created' ? 'opprettet' : 'oppdatert';
    toast({
      title: `Møte ${responseKeyWord}`,
      description: `Møtet ble ${responseKeyWord}.`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    setActiveTab(1);
  };

  useEffect(() => {
    if (!updateMeetingResult.data?.updateMeeting) return;
    const updatedMeeting = updateMeetingResult.data.updateMeeting as MeetingWorking;
    handleCreatedOrUpdatedMeeting(updatedMeeting, 'updated');
    // eslint-disable-next-line
  }, [updateMeetingResult.data?.updateMeeting]);

  useEffect(() => {
    if (!createMeetingResult.data?.createMeeting) return;
    const createdMeeting = createMeetingResult.data.createMeeting as MeetingWorking;
    handleCreatedOrUpdatedMeeting(createdMeeting, 'created');
    // eslint-disable-next-line
  }, [createMeetingResult.data?.createMeeting]);

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
    if (!meeting.id) {
      createMeeting({ variables: { meeting } });
    } else {
      updateMeeting({ variables: { meeting: { ...meeting, id: meeting.id } } });
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

  if (createMeetingResult.error) {
    toast({
      title: 'Kunne ikke oppette møte',
      description: 'Det var et problem med å opprette møtet',
    });
  }

  return (
    <AuthWrapper>
      <Center sx={outerContainer}>
        {(createMeetingResult.loading || updateMeetingResult.loading) && (
          <Loading asOverlay={true} text="Oppretter møte" />
        )}
        <VStack spacing="10" align="left" sx={centerContainer}>
          <AddMeetingInformation
            isActive={activeTab === 0}
            meeting={meeting}
            updateMeeting={(meeting: MeetingWorking) => setMeeting(meeting)}
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
            ownerEmail={user?.email}
          />
        </VStack>
      </Center>
    </AuthWrapper>
  );
};

export default AddMeeting;
