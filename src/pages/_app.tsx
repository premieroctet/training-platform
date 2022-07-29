import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import { AppProps } from "next/app";
import DeckTimerContextProvider from "../context/DeckTimerContext";
import customTheme from "../theme/theme";
import "./../theme/app.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme} resetCSS={true}>
      <DeckTimerContextProvider>
        <Provider session={pageProps.session}>
          <Component {...pageProps} />
        </Provider>
      </DeckTimerContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
