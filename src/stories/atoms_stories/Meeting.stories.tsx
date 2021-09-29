import React from 'react';
import { Meta, Story } from '@storybook/react';
import Meeting, { MeetingProps } from '../../components/myMeetings/Meeting';
import { Box } from '@chakra-ui/layout';
import { Role } from '../../__generated__/graphql-types';

export default {
  title: 'Atoms/Meeting',
  component: Meeting,
} as Meta;

const handleDeleteMeeting = (id: string) => {
  return;
};

const Template: Story<MeetingProps> = (args) => (
  <Box width="600px">
    <Meeting meetingStatus="open" handleDeleteMeeting={handleDeleteMeeting} {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  id: '1',
  title: 'Generalforsamling',
  startTime: '2021-11-05',
  description: 'Quo illum corporis enim repellat totam natus sit.',
  organization: 'Random Linjeforening',
  participants: [
    {
      user: {
        id: '000',
      },
      role: Role.Admin,
    },
  ],
};
