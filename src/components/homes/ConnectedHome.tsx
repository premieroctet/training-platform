import { Box, Text, VStack } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import { CourseType } from "src/pages";
import AvailableCourses from "../course/AvailableCourses";
import NoCourse from "../course/NoCourse";

const ConnectedHome = ({
  courses,
  demoCourse,
}: {
  courses: CourseType[];
  demoCourse?: CourseType;
}) => {
  const [session, _] = useSession();

  return (
    <Box paddingY={30} width="90vw" maxWidth="container.xl" marginX="auto">
      <VStack spacing={3}>
        <Text width="100%" fontSize={"xl"} textAlign="left">
          Bienvenue {session?.user?.name}
        </Text>

        {courses?.length > 0 ? (
          <AvailableCourses courses={courses} />
        ) : (
          <NoCourse demoCourse={demoCourse} />
        )}
      </VStack>
    </Box>
  );
};

export default ConnectedHome;
