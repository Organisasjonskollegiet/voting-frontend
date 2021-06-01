import { ComponentStyleConfig, Flex, Heading, Text, useStyleConfig } from '@chakra-ui/react';
import React from 'react';

export interface MeetingProps {
  id: string;
  title: string;
  startTime: Date;
  description: string;
  owner: string;
}

const Meeting: React.FC<MeetingProps> = ({ title, startTime, description, owner }) => {
  const styles = useStyleConfig('Meeting');
  return (
    <Flex sx={styles}>
      <Heading as="h2"> {title} </Heading>
      <Text> {description} </Text>
      <Text fontWeight="bold"> {owner} </Text>
      <Text fontWeight="bold"> {startTime} </Text>
    </Flex>
  );
};

export const MeetingConfig: ComponentStyleConfig = {
  baseStyle: {
    width: '100%',
  },
};
export default Meeting;
