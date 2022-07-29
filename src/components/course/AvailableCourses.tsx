import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { CourseType } from "src/pages";
import CourseCard from "../CourseCard";
import CourseDetail from "./CourseDetail";

const AvailableCourses = ({ courses }: { courses: CourseType[] }) => {
  const [selectecCourse, setSelectedCourse] = useState(0);
  const displayedCourse = courses[selectecCourse];

  return (
    <>
      <Text width="100%" fontWeight="bold" fontSize="md">
        {courses.length}{" "}
        {courses.length === 1 ? "cours disponible" : "cours disponibles"}
      </Text>

      <SimpleGrid columns={[1, 2]} spacing={10} width="100%">
        <Box overflowY="scroll" height="75vh" paddingRight={2} paddingY={4}>
          <Stack spacing={10}>
            {courses.map((course, key) => {
              return (
                <CourseCard
                  course={course}
                  key={key}
                  isSelected={selectecCourse === key}
                  handleSelect={setSelectedCourse}
                  index={key}
                />
              );
            })}
          </Stack>
        </Box>
        <CourseDetail course={displayedCourse} />
      </SimpleGrid>
    </>
  );
};

export default AvailableCourses;
