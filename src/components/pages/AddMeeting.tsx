import React, {useState} from 'react'
import { Center, VStack, useToast } from '@chakra-ui/react'
import AddVotations from '../molecules/AddVotations';
import { MajorityType, Meeting, CreateMeetingInput, ParticipantInput, Status } from '../../__generated__/graphql-types';
import AddMeetingInformation from '../molecules/AddMeetingInformation';
import AuthWrapper from '../../services/auth/AuthWrapper'
import {v4 as uuid} from 'uuid'
import { useAuth0 } from '@auth0/auth0-react';
import AddParticipants from '../molecules/AddParticipants';
import { useHistory } from 'react-router'

interface MeetingWorking {
  id?: string;
  title: string;
  organization: string;
  startTime: Date;
  description?: string;
  status: Status;
}

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

  const [meeting, setMeeting] = useState<Meeting>();

  const [votations, setVotations] = useState<Votation[]>(initialVotationValues);

  const [participants, setParticipants] = useState<ParticipantInput[]>([]);

  const [activeTab, setActiveTab] = useState<number>(0);

  const onMeetingUpdated = (meeting: Meeting) => {
    console.log("setActiveTab")
    setActiveTab(1)
    console.log("setMeeting")
    setMeeting(meeting)
    console.log("toasting")
    const toastId = 'meeting-toast';
    console.log("isActive", toast.isActive(toastId));
    if (!toast.isActive(toastId)){
      toast({
        id: toastId,
        title: "Møte opprettet.",
        description: "Møte har blitt opprettet",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const onVotationsCreated = () => {
    setActiveTab(2)
    const toastId = 'votation-toast';
    if (!toast.isActive(toastId)){
      toast({
        id: toastId,
        title: "Voteringer opprettet.",
        description: "Voteringene har blitt opprettet",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    }
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
      onMeetingUpdated={onMeetingUpdated} 
      meetingId={meeting?.id ?? undefined}
      meetingFromProps={meeting ? {
        organization: meeting.organization,
        title: meeting.title,
        startTime: new Date(meeting.startTime),
        description: meeting.description 
      } as CreateMeetingInput : undefined} />, 
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

  return (
    <AuthWrapper>
      <Center sx={outerContainer}>
        <VStack spacing='10' align='left' sx={centerContainer}>
          { activeTab === 0 && 
            <AddMeetingInformation 
              onMeetingUpdated={onMeetingUpdated} 
              meetingId={meeting?.id ?? undefined}
              meetingFromProps={meeting ? {
                organization: meeting.organization,
                title: meeting.title,
                startTime: new Date(meeting.startTime),
                description: meeting.description 
              } as CreateMeetingInput : undefined} />
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
          }
          {/*meetingTabs[activeTab]*/}
        </ VStack>
      </Center>
    </AuthWrapper>
  )
};

export default AddMeeting;
