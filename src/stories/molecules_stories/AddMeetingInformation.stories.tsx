import React from 'react';
import {Meta, Story} from '@storybook/react';
import AddMeetingInformation from '../../components/molecules/AddMeetingInformation';
import { Meeting } from '../../__generated__/graphql-types';

export default {
  title: 'Molecules/AddMeetingInformation',
  component: AddMeetingInformation,
} as Meta;


const onMeetingUpdated = (meeting: Meeting) => {
  return undefined;
}

const Template: Story = () => <AddMeetingInformation meetingId={undefined} meetingFromProps={undefined} onMeetingUpdated={onMeetingUpdated} />

export const Default = Template.bind({});