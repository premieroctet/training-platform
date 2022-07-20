import Layout from "@/components/Layout";
import { EmailIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getCsrfToken, signIn } from "next-auth/client";
import { AiFillGithub } from "react-icons/ai";

type Props = {
  csrfToken: string | null;
};

export default function SignIn({ csrfToken }: Props) {
  return (
    <Layout title="Formations Premier Octet">
      <Center flexDirection="column" py="auto" h={["100%", "auto"]}>
        <Stack
          margin={["auto", "xl", "2xl"]}
          p={10}
          bg="white"
          borderRadius="md"
          boxShadow="lg"
        >
          <Text fontSize={"md"} paddingBottom="5">
            Connexion
          </Text>
          <form method="post" action="/api/auth/signin/email">
            <FormControl>
              <FormLabel fontSize="xs" fontWeight={"medium"}>
                Entrez votre adresse e-mail
              </FormLabel>
              {csrfToken && (
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
              )}
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="adresse@email.fr"
                isRequired
                fontSize={"xs"}
              />
              <FormHelperText marginLeft="sm" fontSize="12px">
                Ex: marie@free.fr
              </FormHelperText>
              <FormErrorMessage>Entrez votre adresse e-mail</FormErrorMessage>
            </FormControl>
            <Button
              leftIcon={<EmailIcon />}
              type="submit"
              colorScheme="primary"
              my="sm"
              fontSize={"xs"}
            >
              Recevoir mail d'authentification
            </Button>
          </form>
          <Button
            leftIcon={<AiFillGithub />}
            variant="outline"
            colorScheme="primary"
            size="md"
            my="md"
            fontSize={"sm"}
            onClick={() => signIn("github")}
          >
            <Text fontSize="1rem" ml="10px">
              GitHub
            </Text>
          </Button>
        </Stack>
        <Text m="0" color="gray.300" fontSize="2xs">
          Premier Octet Training
        </Text>
      </Center>
    </Layout>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
};
