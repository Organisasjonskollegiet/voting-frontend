import React from 'react';
import {Meta, Story} from '@storybook/react';
import AddMeetingInformation from '../../components/molecules/AddMeetingInformation';

export default {
  title: 'Molecules/AddMeetingInformation',
  component: AddMeetingInformation,
} as Meta;

const Template: Story = () => <AddMeetingInformation />

export const Default = Template.bind({});