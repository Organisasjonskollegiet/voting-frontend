import React from 'react';
import { Meta, Story } from '@storybook/react';
import Votation, { VotationProps } from '../../components/pages/Votation';

export default {
  title: 'Pages/Votation',
  component: Votation,
} as Meta;

const Template: Story<VotationProps> = (args) => <Votation {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: '1',
};
