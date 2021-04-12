import { extendTheme } from '@chakra-ui/react';
import { AlternativeConfig } from '../atoms/Alternative';
import { AlternativeContainerConfig } from '../molecules/AlternativeContainer';

// TODO: Define colors and theme based on design
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  components: {
    Alternative: AlternativeConfig,
    AlternativeContainer: AlternativeContainerConfig
  }
});

export default theme;
