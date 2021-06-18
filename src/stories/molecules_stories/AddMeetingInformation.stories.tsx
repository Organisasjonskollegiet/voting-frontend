import React from 'react';
import {Meta, Story} from '@storybook/react';
import AddMeetingInformation from '../../components/molecules/AddMeetingInformation';
import { Meeting, Status } from '../../__generated__/graphql-types';

export default {
  title: 'Molecules/AddMeetingInformation',
  component: AddMeetingInformation,
} as Meta;


const nullFunction = () => {
  return;
}

const emptyMeeting = {title:'', organization: '', startTime: new Date(), description: ''}

const Template: Story = () => <AddMeetingInformation meeting={emptyMeeting} updateMeeting={(meeting) => nullFunction()} handleNext={nullFunction} />

export const Default = Template.bind({});