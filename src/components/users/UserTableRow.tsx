import { User } from ".prisma/client";
import { Td, Tr, Link, IconButton, HStack } from "@chakra-ui/react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import ConfirmButton from "../ConfirmButton";

type Props = {
  user: User;
  deleteUser: (userID: User["id"]) => void;
  tab?: number;
  disabled?: boolean;
};

const UserTableRow = ({ user, deleteUser, tab, disabled }: Props) => {
  return (
    <Tr key={user.id}>
      <Td>{user.name}</Td>
      <Td>{user.email}</Td>
      <Td justifyContent="flex-end">
        <HStack>
          <IconButton
            size="sm"
            aria-label="Search database"
            icon={<EditIcon />}
            as={Link}
            href={`/admin/users/${user.id}?tab=${tab}`}
            disabled={disabled}
          />
          <ConfirmButton
            label="Supprimer l'utilisateur"
            confirmDetail="Êtes-vous sûrs de vouloir supprimer cet utilisateur?"
            colorScheme="red"
            icon={<CloseIcon />}
            onConfirm={() => deleteUser(user?.id)}
            size="xs"
            disabled={disabled}
          />
        </HStack>
      </Td>
    </Tr>
  );
};

export default UserTableRow;
