import { Text, Box, SimpleGrid, Stack } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import { isStaff } from "src/utils/users";

const NoCourse = () => {
  const [session, _] = useSession();

  return (
    <>
      <Text width="100%" fontWeight="bold" fontSize="md" textAlign="left">
        0 cours disponibles
      </Text>
      <SimpleGrid columns={[1, 2]} spacing={10} width="100%">
        <Stack
          justifyContent="center"
          alignItems="center"
          maxH="75vh"
          paddingRight={2}
          paddingY={4}
        >
          <Box maxWidth="container.xs">
            <Text fontWeight="bold" textAlign="center">
              {isStaff(session)
                ? "Vous n'avez créé aucun cours pour le moment."
                : "Vous n'êtes inscrit à aucun cours pour le moment."}
            </Text>
            <Text textAlign="center">
              {isStaff(session)
                ? "Ajoutez un cours et inscrivez vos premiers stagiaires.."
                : "Attendez l'invitation d'un instructeur pour obtenir vos accès."}
            </Text>
          </Box>
        </Stack>
      </SimpleGrid>
    </>
  );
};

export default NoCourse;
