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
import { FiLogOut } from "react-icons/fi";
import { BsBook } from "react-icons/bs";
import { RiUserAddLine } from "react-icons/ri";
import { HiOutlinePencilAlt } from "react-icons/hi";
import NextLink from "next/link";

const UserDropdoown = () => {
  const [session, _] = useSession();
  const userName = session?.user?.name || session?.user?.email;

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
          <Text fontWeight="bold"> {userName} </Text>
          {session?.user?.isAdmin && (
            <Box
              backgroundColor="secondary.400"
              color="white"
              paddingY={1}
              paddingX={3}
              borderRadius="lg"
            >
              <Text fontWeight="bold" fontSize="xs">
                ADMIN
              </Text>
            </Box>
          )}
        </HStack>
        {session?.user?.isAdmin && (
          <>
            <NextLink href="/admin/courses" passHref>
              <MenuItem
                as="a"
                icon={<Icon as={HiOutlinePencilAlt} w={6} h={6} />}
              >
                Gérer les cours
              </MenuItem>
            </NextLink>

            <NextLink href="/admin/users" passHref>
              <MenuItem icon={<Icon as={RiUserAddLine} w={6} h={6} />}>
                Ajouter un stagiaire
              </MenuItem>
            </NextLink>
          </>
        )}
        <NextLink href="/" passHref>
          <MenuItem icon={<Icon as={BsBook} w={6} h={6} />}>Mes cours</MenuItem>
        </NextLink>
        <MenuItem
          onClick={() => signOut()}
          icon={<Icon as={FiLogOut} w={6} h={6} />}
        >
          Se déconnecter
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserDropdoown;
