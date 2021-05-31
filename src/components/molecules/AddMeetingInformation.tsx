import React, { useState } from 'react';
import { Heading, VStack, Text, Center, Alert, AlertIcon, Spinner } from '@chakra-ui/react';
import MeetingInformationForm from './MeetingInformationForm'
import { CreateMeetingInput, useCreateMeetingMutation } from '../../__generated__/graphql-types'
import AddMeetingController from './AddMeetingController';
import Loading from '../atoms/Loading';

interface IProps {
  onMeetingCreated: (meeting: string) => void;
}

const AddMeetingInformation: React.FC<IProps> = ({ onMeetingCreated }) => {
 
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [createMeeting, result] = useCreateMeetingMutation();

  const [meeting, setMeeting] = useState<CreateMeetingInput>({
    organization: '',
    title: '',
    startTime: new Date(),
    description: '',
  });

   const h1Style = {
    fontSize: '1.5em',
  }

  const overlaySpinnerStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '0',
    top: '0',
    backgroundColor: '#fcfcfc',
    opacity: 0.2,
    zIndex: 10
  } as React.CSSProperties

   const onChange = (meeting: CreateMeetingInput) => {
    setMeeting(meeting)
  }

  const isMeetingInformationValid = () => {
    return meeting.organization !== '' && 
           meeting.title !== '' && 
           meeting.description !== '';
  }

  const handleNext = () => {
    const isValid = isMeetingInformationValid();
    if (!isValid) {
      setShowAlert(true);
    } else {
      createMeeting({variables: {meeting}})
    }
  }

  if (result.data?.createMeeting){
    onMeetingCreated(result.data.createMeeting?.id);
  }

  console.log(result)

  return (
    <>
      {result.loading && 
        <Loading asOverlay={true} text='Oppretter møte' />
      }
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