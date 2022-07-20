import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  HStack,
  Icon,
  Box,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/client";
import router from "next/router";
import { MdLogout } from "react-icons/md";
import { BsBook } from "react-icons/bs";
import { RiUserAddLine } from "react-icons/ri";

const UserDropdoown = () => {
  const [session, _] = useSession();
  return (
    <Menu>
      <MenuButton>
        <Avatar
          name={session?.user?.name ?? undefined}
          backgroundColor="primary.500"
          color="white"
          size="sm"
        />
      </MenuButton>
      <MenuList>
        <HStack paddingX={4} paddingY={2}>
          <Text> {session?.user?.name} </Text>
          <Box
            backgroundColor="secondary.400"
            color="white"
            paddingY={1}
            paddingX={3}
            borderRadius="lg"
          >
            <Text fontWeight="bold" fontSize="0.8rem">
              {session?.user?.isAdmin && "ADMIN"}
            </Text>
          </Box>
        </HStack>
        {session?.user?.isAdmin && (
          <MenuItem onClick={() => router.push("/users")}>
            <HStack>
              <Icon as={RiUserAddLine} w={6} h={6} />
              <Text fontWeight={"500"}>Ajouter un stagiaire</Text>
            </HStack>
          </MenuItem>
        )}
        <MenuItem onClick={() => router.push("/")}>
          <HStack>
            <Icon as={BsBook} w={6} h={6} />
            <Text fontWeight={"500"}>Mes cours</Text>
          </HStack>
        </MenuItem>
        <MenuItem onClick={() => signOut()}>
          <HStack>
            <Icon as={MdLogout} w={6} h={6} />
            <Text fontWeight={"500"}>Se déconnecter</Text>
          </HStack>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserDropdoown;
