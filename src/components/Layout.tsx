import { Box, Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import NavBar from "./navigation/NavBar";

type LayoutProps = {
  children?: ReactNode;
  title?: string;
  session?: Session | null | undefined;
};

const Layout = ({
  children,
  session,
  title = "Formations Premier Octet",
}: LayoutProps) => {
  const router = useRouter();
  const isSlide = router.route === "/[course]/[chapter]";
  const print = router.query.print !== undefined;

  return (
    <Box backgroundColor="#f7f7f7" minH="100vh">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎓</text></svg>"
        ></link>
      </Head>
      <Flex flexDirection="column" overflow={!print ? "hidden" : "inherit"}>
        {!isSlide && <NavBar session={session} />}
        {children}
      </Flex>
    </Box>
  );
};

export default Layout;
