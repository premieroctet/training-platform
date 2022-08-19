import Layout from "@/components/Layout";
import { Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Unauthoried() {
  return (
    <Layout title="Training Platform">
      <Center flexDirection="column" py="auto" h={["100%", "auto"]}>
        <Stack
          margin={["auto", "xl", "2xl"]}
          p={["sm", "md", "lg"]}
          bg="gray.100"
          borderRadius="md"
        >
          <Box mb="md">
            <Heading mb="sm" fontSize={["xs", "sm", "md"]}>
              Vous n'êtes pas inscrit à cette formation !
            </Heading>
            <Text fontSize={["12px", "xs", "sm"]}>
              Veuillez réessayer avec une autre adresse email, <br />
              ou contacter l'organisateur
            </Text>
          </Box>
          <Button
            colorScheme="secondary"
            variant="outline"
            fontSize={["2xs", "xs", "sm", "md"]}
          >
            <Link href="/auth/signin">Se connecter</Link>
          </Button>
        </Stack>
      </Center>
    </Layout>
  );
}
