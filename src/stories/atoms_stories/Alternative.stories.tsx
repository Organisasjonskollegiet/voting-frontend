import React from 'react';
import { Meta, Story } from '@storybook/react';
import Alternative, { AlternativeProps } from '../../components/atoms/Alternative';
import { Box } from '@chakra-ui/react';

export default {
  title: 'Atoms/Alternative',
  component: Alternative,
} as Meta;

const Template: Story<AlternativeProps> = (args) => (
  <Box maxWidth="320px">
    <Alternative {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  alternative: {
    id: '1',
    text: 'Test',
    votationId: '2',
  },
  selected: false,
};

export const Selected = Template.bind({});
Selected.args = {
  alternative: {
    id: '1',
    text: 'Test',
    votationId: '2',
  },
  selected: true,
};
