import React from 'react';
import { Meta, Story } from '@storybook/react';
import ManageMeetingInformation from '../../components/manageMeeting/ManageMeetingInformation';

export default {
  title: 'Molecules/AddMeetingInformation',
  component: ManageMeetingInformation,
} as Meta;

const nullFunction = () => {
  return;
};

const emptyMeeting = {
  title: '',
  organization: '',
  startTime: new Date(),
  description: '',
  allowSelfRegistration: false,
};

const Template: Story = () => (
  <ManageMeetingInformation meeting={emptyMeeting} updateMeeting={(meeting) => nullFunction()} />
);

export const Default = Template.bind({});
