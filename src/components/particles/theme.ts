import { extendTheme } from '@chakra-ui/react';
import { AlternativeConfig } from '../atoms/Alternative';

// TODO: Define colors and theme based on design
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  components: {
    Alternative: AlternativeConfig
  }
});

export default theme;
