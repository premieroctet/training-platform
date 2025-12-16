import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import DeckTimerContextProvider from "../context/DeckTimerContext";
import customSystem from "../theme/theme";
import "./../theme/app.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={customSystem}>
      <DeckTimerContextProvider>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </DeckTimerContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
