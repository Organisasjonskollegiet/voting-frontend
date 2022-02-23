import React, { useState, useEffect, useCallback } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { outerContainer, centerContainer } from '../components/styles/containerStyles';
import PageContainer from '../components/common/PageContainer';
import ManageMeetingController from '../components/manageMeeting/ManageMeetingController';

const ManageMeeting: React.FC = () => {
  const { user } = useAuth0();
  const { meetingId } = useParams<{ meetingId: string }>();
  const [getMeeting, { data, loading, error }] = useGetMeetingByIdLazyQuery({
    variables: {
      meetingId: meetingId ?? '',
    },
  });

  const toast = useToast();
  const navigate = useNavigate();

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

  const handleCreatedOrUpdatedMeeting = useCallback(
    (meeting: MeetingWorking, action: 'updated' | 'created') => {
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
    },
    [toast]
  );

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
  }, [updateMeetingResult.data?.updateMeeting, handleCreatedOrUpdatedMeeting]);

  useEffect(() => {
    if (!createMeetingResult.data?.createMeeting) return;
    const createdMeeting = createMeetingResult.data.createMeeting as MeetingWorking;
    handleCreatedOrUpdatedMeeting(createdMeeting, 'created');
  }, [createMeetingResult.data?.createMeeting, handleCreatedOrUpdatedMeeting]);

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

  const handleNavigation = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex > 2) {
      return navigate('/', { replace: true });
    }
    if (activeTab === 0 && nextIndex === 1) {
      return handleNextFromMeeting(nextIndex);
    }
    if (activeTab === 1 && nextIndex === 0) {
      setVotationsMayExist(true);
    }
    setActiveTab(nextIndex);
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
          {activeTab === 0 && (
            <ManageMeetingInformation
              meeting={meeting}
              updateMeeting={(meeting: MeetingWorking) => {
                setMeetingHasBeenEdited(true);
                setMeeting(meeting);
              }}
            />
          )}
          {activeTab === 1 && <ManageVotations votationsMayExist={votationsMayExist} meetingId={meeting?.id ?? ''} />}
          {activeTab === 2 && <ManageParticipants meetingId={meeting?.id ?? ''} ownerEmail={user?.email} />}
          <ManageMeetingController {...{ activeTab, handleNavigation }} />
        </VStack>
      </Center>
    </PageContainer>
  );
};

export default ManageMeeting;
