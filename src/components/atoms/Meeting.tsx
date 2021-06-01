import { ComponentStyleConfig, Box, Flex, Heading, Text, useStyleConfig } from '@chakra-ui/react';
import React from 'react';

export interface MeetingProps {
  id: string;
  title: string;
  startTime: string;
  description: string;
  owner: string;
}


const styles = {
  width: '100%',
  borderRadius: '4px',
  boxShadow: '0ps 0px 10px rgba(0,0,0,0.1)',
} as React.CSSProperties

const Meeting: React.FC<MeetingProps> = ({ title, startTime, description, owner }) => {
  return (
    <Box sx={styles}>
      <Heading as="h2"> {title} </Heading>
      <Text mb="1em"> {description} </Text>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold"> {owner} </Text>
        <Text fontWeight="bold"> {startTime} </Text>
      </Flex>
    </Box>
  );
};

export default Meeting;
