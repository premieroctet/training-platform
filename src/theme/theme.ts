import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const fontFamilyBase =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
const fontSizeBase = 1.6;
const lineHeightBase = 1.5;
const baseline = fontSizeBase * lineHeightBase;

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          50: { value: "#E7E8FD" },
          100: { value: "#BDBFFA" },
          200: { value: "#9296F7" },
          300: { value: "#676DF4" },
          400: { value: "#3C44F1" },
          500: { value: "#5057f2" },
          600: { value: "#0E16BE" },
          700: { value: "#0B108E" },
          800: { value: "#070B5F" },
          900: { value: "#04052F" },
        },
        secondary: {
          50: { value: "#e2fbea" },
          100: { value: "#c2ebd0" },
          200: { value: "#9fddb5" },
          300: { value: "#7ccf9c" },
          400: { value: "#58c184" },
          500: { value: "#3ea763" },
          600: { value: "#2e8246" },
          700: { value: "#1f5d2e" },
          800: { value: "#0f3916" },
          900: { value: "#011500" },
        },
        green: {
          50: { value: "#E5FFF4" },
          100: { value: "#B8FFE0" },
          200: { value: "#8AFFCB" },
          300: { value: "#5CFFB7" },
          400: { value: "#2EFFA3" },
          500: { value: "#00FF8F" },
          600: { value: "#00CC72" },
          700: { value: "#009956" },
          800: { value: "#006639" },
          900: { value: "#00331D" },
        },
        red: {
          50: { value: "#FFE5EC" },
          100: { value: "#FFB8CA" },
          200: { value: "#FF8AA9" },
          300: { value: "#FF5C87" },
          400: { value: "#FF2E65" },
          500: { value: "#FF0043" },
          600: { value: "#CC0036" },
          700: { value: "#990028" },
          800: { value: "#66001B" },
          900: { value: "#33000D" },
        },
      },
      fonts: {
        heading: { value: fontFamilyBase },
        body: { value: fontFamilyBase },
        mono: {
          value:
            'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
        },
      },
      fontSizes: {
        xs: { value: "0.8rem" },
        sm: { value: "1rem" },
        md: { value: "1.2rem" },
        lg: { value: "1.4rem" },
        xl: { value: "1.6rem" },
        "2xl": { value: "2.4rem" },
        "3xl": { value: "3rem" },
        "4xl": { value: "3.6rem" },
        "5xl": { value: "4.2rem" },
        "6xl": { value: "5rem" },
      },
      sizes: {
        container: {
          xl: { value: "110rem" },
        },
      },
      spacing: {
        xs: { value: `${baseline / 3}rem` },
        sm: { value: `${baseline / 2}rem` },
        md: { value: `${baseline}rem` },
        lg: { value: `${baseline * 2}rem` },
        xl: { value: `${baseline * 3}rem` },
        "2xl": { value: `${baseline * 4}rem` },
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

const customSystem = createSystem(defaultConfig, customConfig);

export default customSystem;
