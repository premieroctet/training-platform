import { Box, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { getRoleLabel } from "src/utils/users";

const UserBadge = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }
  return (
    <Box
      backgroundColor={getRoleLabel(session?.user?.role)}
      color="white"
      paddingY={1}
      paddingX={3}
      borderRadius="lg"
    >
      <Text
        fontWeight="bold"
        fontSize="xs"
        textTransform="capitalize"
        bg={session?.user?.role === "admin" ? "primary.400" : "secondary.400"}
        px={2}
        py={1}
        borderRadius="md"
      >
        {session?.user?.role}
      </Text>
    </Box>
  );
};

export default UserBadge;
