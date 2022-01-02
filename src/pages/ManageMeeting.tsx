import React, { useState, useEffect } from 'react';
import { Center, VStack, useToast, Text } from '@chakra-ui/react';
import ManageVotations from '../components/manageMeeting/ManageVotations';
import {
  useCreateMeetingMutation,
  useGetMeetingByIdLazyQuery,
  useUpdateMeetingMutation,
} from '../__generated__/graphql-types';
import ManageMeetingInformation from '../components/manageMeeting/ManageMeetingInformation';
import ManageParticipants from '../components/manageParticipants/organisms/ManageParticipants';
import { MeetingWorking } from '../types/types';
import Loading from '../components/common/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import { outerContainer, centerContainer } from '../components/styles/containerStyles';
import PageContainer from '../components/common/PageContainer';

const ManageMeeting: React.FC = () => {
  const { user } = useAuth0();
  const { meetingId } = useParams<{ meetingId: string }>();
  const [getMeeting, { data, loading, error }] = useGetMeetingByIdLazyQuery({
    variables: {
      meetingId,
    },
  });

  const toast = useToast();

  const [meeting, setMeeting] = useState<MeetingWorking>({
    title: '',
    organization: '',
    startTime: new Date(),
    description: '',
    allowSelfRegistration: false,
  });

  const [createMeeting, createMeetingResult] = useCreateMeetingMutation();

  const [meetingHasBeenEdited, setMeetingHasBeenEdited] = useState<boolean>(false);

  const [updateMeeting, updateMeetingResult] = useUpdateMeetingMutation();

  const [activeTab, setActiveTab] = useState<number>(0);

  const [votationsMayExist, setVotationsMayExist] = useState<boolean>(!!meetingId);

  const handleCreatedOrUpdatedMeeting = (meeting: MeetingWorking, action: 'updated' | 'created') => {
    setMeeting({
      id: meeting.id,
      title: meeting.title,
      description: meeting.description ?? '',
      organization: meeting.organization,
      startTime: new Date(meeting.startTime),
      allowSelfRegistration: meeting.allowSelfRegistration,
    });
    setMeetingHasBeenEdited(false);
    const responseKeyWord = action === 'created' ? 'opprettet' : 'oppdatert';
    toast({
      title: `Møte ${responseKeyWord}`,
      description: `Møtet ble ${responseKeyWord}.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setActiveTab(1);
  };

  useEffect(() => {
    if (meetingId && !data) {
      getMeeting();
    }
  }, [meetingId, getMeeting, data]);

  useEffect(() => {
    if (data?.meetingById && !meeting.id) {
      const meeting = data.meetingById;
      setMeeting({
        id: meeting.id,
        title: meeting.title,
        description: meeting.description ?? '',
        organization: meeting.organization,
        startTime: new Date(meeting.startTime),
        allowSelfRegistration: meeting.allowSelfRegistration,
      });
    }
  }, [data, meeting.id]);

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
    return meeting.organization !== '' && meeting.title !== '';
  };

  const handleNextFromMeeting = (nextIndex: number) => {
    const isValid = isMeetingInformationValid();
    if (!isValid) {
      toast({
        title: 'Kan ikke opprette møte',
        description: 'Du må fylle ut alle felter markert med *',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (meetingHasBeenEdited && !meeting.id) {
      createMeeting({ variables: { meeting } });
    } else if (meetingHasBeenEdited && meeting.id) {
      updateMeeting({ variables: { meeting: { ...meeting, id: meeting.id } } });
    } else {
      setActiveTab(nextIndex);
    }
  };

  const onVotationsCreated = () => {
    setActiveTab(2);
  };

  const handlePrevFromVotation = () => {
    try {
      setActiveTab(activeTab - 1);
      setVotationsMayExist(true);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handlePrevFromParticipants = (nextIndex: number) => {
    try {
      setActiveTab(nextIndex);
    } catch (error) {
      console.log('error', error);
    }
  };

  if (createMeetingResult.error) {
    toast({
      title: 'Kunne ikke opprette møte',
      description: 'Det var et problem med å opprette møtet',
    });
  }

  if (loading) {
    return <Loading text={'Henter møteinformasjon'} />;
  }

  if (error) {
    return (
      <Center mt="10vh">
        <Text>Det skjedde noe galt under innlastingen</Text>
      </Center>
    );
  }

  return (
    <PageContainer>
      <Center sx={outerContainer}>
        {(createMeetingResult.loading || updateMeetingResult.loading) && <Loading asOverlay text="Oppretter møte" />}
        <VStack spacing="10" align="left" maxWidth="800px" sx={centerContainer}>
          <ManageMeetingInformation
            isActive={activeTab === 0}
            meeting={meeting}
            updateMeeting={(meeting: MeetingWorking) => {
              setMeetingHasBeenEdited(true);
              setMeeting(meeting);
            }}
            handleNavigation={handleNextFromMeeting}
          />
          <ManageVotations
            isActive={activeTab === 1}
            votationsMayExist={votationsMayExist}
            onVotationsCreated={onVotationsCreated}
            meetingId={meeting?.id ?? ''}
            handlePrevious={handlePrevFromVotation}
          />
          <ManageParticipants
            isActive={activeTab === 2}
            meetingId={meeting?.id ?? ''}
            handleNavigation={handlePrevFromParticipants}
            ownerEmail={user?.email}
          />
        </VStack>
      </Center>
    </PageContainer>
  );
};

export default ManageMeeting;
