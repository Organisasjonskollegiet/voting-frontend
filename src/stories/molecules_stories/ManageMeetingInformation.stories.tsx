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

const emptyMeeting = { title: '', organization: '', startTime: new Date(), description: '' };

const Template: Story = () => (
  <ManageMeetingInformation
    isActive={true}
    meeting={emptyMeeting}
    updateMeeting={(meeting) => nullFunction()}
    handleNavigation={nullFunction}
  />
);

export const Default = Template.bind({});
