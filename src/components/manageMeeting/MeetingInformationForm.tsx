import React from 'react';
import { useStyleConfig, FormControl, FormLabel, Input, ComponentStyleConfig, VStack } from '@chakra-ui/react';
import DatePicker from '../common/DatePicker/DatePicker';
import { labelStyle, inputStyle, highlightedInputStyle } from '../styles/formStyles';
import { MeetingWorking } from '../../types/types';
import { AutoResizeTextarea } from '../common/AutosizeTextArea';

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

  const toggleSelfRegistration = () => {
    onChange({ ...meeting, allowSelfRegistration: !meeting.allowSelfRegistration });
  };

  return (
    <VStack spacing="7" color="#718096" sx={meetingInformationFormStyle}>
      <FormControl isRequired>
        <FormLabel htmlFor="organization" sx={labelStyle}>
          Organisasjonsnavn
        </FormLabel>
        <Input
          sx={inputStyle}
          id="organization"
          isRequired
          _focus={highlightedInputStyle}
          value={meeting.organization}
          placeholder="Hva heter organisasjonen møtet arrangeres av?"
          onChange={onOrganizationChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="title" sx={labelStyle}>
          Tittel på møte
        </FormLabel>
        <Input
          id="title"
          sx={inputStyle}
          isRequired
          _focus={highlightedInputStyle}
          value={meeting.title}
          placeholder="Hva skal tittelen på møtet være?"
          onChange={onTitleChange}
        />
      </FormControl>
      <FormControl isRequired fontWeight="normal">
        <FormLabel htmlFor="start-time" sx={labelStyle}>
          Møtetidspunkt
        </FormLabel>
        <DatePicker
          id="start-time"
          selectedDate={meeting.startTime}
          // eslint-disable-next-line
          onChange={(date: any) => onChange({ ...meeting, startTime: date })}
          showPopperArrow={true}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="description" sx={labelStyle}>
          Beskrivelse av møte
        </FormLabel>
        <AutoResizeTextarea
          sx={inputStyle}
          id="description"
          isRequired
          _focus={highlightedInputStyle}
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
    padding: '12px 0',
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
