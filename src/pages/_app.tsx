import { ChakraProvider } from "@chakra-ui/react";
import { Session } from "next-auth";
import { Provider } from "next-auth/client";
import { AppProps } from "next/app";
import DeckTimerContextProvider from "../context/DeckTimerContext";
import customTheme from "../theme/theme";
import "./../theme/app.css";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <ChakraProvider theme={customTheme} resetCSS>
      <DeckTimerContextProvider>
        <Provider session={session}>
          <Component {...pageProps} />
        </Provider>
      </DeckTimerContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
