import React from 'react';
import { Meta, Story } from '@storybook/react';
import MeetingList, { MeetingListProps } from '../../components/molecules/MeetingList';
import { Box } from '@chakra-ui/layout';

export default {
  title: 'Molecules/MeetingList',
  component: MeetingList,
} as Meta;

const Template: Story<MeetingListProps> = (args) => ( 
  <Box w="80vw" m="auto">
    <MeetingList {...args} />
  </Box>);

export const Default = Template.bind({});
Default.args = {
  meetings: [
    {
      id: "1",
      title: "Generalforsamling",
      startTime: "2021-11-05",
      description: "Quo illum corporis enim repellat totam natus sit.",
      owner: "Random Linjeforening",
    },
    {
      id: "2",
      title: "Valg av nytt styre",
      startTime: "2021-09-02",
      description: "Quo illum corporis enim repellat totam natus sit.",
      owner: "Random Linjeforening",
    },
  ]
};
