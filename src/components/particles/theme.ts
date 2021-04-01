import { extendTheme } from '@chakra-ui/react';

// TODO: Define colors and theme based on design
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});
export default theme;
