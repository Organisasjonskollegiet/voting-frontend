import React from 'react';
import { Meta, Story } from '@storybook/react';
import Votation from '../../components/pages/Votation';

export default {
  title: 'Pages/Votation',
  component: Votation,
} as Meta;

const Template: Story = (args) => <Votation />;

export const Default = Template.bind({});
