import React from 'react';
import { Meta, Story } from '@storybook/react';
import ManageMeetingInformation from '../../components/manageMeeting/organisms/ManageMeetingInformation';

export default {
  title: 'Molecules/AddMeetingInformation',
  component: ManageMeetingInformation,
} as Meta;

const nullFunction = () => {
  return;
};

const Template: Story = () => <ManageMeetingInformation meetingId="" setMeetingId={(id: string) => nullFunction()} />;

export const Default = Template.bind({});
