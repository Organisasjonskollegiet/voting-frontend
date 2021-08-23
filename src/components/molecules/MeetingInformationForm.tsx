import React from 'react';
import {
  useStyleConfig,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  ComponentStyleConfig,
  VStack,
} from '@chakra-ui/react';
import DatePicker from '../atoms/DatePicker/DatePicker';
import { labelStyle, inputStyle } from '../particles/formStyles';
import { MeetingWorking } from '../../types/types';

interface IProps {
  meeting: MeetingWorking;
  onChange: (meeting: MeetingWorking) => void;
}

const MeetingInformationForm: React.FC<IProps> = ({ meeting, onChange }) => {
  const meetingInformationFormStyle = useStyleConfig('MeetingInformationForm');

  const onOrganizationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    onChange({ ...meeting, organization: (e.target as HTMLInputElement).value });
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    onChange({ ...meeting, title: (e.target as HTMLInputElement).value });
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.target) return;
    onChange({ ...meeting, description: (e.target as HTMLTextAreaElement).value });
  };

  return (
    <VStack spacing="7" color="#718096" sx={meetingInformationFormStyle}>
      <FormControl isRequired>
        <FormLabel sx={labelStyle}>Organisasjonsnavn</FormLabel>
        <Input
          sx={inputStyle}
          isRequired
          value={meeting.organization}
          placeholder="Hva heter organisasjonen møtet arrangeres av?"
          onChange={onOrganizationChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel sx={labelStyle}>Tittel på møte</FormLabel>
        <Input
          sx={inputStyle}
          isRequired
          value={meeting.title}
          placeholder="Hva skal tittelen på møtet være?"
          onChange={onTitleChange}
        />
      </FormControl>
      <FormControl isRequired fontWeight="normal">
        <FormLabel sx={labelStyle}>Møtetidspunkt</FormLabel>
        <DatePicker
          id="published-date"
          selectedDate={meeting.startTime}
          // eslint-disable-next-line
          onChange={(date: any) => onChange({ ...meeting, startTime: date })}
          showPopperArrow={true}
        />
      </FormControl>
      <FormControl>
        <FormLabel sx={labelStyle}>Beskrivelse av møte</FormLabel>
        <Textarea
          sx={inputStyle}
          isRequired
          value={meeting.description}
          placeholder="Skriv gjerne en god beskrivelse av hva møte skal handle om."
          resize="none"
          onChange={onDescriptionChange}
        />
      </FormControl>
    </VStack>
  );
};

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
