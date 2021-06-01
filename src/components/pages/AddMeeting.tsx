import React, {useState} from 'react'
import { Center, VStack } from '@chakra-ui/react'
import AddVotations from '../molecules/AddVotations';
import { MajorityType, Meeting, CreateMeetingInput } from '../../__generated__/graphql-types';
import AddMeetingInformation from '../molecules/AddMeetingInformation';
import AuthWrapper from '../../services/auth/AuthWrapper'
import {v4 as uuid} from 'uuid'
import { useAuth0 } from '@auth0/auth0-react';

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

  const {user} = useAuth0()

  console.log(user)

  const [meeting, setMeeting] = useState<Meeting>();

  const [votations, setVotations] = useState<Votation[]>(initialVotationValues);

  const [participants, setParticipants] = useState<string[]>([]);

  const [activeTab, setActiveTab] = useState<number>(0)

  const onMeetingUpdated = (meeting: Meeting) => {
    setMeeting(meeting)
    setActiveTab(1)
  }

  const onVotationsCreated = () => {
    setActiveTab(0)
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
      handlePrevious={handlePrevFromVotation} />
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
          {meetingTabs[activeTab]}
        </ VStack>
      </Center>
    </AuthWrapper>
  )
};

export default AddMeeting;
