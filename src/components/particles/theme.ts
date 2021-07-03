import { extendTheme } from '@chakra-ui/react';
import { AlternativeConfig } from '../atoms/Alternative';
import { MeetingInformationFormConfig } from '../molecules/MeetingInformationForm';

const darkblue = '#718096';
const lightblue = '#EDF2F7';

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
    Button: {
      baseStyle: {
        color: darkblue,
        bg: lightblue,
      },
    },
    MeetingInformationForm: MeetingInformationFormConfig,
    Spinner: {
      baseStyle: {
        color: darkblue,
        borderBottomColor: lightblue,
        borderLeftColor: lightblue,
        borderRightColor: lightblue,
      },
    },
    Text: {
      baseStyle: {
        color: darkblue,
      },
    },
    Heading: {
      baseStyle: {
        color: darkblue,
      },
    },
  },
});

export default theme;
