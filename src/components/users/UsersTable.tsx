import { User } from ".prisma/client";
import { VStack } from "@chakra-ui/layout";
import {
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import UserTableRow from "./UserTableRow";

type Props = {
  users: User[];
};

const UsersTable = ({ users }: Props) => {
  const [deletedUsers, setDeletedUsers] = useState<string[]>([]);
  const [isDeletingUSer, setDeletingUser] = useState<User | undefined>();
  const onClose = () => setDeletingUser(undefined);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const deleteUser = async () => {
    if (isDeletingUSer) {
      await fetch(window.location.href, {
        method: "DELETE",
        body: isDeletingUSer.id,
      });
      setDeletedUsers([...deletedUsers, isDeletingUSer.id]);
    }

    onClose();
  };

  return (
    <VStack w="2xl">
      <Table>
        <Thead>
          <Tr>
            <Th>name</Th>
            <Th>email</Th>
            <Th>courses</Th>
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
                  deleteUser={setDeletingUser}
                />
              )
            );
          })}
        </Tbody>
      </Table>
      <AlertDialog
        isOpen={!!isDeletingUSer}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Supprimer l'utilisateur ?
            </AlertDialogHeader>

            <AlertDialogBody>Êtes vous sur ?</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} ref={cancelRef}>
                Annuler
              </Button>
              <Button colorScheme="red" onClick={deleteUser} ml={3}>
                Supprimer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
};

export default UsersTable;
