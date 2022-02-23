import React from 'react';
import { Tag, TagLabel } from '@chakra-ui/react';

interface CustomProps {
  textColor?: string;
  bgColor: string;
  text: string;
}

const CustomTag: React.FC<CustomProps> = ({ textColor, bgColor, text }) => {
  return (
    <Tag variant="subtle" bgColor={bgColor} fontWeight="bold" p="0 1em">
      <TagLabel pt="2px" fontWeight="bold" textColor={textColor || 'white'} fontSize="12px">
        {text}
      </TagLabel>
    </Tag>
  );
};

export default CustomTag;
