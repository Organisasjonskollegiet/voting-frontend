import React, {useState} from 'react'
import { Center, VStack } from '@chakra-ui/react'
import AddVotations from '../molecules/AddVotations';
import { MajorityType } from '../../__generated__/graphql-types';
import AddMeetingInformation from '../molecules/AddMeetingInformation';
import AuthWrapper from '../../services/auth/AuthWrapper'
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

const AddMeeting: React.FC = () => {

  const {user} = useAuth0();

  console.log(user)

  const [meetingId, setMeetingId] = useState<string>('');

  const [votations, setVotations] = useState<Votation[]>([]);

  const [participants, setParticipants] = useState<string[]>([]);

  const [activeTab, setActiveTab] = useState<number>(0)

  const onMeetingCreated = (meetingId: string) => {
    setMeetingId(meetingId)
    setActiveTab(1)
  }
  
  const meetingTabs = [<AddMeetingInformation onMeetingCreated={onMeetingCreated} />, <AddVotations />]

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

  console.log(meetingId)

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
