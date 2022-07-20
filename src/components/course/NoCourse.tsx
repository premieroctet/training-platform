import { Text, Box, SimpleGrid, Stack } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import { CourseType } from "src/pages";
import CourseDetail from "./CourseDetail";

const NoCourse = ({ demoCourse }: { demoCourse: CourseType }) => {
  const [session, _] = useSession();
  return (
    <>
      <Text width="100%" fontWeight="bold" fontSize="1.2rem" textAlign="left">
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
              {session?.user?.isAdmin
                ? "Vous n'avez créé aucun cours pour le moment."
                : "Vous n'êtes inscrit à aucun cours pour le moment."}
            </Text>
            <Text textAlign="center">
              {session?.user?.isAdmin
                ? "Ajoutez un cours et inscrivez vos premiers stagiaires ou découvrez le tutoriel."
                : "Attendez l'invitation d'un instructeur pour obtenir vos accès et découvrez le tutoriel."}
            </Text>
          </Box>
        </Stack>

        <CourseDetail course={demoCourse} />
      </SimpleGrid>
    </>
  );
};

export default NoCourse;
