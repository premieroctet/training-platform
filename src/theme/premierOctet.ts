import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const fontFamilyBase = "'Josefin Sans', 'Montserrat', sans-serif";
const fontSizeBase = 1;
const lineHeightBase = 1;
const baseline = fontSizeBase * lineHeightBase;

const premierOctetConfig = defineConfig({
  globalCss: {
    mark: {
      bg: "yellow.100",
      px: 2,
    },
    body: {
      bg: "white",
      color: "black",
    },
    a: {
      color: "teal.500",
      _hover: {
        textDecoration: "underline",
      },
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: fontFamilyBase },
        body: { value: fontFamilyBase },
        mono: { value: fontFamilyBase },
      },
      fontSizes: {
        xs: { value: "0.4em" },
        sm: { value: "0.5em" },
        md: { value: "0.6em" },
        lg: { value: "0.7em" },
        xl: { value: "0.8em" },
        "2xl": { value: "1em" },
        "3xl": { value: "1.2em" },
        "4xl": { value: "1.5em" },
        "5xl": { value: "1.8em" },
        "6xl": { value: "2em" },
      },
      sizes: {
        container: {
          xl: { value: "110em" },
        },
      },
      spacing: {
        xs: { value: `${baseline / 3}em` },
        sm: { value: `${baseline / 2}em` },
        md: { value: `${baseline}em` },
        lg: { value: `${baseline * 2}em` },
        xl: { value: `${baseline * 3}em` },
        "2xl": { value: `${baseline * 4}em` },
      },
    },
    breakpoints: {
      sm: "30em",
      md: "48em",
      lg: "62em",
      xl: "80em",
    },
  },
});

const premierOctet = createSystem(defaultConfig, premierOctetConfig);

export default premierOctet;
