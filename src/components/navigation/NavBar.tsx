import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import UserDropdoown from "./UserDropdown";
import LoginButton from "../LoginButton";
import router from "next/router";

type Props = {
  session?: Session | null | undefined;
};

const NavBar = ({ session }: Props) => {
  return (
    <Box boxShadow="md" background="white" paddingX={2} paddingY={1}>
      <Flex justify="space-between" align="center" className="navbar" p={1}>
        <HStack onClick={() => router.push("/")} cursor="pointer" spacing={0}>
          <Image
            src="/logo/mstile-60x60.png"
            objectFit="cover"
            height="45px"
            cursor="pointer"
            alt="logo"
          />
          <Text
            margin="0px!important"
            fontSize="sm"
            fontWeight="bold"
            color="primary.500"
            textTransform="uppercase"
            letterSpacing={1}
          >
            Training
          </Text>
        </HStack>
        {session ? <UserDropdoown /> : <LoginButton />}
      </Flex>
    </Box>
  );
};

export default NavBar;
