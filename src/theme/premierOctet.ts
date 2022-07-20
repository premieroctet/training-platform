import { extendTheme } from "@chakra-ui/react";
import theme from "@chakra-ui/theme";

const fontFamilyBase = "'Josefin Sans', 'Montserrat', sans-serif";
const fontSizeBase = 1;
const lineHeightBase = 1;
const baseline = fontSizeBase * lineHeightBase;

const premierOctet = extendTheme({
  ...theme,
  styles: {
    global: {
      mark: {
        bg: "yellow.100",
        px: 2,
      },
      // styles for the `body`
      body: {
        bg: "white",
        color: "black",
      },
      // styles for the `a`
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
  breakpoints: ["30em", "48em", "62em", "80em"],
  fonts: {
    heading: fontFamilyBase,
    body: fontFamilyBase,
    mono: fontFamilyBase,
    // mono: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },
  fontSizes: {
    xs: "0,4em",
    sm: "0.5em", // h6
    md: "0.6em", // h5
    lg: "0.7em", // h4
    xl: "0.8em", // h3
    "2xl": "1em", // h2
    "3xl": "1.2em", // h1
    "4xl": "1.5em",
    "5xl": "1.8em",
    "6xl": "2em",
  },
  sizes: {
    ...theme.sizes,
    container: {
      ...theme.sizes.container,
      xl: "110em",
    },
  },
  space: {
    ...theme.space,
    xs: `${baseline / 3}em`,
    sm: `${baseline / 2}em`,
    md: `${baseline}em`, // 1em
    lg: `${baseline * 2}em`,
    xl: `${baseline * 3}em`,
    "2xl": `${baseline * 4}em`,
  },
});

export default premierOctet;
