import React from 'react';
import {Meta, Story} from '@storybook/react';
import AddMeetingInformation from '../../components/molecules/AddMeetingInformation';
import { CreateMeetingInput, Meeting } from '../../__generated__/graphql-types';

export default {
  title: 'Molecules/AddMeetingInformation',
  component: AddMeetingInformation,
} as Meta;


const meeting = {
  organization: '',
  title: '',
  startTime: new Date(),
  description: '',
}

const onMeetingCreated = (meetingId: string) => {
  return undefined;
}

const Template: Story = () => <AddMeetingInformation onMeetingCreated={onMeetingCreated} />

export const Default = Template.bind({});