import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import { AppProps } from "next/app";
import DeckTimerContextProvider from "../context/DeckTimerContext";
import customTheme from "../theme/theme";
import "./../theme/app.css";
import TinaProvider from "../../.tina/components/TinaDynamicProvider";
import { withTina } from "tinacms";
import { MarkdownFieldPlugin } from "react-tinacms-editor";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TinaProvider>
      <ChakraProvider theme={customTheme} resetCSS={true}>
        <DeckTimerContextProvider>
          <Provider session={pageProps.session}>
            <Component {...pageProps} />
          </Provider>
        </DeckTimerContextProvider>
      </ChakraProvider>
    </TinaProvider>
  );
}

export default MyApp;

// export default withTina(MyApp, {
//   enabled: true,
//   sidebar: true,
//   plugins: [MarkdownFieldPlugin],
// });
