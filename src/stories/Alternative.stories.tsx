import React from 'react';
import { Meta, Story } from '@storybook/react';
import Alternative, { AlternativeProps } from '../components/atoms/Alternative';

export default {
  title: 'Atoms/Alternative',
  component: Alternative,
} as Meta;

const Template: Story<AlternativeProps> = (args) => <Alternative {...args} />;

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
