import { User } from ".prisma/client";
import {
  CloseButton,
  Td,
  Tr,
  Link,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

type Props = {
  user: User;
  deleteUser: (user: User) => void;
};

const UserTableRow = ({ user, deleteUser }: Props) => {
  return (
    <Tr key={user.id}>
      <Td>{user.name}</Td>
      <Td>{user.email}</Td>
      <Td>{user.courses.join(", ")}</Td>
      <Td justifyContent="flex-end">
        <HStack>
          <IconButton
            size="sm"
            aria-label="Search database"
            icon={<EditIcon />}
            as={Link}
            href={`/admin/users/${user.id}`}
          />
          <CloseButton
            onClick={() => {
              deleteUser(user);
            }}
          />
        </HStack>
      </Td>
    </Tr>
  );
};

export default UserTableRow;
