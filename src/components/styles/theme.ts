import { extendTheme } from '@chakra-ui/react';
import { AlternativeConfig } from '../activeVotation/alternative/Alternative';
import { MeetingInformationFormConfig } from '../manageMeeting/MeetingInformationForm';
import { darkblue, lightblue } from './colors';

const theme = extendTheme({
  colors: {
    blue: {
      200: '#EDF2F7',
      300: '#8d99ab',
      400: '#718096',
    },
  },
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
        p: '1.5em 4em',
      },
      variants: {
        link: {
          py: '1rem',
          bg: 'transparent',
        },
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
      variants: {
        h1: {
          fontSize: '1.5rem',
        },
      },
    },
  },
});

export default theme;
