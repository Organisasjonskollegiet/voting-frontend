import React from 'react';
import { Meta, Story } from '@storybook/react';
import MeetingList, { MeetingListProps } from '../../components/particles/MeetingList';
import { Box } from '@chakra-ui/layout';
import { Role } from '../../__generated__/graphql-types';

export default {
  title: 'Molecules/MeetingList',
  component: MeetingList,
} as Meta;

const Template: Story<MeetingListProps> = (args) => (
  <Box w="80vw" m="auto">
    <MeetingList {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  meetings: [
    {
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
    },
    {
      id: '2',
      title: 'Valg av nytt styre',
      startTime: '2021-09-02',
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
    },
  ],
};
