import { forwardRef, Textarea } from '@chakra-ui/react';
import ResizeTextarea from 'react-textarea-autosize';
import React from 'react';

export const AutoResizeTextarea = forwardRef((props, ref) => {
  return (
    <Textarea
      minH="unset"
      overflow="hidden"
      w="100%"
      resize="none"
      ref={ref as React.RefObject<HTMLTextAreaElement>}
      as={ResizeTextarea}
      minRows={3}
      {...props}
    />
  );
});
