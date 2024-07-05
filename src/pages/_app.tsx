import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import DeckTimerContextProvider from "../context/DeckTimerContext";
import customTheme from "../theme/theme";
import "./../theme/app.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme} resetCSS={true}>
      <DeckTimerContextProvider>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </DeckTimerContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
