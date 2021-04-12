import React from 'react';
import { Meta, Story } from '@storybook/react';
import AlternativeContainer, { AlternativeContainerProps } from '../components/molecules/AlternativeContainer';

export default {
  title: 'Atoms/AlternativeContainer',
  component: AlternativeContainer,
} as Meta;

const Template: Story<AlternativeContainerProps> = (args) => <AlternativeContainer {...args} />;

export const Default = Template.bind({});
Default.args = {
  alternatives: [
    {
      id: '1',
      text: 'Alternativ 1',
      votationId: '1',
    },
    {
      id: '2',
      text: 'Alternativ 2',
      votationId: '1',
    },
    {
      id: '3',
      text: 'Alternativ 3',
      votationId: '1',
    },
  ],
};
