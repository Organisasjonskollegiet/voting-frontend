import { extendTheme } from '@chakra-ui/react';
import { AlternativeConfig } from '../atoms/Alternative';

export const darkblue = '#718096';
export const offwhite = '#EDF2F7';


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

    Button: {
      baseStyle: {
        color: darkblue,
        bg: offwhite,
      }
    },
    Spinner: {
      baseStyle: {
        color: darkblue,
        borderBottomColor: offwhite,
        borderLeftColor: offwhite,
        borderRightColor: offwhite,
      }
    },
    Text: {
      baseStyle: {
        color: darkblue,
      }
    },
    Heading: {
      baseStyle: {
        color: darkblue,
      }
    }
  }
});

export default theme;
