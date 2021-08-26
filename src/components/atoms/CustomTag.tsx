import React from 'react';
import { Tag, TagLabel, Text } from '@chakra-ui/react';

interface CustomProps {
  textColor?: string;
  bgColor: string;
  text: string;
}

const Custom: React.FC<CustomProps> = ({ textColor, bgColor, text }) => {
  return (
    <>
      <Tag bgColor={bgColor} fontWeight="bold" pl="1em" pr="1em">
        <TagLabel variant="subtle" pt="2px">
          <Text fontWeight="bold" textColor={textColor || 'white'} fontSize="12px">
            {text}
          </Text>
        </TagLabel>
      </Tag>
    </>
  );
};

export default Custom;
