import React, { useState } from 'react';
import { Heading, VStack, Text, Alert, AlertIcon, useToast } from '@chakra-ui/react';
import MeetingInformationForm from './MeetingInformationForm'
import { CreateMeetingInput } from '../../__generated__/graphql-types'
import AddMeetingController from './AddMeetingController';
import Loading from '../atoms/Loading';
import {h1Style} from '../particles/formStyles'
import { MeetingWorking } from '../../types/types'

interface IProps {
  meeting: MeetingWorking;
  updateMeeting: (meeting: MeetingWorking) => void;
  handleNext: () => void;
}

const emptyMeeting = {
    organization: '',
    title: '',
    startTime: new Date(),
    description: '',
  } as CreateMeetingInput; 

const AddMeetingInformation: React.FC<IProps> = ({ updateMeeting, meeting, handleNext }) => {
 
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const toast = useToast();


   const onChange = (meeting: MeetingWorking) => {
    updateMeeting(meeting)
  }

  const isMeetingInformationValid = () => {
    return meeting.organization !== '' && 
           meeting.title !== '' && 
           meeting.description !== '';
  }

  // const handleNext = () => {
  //   const isValid = isMeetingInformationValid();
  //   if (!isValid) {
  //     setShowAlert(true);
  //   } else if (!meeting.id) {
  //     createMeeting({variables: {meeting}})
  //   } else {
  //     updateMeeting({variables: {meeting: {...meeting, id: meetingId}}})
  //   }
  // }

  // if (createMeetingResult.data?.createMeeting){
  //   console.log("created")
  //   onMeetingUpdated(createMeetingResult.data.createMeeting as Meeting);
  // } else if (updateMeetingResult.data?.updateMeeting) {
  //   onMeetingUpdated(updateMeetingResult.data.updateMeeting as Meeting)
  // }

  return (
    <>
      {/* {(createMeetingResult.loading || updateMeetingResult.loading) && 
        <Loading asOverlay={true} text='Oppretter møte' />
      } */}
      {showAlert && <Alert status='error'>
            <AlertIcon /> 
            Alle felt felt må fylles ut før du kan gå videre.
          </Alert>}
      <VStack spacing='5' align='left'>
        <Heading sx={h1Style} as='h1'>Legg til møteinformasjon</Heading>
        <Text fontSize='20px'>Her kan du legge til informasjon om møtet </Text>
      </VStack>
      <MeetingInformationForm meeting={meeting} onChange={onChange} />
      <AddMeetingController handleNext={handleNext} showPrev={false} activeTab={0} /> 
    </>
  )
   
};

export default AddMeetingInformation;