import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export interface MeetingProps {
  id: string;
  title: string;
  description?: string | null;
  startTime: string;
  organization: string;
}

const styles = {
  width: '100%',
  borderRadius: '4px',
  boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
  padding: '1em 2em',
} as React.CSSProperties

const Meeting: React.FC<MeetingProps> = ({ title, startTime, description, organization }) => {
  return (
    <Box sx={styles}>
      <Heading as="h2" fontSize="1.125em"> {title} </Heading>
      <Text mb="1em" fontSize="0.75em"> {description} </Text>
      <Flex justifyContent="space-between" fontSize="0.75em">
        <Text fontWeight="bold"> {organization} </Text>
        <Text fontWeight="bold">
           {startTime.split('T')[0].split('-').reverse().reduce((s1, s2) => s1 + '.' + s2)}
        </Text>
      </Flex>
    </Box>
  );
};

export default Meeting;
