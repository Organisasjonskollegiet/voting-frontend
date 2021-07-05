import React from 'react';
import { Meta, Story } from '@storybook/react';
import Loading, { LoadingProps } from '../../components/atoms/Loading';

export default {
  title: 'Atoms/Loading',
  component: Loading,
} as Meta;

const Template: Story<LoadingProps> = () => <Loading asOverlay={false} text="nå skjer det noe" />;

export const Defualt = Template.bind({});
