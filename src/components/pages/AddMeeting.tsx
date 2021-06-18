import React, {useState, useEffect} from 'react'
import { Center, VStack, useToast } from '@chakra-ui/react'
import AddVotations from '../molecules/AddVotations';
import { MajorityType, Meeting, CreateMeetingInput, ParticipantInput, Status, useCreateMeetingMutation, useUpdateMeetingMutation  } from '../../__generated__/graphql-types';
import AddMeetingInformation from '../molecules/AddMeetingInformation';
import AuthWrapper from '../../services/auth/AuthWrapper'
import {v4 as uuid} from 'uuid'
import { useAuth0 } from '@auth0/auth0-react';
import AddParticipants from '../molecules/AddParticipants';
import { useHistory } from 'react-router'
import { MeetingWorking } from '../../types/types'
import Loading from '../atoms/Loading'


interface Alternative {
  id: number;
  text: string;
}

interface Votation {
  id: string;
  title: string;
  description: string;
  alternatives: Alternative[];
  blankVotes: boolean;
  hiddenVotes: boolean;
  severalVotes: boolean;
  majorityType: MajorityType;
  majorityThreshold: number;
}

const initialVotationValues = [{
    id: uuid(),
    title: '',
    description: '',
    alternatives: [{
      id: 1,
      text: ''
    }],
    blankVotes: false,
    hiddenVotes: false,
    severalVotes: false,
    majorityType: 'SIMPLE' as MajorityType,
    majorityThreshold: 50
  }];

const AddMeeting: React.FC = () => {

  const { user } = useAuth0();

  const toast = useToast();

  const history = useHistory();

  console.log(user)

  const [meeting, setMeeting] = useState<MeetingWorking>({
    title: '',
    organization: '',
    startTime: new Date(),
    description: ''
  });

  const [votations, setVotations] = useState<Votation[]>(initialVotationValues);

  const [participants, setParticipants] = useState<ParticipantInput[]>([]);

  const [createMeeting, createMeetingResult] = useCreateMeetingMutation();

  const [updateMeeting, updateMeetingResult] = useUpdateMeetingMutation();

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleCreatedOrUpdatedMeeting = (meeting: any, action: "updated" | "created") => {
    setMeeting({
      id: meeting.id,
      title: meeting.title,
      description: meeting.description ?? '',
      organization: meeting.organization,
      startTime: new Date(meeting.startTime)
    })
    setActiveTab(1);
    const responseKeyWord = action === 'created' ? 'opprettet' : 'oppdatert';
    toast({
      title: `Møte ${responseKeyWord}`,
      description: `Møtet ble ${responseKeyWord}.`,
      status: 'success',
      duration: 9000,
      isClosable: true
    })
  }

  useEffect(() => {
    if (!updateMeetingResult.data?.updateMeeting) return;
    handleCreatedOrUpdatedMeeting(updateMeetingResult.data.updateMeeting, "updated");
  }, [updateMeetingResult.data?.updateMeeting])

  useEffect(() => {
    if (!createMeetingResult.data?.createMeeting) return;
    handleCreatedOrUpdatedMeeting(createMeetingResult.data.createMeeting, "created");
  }, [createMeetingResult.data?.createMeeting])

  const isMeetingInformationValid = () => {
    return meeting.organization !== '' && 
           meeting.title !== '' && 
           meeting.description !== '';
  }

  const handleNextFromMeeting = () => {
    const isValid = isMeetingInformationValid();
    if (!isValid) {
      toast({
        title: 'Kan ikke opprette møte',
        description: 'Du må fylle ut alle felter markert med *',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
      return;
    }
    if (!meeting.id) {
      createMeeting({variables: {meeting}})
    } else {
      updateMeeting({variables: {meeting: {...meeting, id: meeting.id!}}})
    }
  }

  const onVotationsCreated = (votations: Votation[]) => {
    setVotations(votations);    
    setActiveTab(2)
  }

  const onParticipantsAdded = () => {
    const toastId = 'participants-toast';
    if (toast.isActive(toastId)){
      toast({
        id: toastId,
        title: "Deltakere lagt til.",
        description: "Deltakerne har blitt lagt til møtet",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    }
    history.push('/')
  }

  const handlePrevFromVotation = (votations: Votation[]) => {
    try {
      console.log(votations);
      setActiveTab(activeTab - 1)
      setVotations(votations)
    } catch (error) {
      console.log("error", error);
    }
  }

  const handlePrevFromParticipants = (participants: ParticipantInput[]) => {
    try {
      console.log(participants)
      setActiveTab(activeTab - 1)
      setParticipants(participants)
    } catch (error) {
      console.log("error", error);
    }
  }
  
  const meetingTabs = [
    <AddMeetingInformation 
      meeting={meeting}
      updateMeeting={(meeting: MeetingWorking) => setMeeting(meeting)}
      handleNext={handleNextFromMeeting} />, 
    <AddVotations 
      votations={votations}
      onVotationsCreated={onVotationsCreated} 
      meetingId={meeting?.id ?? ''}
      handlePrevious={handlePrevFromVotation} />,
    <AddParticipants 
      previouslyAddedParticipants={participants}
      meetingId={meeting?.id ?? undefined}
      onParticipantsAdded={onParticipantsAdded} 
      handlePrevious={handlePrevFromParticipants} />
  ]

  const outerContainer = {
    paddingTop: '5rem',
    width:'100%',
    bg:'#f9f9f9',
    color:"#718096"
  } as React.CSSProperties

  const centerContainer = {
    minWidth: '320px',
    width: '100%',
    maxWidth: '800px',
  } as React.CSSProperties;

  if (createMeetingResult.error) {
    toast({
      title: "Kunne ikke oppette møte",
      description: "Det var et problem med å opprette møtet"
    })
  }

  return (
    <AuthWrapper>
      <Center sx={outerContainer}>
        {(createMeetingResult.loading || updateMeetingResult.loading) && 
          <Loading asOverlay={true} text='Oppretter møte' />
        }
        <VStack spacing='10' align='left' sx={centerContainer}>
          {/* { activeTab === 0 && 
            <AddMeetingInformation 
              meeting={meeting}
              updateMeeting={(meeting: MeetingWorking) => setMeeting(meeting)}
              handleNext={handleNextFromMeeting} />
          }
          { activeTab === 1 && 
           <AddVotations 
            votations={votations}
            onVotationsCreated={onVotationsCreated} 
            meetingId={meeting?.id ?? ''}
            handlePrevious={handlePrevFromVotation} /> 
          }
          { activeTab === 2 &&
            <AddParticipants 
              previouslyAddedParticipants={participants}
              meetingId={meeting?.id ?? undefined}
              onParticipantsAdded={onParticipantsAdded} 
              handlePrevious={handlePrevFromParticipants} />
          } */}
          { meetingTabs[activeTab] }
        </ VStack>
      </Center>
    </AuthWrapper>
  )
};

export default AddMeeting;
