export * from './Component';
import { extendTheme , StyleProps } from '@chakra-ui/react';
import {  ComponentStyleConfig } from '@chakra-ui/theme'
export const theme = extendTheme({
  components : {
   Button : {
    baseStyle : {
    },
    variants : {
      me : {
        textColor : "white",
        background:  "blue"        
      } as StyleProps
    }
   } as ComponentStyleConfig
  },
  semanticTokens: {
    colors: {
      semantic: {
        default: 'red.500',
        _light: 'red.500',
        _dark: 'blue.400',
      },
    },
  },
});
