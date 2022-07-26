import { Button, ButtonProps } from "@chakra-ui/react";
import router from "next/router";

const LoginButton = (props: ButtonProps) => {
  return (
    <Button
      variant="outline"
      colorScheme="primary"
      fontSize={"xs"}
      onClick={() => router.push("/auth/signin")}
      borderRadius="25px"
      {...props}
    >
      Se connecter
    </Button>
  );
};

export default LoginButton;
