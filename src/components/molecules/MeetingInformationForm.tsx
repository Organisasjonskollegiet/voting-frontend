import React, { useState } from 'react';
import { 
  useStyleConfig, 
  FormControl, 
  FormLabel, 
  Input, 
  Textarea, 
  ComponentStyleConfig,
  VStack
} from '@chakra-ui/react';
import DatePicker from '../atoms/DatePicker/DatePicker'
import { CreateMeetingInput } from '../../__generated__/graphql-types';

// interface MeetingInformationFormProps {

// }

const inputBackgroundColor = "#fff"

const MeetingInformationForm: React.FC = () => {
 
  const meetingInformationFormStyle = useStyleConfig('MeetingInformationForm');

  const [meeting, setMeeting] = useState<CreateMeetingInput>({
    organization: '',
    title: '',
    startTime: new Date(),
    description: '',
  });
  
  const labelStyle = {
    fontStyle: 'normal',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '150%',
    marginBottom: '10px',
  } as React.CSSProperties;

  return (
    <VStack spacing='6' color='#718096' sx={meetingInformationFormStyle}>
        <FormControl isRequired>
          <FormLabel sx={labelStyle}>
            Organisasjonsnavn
          </FormLabel>
          <Input 
            sx={inputStyle}
            isRequired
            placeholder="Hva heter organisasjonen møtet arrangeres av?" 
            onChange={(e: any) => setMeeting({...meeting, organization: e.target.value})} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel sx={labelStyle}>
            Tittel på møte
          </FormLabel>
          <Input 
            sx={inputStyle}
            isRequired 
            placeholder="Hva skal tittelen på møtet være?" 
            onChange={(e: any) => setMeeting({...meeting, title: e.target.value})} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel sx={labelStyle}>
            Møtetidspunkt
          </FormLabel>
          <DatePicker
            id="published-date"
            selectedDate={meeting.startTime}
            onChange={(date: any) => setMeeting({...meeting, startTime: date})}
            showPopperArrow={true}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel sx={labelStyle}>
            Beskrivelse av møte
          </FormLabel>
          <Textarea 
            sx={inputStyle}
            isRequired
            placeholder='Skriv gjerne en god beskrivelse av hva møte skal handle om.' 
            resize='none'
            onChange={(e: any) => setMeeting({...meeting, description: e.target.value})}
          />
        </FormControl>
    </VStack>
  )
   
};

export const inputStyle = {
  background: '#fff',
  boxShadow: ' 0px 0px 10px rgba(0, 0, 0, 0.1);',
} as React.CSSProperties;


export const MeetingInformationFormConfig: ComponentStyleConfig = {
  baseStyle: {
    minWidth: '320px',
    width: '100%',
    maxWidth: '800px',
    padding: '12px;',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: '700',
    justifyContent: 'left',
    bg: '#f9f9f9',
  },
  variants: {
      selected: {
          color: 'white',
          bg: '#718096',
          _hover: { bg: '#8d99ab' },
        },
      },
    };
    
    export default MeetingInformationForm;