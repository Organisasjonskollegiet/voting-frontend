import React from 'react';
import { Meta, Story } from '@storybook/react';
import AddMeetingInformation from '../../components/particles/AddMeetingInformation';

export default {
  title: 'Molecules/AddMeetingInformation',
  component: AddMeetingInformation,
} as Meta;

const nullFunction = () => {
  return;
};

const emptyMeeting = { title: '', organization: '', startTime: new Date(), description: '' };

const Template: Story = () => (
  <AddMeetingInformation
    isActive={true}
    meeting={emptyMeeting}
    updateMeeting={(meeting) => nullFunction()}
    handleNavigation={nullFunction}
  />
);

export const Default = Template.bind({});
