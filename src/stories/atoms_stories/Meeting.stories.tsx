import React from 'react';
import { Meta, Story } from '@storybook/react';
import Meeting, { MeetingProps } from '../../components/atoms/Meeting';
import { Box } from '@chakra-ui/layout';

export default {
  title: 'Atoms/Meeting',
  component: Meeting,
} as Meta;

const Template: Story<MeetingProps> = (args) => (
  <Box width="600px">
    <Meeting {...args}/>
  </Box>
);

export const Default = Template.bind({});
Default.args = {
    id: "1",
    title: "Generalforsamling",
    startTime: "2021-11-05",
    description: "Quo illum corporis enim repellat totam natus sit.",
    owner: "Random Linjeforening",
};
