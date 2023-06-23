import { extendTheme } from '@chakra-ui/react';
import { AlternativeConfig } from '../activeVotation/alternative/Alternative';
import { MeetingInformationFormConfig } from '../manageMeeting/atoms/MeetingInformationForm';
import { darkblue, lightblue, green, logInButtonOrange, textBlue, textGray } from './colors';
import "@fontsource/lora";
import "@fontsource/open-sans"

const theme = extendTheme({
  colors: {
    blue: {
      200: '#EDF2F7',
      300: '#8d99ab',
      400: '#718096',
    },
    orangeButton : {
      500 : logInButtonOrange
    }
  },
  fonts: {
    heading : "'Lora', sans-serif",
    body: "'Open Sans', sans-serif",
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
        standard: {
          bg: 'transparent',
        },
        link: {
          py: '1rem',
          fontSize : '22px', 
          fontWeight: 'semibold', 
          color: textGray
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
          bg: green(),
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
        color: textGray,
        fontSize: "18px",
        fontWeight : "semibold",
      },
      variants: {
        bodyHeader: {
          fontSize: '24px',
          fontWeight : "bold",
          color: textBlue,
         },
      },
    },
    Heading: {
      baseStyle: {
        color: textBlue,
        fontWeight : "bold",
      },
      variants: {
        h1: {
          fontSize: '3.0rem',
        },
        mobile :{
          fontSize: '2.0rem',
        }
      },
    },
  },
});

export default theme;
