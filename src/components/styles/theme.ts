import { extendTheme } from '@chakra-ui/react';
import { AlternativeConfig } from '../activeVotation/alternative/Alternative';
import { MeetingInformationFormConfig } from '../manageMeeting/MeetingInformationForm';
import { darkblue, lightblue, green } from './colors';

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
        p: '1.5em 4em',
      },
      variants: {
        solid: {
          bg: 'transparent',
        },
        link: {
          py: '1rem',
        },
        dark: {
          bg: 'gray.500',
          color: 'white',
          borderRadius: '16rem',
          _hover: {
            bg: 'gray.400',
          },
        },
        green: {
          bg: green,
          color: 'white',
          borderRadius: '16rem',
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
    },
  },
});

export default theme;
