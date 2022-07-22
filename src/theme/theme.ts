import { extendTheme } from "@chakra-ui/react";
import theme from "@chakra-ui/theme";

const fontFamilyBase =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
const fontSizeBase = 1.6;
const lineHeightBase = 1.5;
const baseline = fontSizeBase * lineHeightBase;

const customTheme = extendTheme({
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      50: "#E7E8FD",
      100: "#BDBFFA",
      200: "#9296F7",
      300: "#676DF4",
      400: "#3C44F1",
      500: "#5057f2",
      600: "#0E16BE",
      700: "#0B108E",
      800: "#070B5F",
      900: "#04052F",
    },
    secondary: {
      50: "#e2fbea",
      100: "#c2ebd0",
      200: "#9fddb5",
      300: "#7ccf9c",
      400: "#58c184",
      500: "#3ea763",
      600: "#2e8246",
      700: "#1f5d2e",
      800: "#0f3916",
      900: "#011500",
    },
    green: {
      50: "#E5FFF4",
      100: "#B8FFE0",
      200: "#8AFFCB",
      300: "#5CFFB7",
      400: "#2EFFA3",
      500: "#00FF8F",
      600: "#00CC72",
      700: "#009956",
      800: "#006639",
      900: "#00331D",
    },
    red: {
      50: "#FFE5EC",
      100: "#FFB8CA",
      200: "#FF8AA9",
      300: "#FF5C87",
      400: "#FF2E65",
      500: "#FF0043",
      600: "#CC0036",
      700: "#990028",
      800: "#66001B",
      900: "#33000D",
    },
  },
  breakpoints: ["30em", "48em", "62em", "80em"],
  fonts: {
    heading: fontFamilyBase,
    body: fontFamilyBase,
    mono: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },
  fontSizes: {
    xs: "0.8rem",
    sm: "1rem", // h6
    md: "1.2rem", // h5
    lg: "1.4rem", // h4
    xl: "1.6rem", // h3
    "2xl": "2.4rem", // h2
    "3xl": "3rem", // h1
    "4xl": "3.6rem",
    "5xl": "4.2rem",
    "6xl": "5rem",
  },
  sizes: {
    ...theme.sizes,
    container: {
      ...theme.sizes.container,
      xl: "110rem",
    },
  },
  space: {
    ...theme.space,
    xs: `${baseline / 3}rem`,
    sm: `${baseline / 2}rem`,
    md: `${baseline}rem`, // 2.4rem
    lg: `${baseline * 2}rem`,
    xl: `${baseline * 3}rem`,
    "2xl": `${baseline * 4}rem`,
  },
});

export default customTheme;
