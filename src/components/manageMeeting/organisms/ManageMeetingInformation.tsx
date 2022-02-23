import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Heading, VStack, Text, Center, useToast } from '@chakra-ui/react';
import MeetingInformationForm from '../atoms/MeetingInformationForm';
import { MeetingWorking } from '../../../types/types';
import {
  useCreateMeetingMutation,
  useGetMeetingByIdLazyQuery,
  useUpdateMeetingMutation,
} from '../../../__generated__/graphql-types';
import Loading from '../../common/Loading';
import { NavigationContext } from '../atoms/NavigationContextProvider';
import ManageMeetingController from '../molecules/ManageMeetingController';

interface IProps {
  meetingId: string;
  setMeetingId: (value: string) => void;
}

const ManageMeetingInformation: React.FC<IProps> = ({ meetingId, setMeetingId }) => {
  const { navigateToTab } = useContext(NavigationContext);
  const toast = useToast();

  const [meeting, setMeeting] = useState<MeetingWorking>({
    title: '',
    organization: '',
    startTime: new Date(),
    description: '',
    allowSelfRegistration: false,
  });
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const handleUpdateMeeting = (meeting: MeetingWorking) => {
    setMeeting(meeting);
    setIsEdited(true);
  };

  const [getMeeting, { data, loading, error }] = useGetMeetingByIdLazyQuery({
    variables: {
      meetingId,
    },
  });
  const [createMeeting, createMeetingResult] = useCreateMeetingMutation();
  const [updateMeeting, updateMeetingResult] = useUpdateMeetingMutation();

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
      if (meeting.id) setMeetingId(meeting.id);
      setIsEdited(false);
      const responseKeyWord = action === 'created' ? 'opprettet' : 'oppdatert';
      toast({
        title: `Møte ${responseKeyWord}`,
        description: `Møtet ble ${responseKeyWord}.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigateToTab(1);
    },
    [navigateToTab, setMeetingId, toast]
  );

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

  const handleNavigation = (nextIndex: number) => {
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
    if (isEdited && !meeting.id) {
      createMeeting({ variables: { meeting } });
    } else if (isEdited && meeting.id) {
      console.log(meeting);
      updateMeeting({ variables: { meeting: { ...meeting, id: meeting.id } } });
    } else {
      navigateToTab(nextIndex);
    }
  };

  if (loading) {
    return <Loading text={'Henter møteinformasjon'} />;
  }

  if (createMeetingResult.error) {
    toast({
      title: 'Kunne ikke opprette møte',
      description: 'Det var et problem med å opprette møtet',
    });
  }

  if (error) {
    return (
      <Center mt="10vh">
        <Text>Det skjedde noe galt under innlastingen</Text>
      </Center>
    );
  }

  return (
    <>
      {(createMeetingResult.loading || updateMeetingResult.loading) && (
        <Loading asOverlay text={createMeetingResult.loading ? 'Oppretter møtet' : 'Oppdaterer møtet'} />
      )}
      <VStack spacing="5" align="left">
        <Heading size="lg">Legg til møteinformasjon</Heading>
        <Text fontSize="lg">Her kan du legge til informasjon om møtet </Text>
      </VStack>
      <MeetingInformationForm meeting={meeting} onChange={handleUpdateMeeting} />
      <ManageMeetingController preventNavigation={() => true} alternativeAction={handleNavigation} />
    </>
  );
};

export default ManageMeetingInformation;
