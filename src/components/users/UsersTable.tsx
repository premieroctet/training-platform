import { User } from ".prisma/client";
import { VStack } from "@chakra-ui/layout";
import { Table, Tbody, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import UserTableRow from "./UserTableRow";

type Props = {
  users: User[];
  tab?: number;
};

const UsersTable = ({ users, tab }: Props) => {
  const [deleting, setDeleting] = useState(false);
  const [deletedUsers, setDeletedUsers] = useState<string[]>([]);
  const toast = useToast();

  const deleteUser = async (userId: string) => {
    setDeleting(true);
    try {
      const response = await fetch("/api/users/" + userId, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        toast({
          title:
            "Une erreur est survenue lors de la suppression de l'utilisateur",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        setDeletedUsers([...deletedUsers, userId]);
        toast({
          title: "Utilisateur supprimé",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
    setDeleting(false);
  };

  if (!users?.length) return <p>Aucun utilisateur</p>;
  return (
    <VStack w="2xl">
      <Table>
        <Thead>
          <Tr>
            <Th>Nom</Th>
            <Th>Email</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => {
            return (
              !deletedUsers.includes(user.id) && (
                <UserTableRow
                  key={user.id}
                  user={user}
                  deleteUser={deleteUser}
                  tab={tab}
                  disabled={deleting}
                />
              )
            );
          })}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default UsersTable;
