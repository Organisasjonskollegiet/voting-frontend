import { extendTheme } from '@chakra-ui/react';
import { AlternativeConfig } from '../atoms/Alternative';
import { AlternativeContainerConfig } from '../molecules/AlternativeContainer';
import { VotationConfig } from '../pages/Votation';

const darkblue = '#718096';
const lightblue = '#EDF2F7'

// TODO: Define colors and theme based on design
const theme = extendTheme({
  fonts: {
    body: 'Helvetica',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  components: {
    Alternative: AlternativeConfig,
    AlternativeContainer: AlternativeContainerConfig,
    Votation: VotationConfig,

    Button: {
      baseStyle: {
        color: darkblue,
        bg: lightblue,
      }
    },
    Spinner: {
      baseStyle: {
        color: darkblue,
        borderBottomColor: lightblue,
        borderLeftColor: lightblue,
        borderRightColor: lightblue,
      }
    },
  }
});

export default theme;
