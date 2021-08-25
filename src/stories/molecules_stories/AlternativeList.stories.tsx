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
      index: 1,
    },
    {
      id: '2',
      text: 'Alternativ 2',
      votationId: '1',
      index: 2,
    },
    {
      id: '3',
      text: 'Alternativ 3',
      votationId: '1',
      index: 0,
    },
  ],
  blankVotes: false,
  handleSelect: () => {
    return;
  },
  isStv: false,
};

export const Blank = Template.bind({});
Blank.args = {
  alternatives: [
    {
      id: '1',
      text: 'Alternativ 1',
      votationId: '1',
      index: 1,
    },
    {
      id: '2',
      text: 'Alternativ 2',
      votationId: '1',
      index: 2,
    },
    {
      id: '3',
      text: 'Alternativ 3',
      votationId: '1',
      index: 0,
    },
  ],
  blankVotes: true,
  handleSelect: () => {
    return;
  },
  isStv: false,
};
