import React from 'react';
import { Meta, Story } from '@storybook/react';
import AlternativeList, { AlternativeListProps } from '../../components/molecules/AlternativeList';

export default {
  title: 'Molecules/AlternativeList',
  component: AlternativeList,
} as Meta;

const Template: Story<AlternativeListProps> = (args) => <AlternativeList {...args} />;

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
  blankVotes: false,
  handleSelect: () => {
    return;
  },
};

export const Blank = Template.bind({});
Blank.args = {
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
  blankVotes: true,
  handleSelect: () => {
    return;
  },
};
