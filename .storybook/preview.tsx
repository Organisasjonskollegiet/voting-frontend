import { ChakraProvider } from '@chakra-ui/react';
import { addParameters, StoryContext } from '@storybook/react';
import React from 'react';
import theme from '../src/components/particles/theme';

const withChakra = (StoryFn: Function, _: StoryContext) => {
  return (
    <>
      <ChakraProvider theme={theme}>
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
