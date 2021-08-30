import React from 'react';
import { Meta, Story } from '@storybook/react';
import VotationResult, { VotationResultProps } from '../../components/atoms/VotationResult';

export default {
  title: 'Atoms/VotationResult',
  component: VotationResult,
} as Meta;

const Template: Story<VotationResultProps> = (args) => <VotationResult {...args} />;

export const Default = Template.bind({});
Default.args = {
  winners: [{ text: 'Alternativ 1', id: 'id', votationId: 'id' }],
};
