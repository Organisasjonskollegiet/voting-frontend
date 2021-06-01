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

interface IProps {
  meeting: CreateMeetingInput;
  onChange: (meeting: CreateMeetingInput) => void;
}

const MeetingInformationForm: React.FC<IProps> = ({meeting, onChange}) => {
 
  const meetingInformationFormStyle = useStyleConfig('MeetingInformationForm');
  
  const labelStyle = {
    fontStyle: 'normal',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '150%',
    marginBottom: '10px',
  } as React.CSSProperties;

  return (
    <VStack spacing='7' color='#718096' sx={meetingInformationFormStyle}>
        <FormControl isRequired>
          <FormLabel sx={labelStyle}>
            Organisasjonsnavn
          </FormLabel>
          <Input 
            sx={inputStyle}
            isRequired
            value={meeting.organization}
            placeholder="Hva heter organisasjonen møtet arrangeres av?" 
            onChange={(e: any) => onChange({...meeting, organization: e.target.value})} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel sx={labelStyle}>
            Tittel på møte
          </FormLabel>
          <Input 
            sx={inputStyle}
            isRequired 
            value={meeting.title}
            placeholder="Hva skal tittelen på møtet være?" 
            onChange={(e: any) => onChange({...meeting, title: e.target.value})} />
        </FormControl>
        <FormControl isRequired fontWeight='normal'>
          <FormLabel sx={labelStyle}>
            Møtetidspunkt
          </FormLabel>
          <DatePicker
            id="published-date"
            selectedDate={meeting.startTime}
            onChange={(date: any) => onChange({...meeting, startTime: date})}
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
            value={meeting.description}
            placeholder='Skriv gjerne en god beskrivelse av hva møte skal handle om.' 
            resize='none'
            onChange={(e: any) => onChange({...meeting, description: e.target.value})}
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
    // bg: '#f9f9f9',
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