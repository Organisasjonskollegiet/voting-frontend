import { ChakraProvider } from '@chakra-ui/react';
import { addParameters, StoryContext } from '@storybook/react';
import React from 'react';

const withChakra = (StoryFn: Function, _: StoryContext) => {
  return (
    <>
      <ChakraProvider>
        {/* <Fonts /> */}
        <StoryFn />
      </ChakraProvider>
    </>
  );
};

export const decorators = [withChakra];

addParameters({
  viewMode: 'canvas',
});
