import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { RiUserAddLine } from "react-icons/ri";
import UserForm from "./UserForm";

const AddUserModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="primary"
        size="sm"
        leftIcon={<RiUserAddLine />}
      >
        Créer un utilisateur
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Créer un utilisateur</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserForm
              onSuccess={() => {
                router.push("/admin/users");
                onClose();
                toast({
                  title: "Utilisateur créé",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddUserModal;
