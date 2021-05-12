import React, { useState } from 'react';
import { useStyleConfig, Grid, Box, FormControl, FormLabel, Input, Textarea} from '@chakra-ui/react';
import MeetingInformationForm from './MeetingInformationForm'

const AddMeetingInformation: React.FC = () => {
 
  const [date, setDate] = useState<Date>(new Date())
  // const alternativeStyle = useStyleConfig('Alternative');

  return (
    <MeetingInformationForm />
  )
   
};

export default AddMeetingInformation;