import CourseForm from "@/components/course/CourseForm";
import Layout from "@/components/Layout";
import { Center, Flex, Heading } from "@chakra-ui/react";
import { readdirSync, statSync } from "fs";
import { GetServerSidePropsContext } from "next";
import { checkIsConnected } from "src/utils/auth";
import path from "path";
import { inferSSRProps } from "@/lib/inferNextProps";
import useSWR from "swr";
import fetcher from "src/utils/fetcher";

const CreateCourse = ({
  courses,
}: inferSSRProps<typeof getServerSideProps>) => {
  const { data } = useSWR("/api/courses", fetcher);
  //@ts-ignore
  const existingCourses = data?.map((course) => course?.courseFile);

  return (
    <Layout title="Créer un cours">
      <Center mx={"auto"} my={"8"} borderWidth="1px" borderRadius={"md"}>
        <Flex
          p={10}
          direction={"column"}
          justifyContent={"center"}
          background="white"
          width="container.sm"
        >
          <Heading
            size="md"
            textAlign="center"
            paddingBottom={20}
            paddingTop="5"
          >
            Créer un cours
          </Heading>
          <CourseForm
            availableCourses={courses.filter(
              (course) => !existingCourses?.includes(course)
            )}
          />
        </Flex>
      </Center>
    </Layout>
  );
};

export default CreateCourse;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const coursesDirectory = path.join(process.cwd(), "courses");
  const courses = readdirSync(coursesDirectory).filter((course) => {
    const courseDirectory = path.join(coursesDirectory, course);
    if (!statSync(courseDirectory).isDirectory() || course === "assets") {
      return false;
    }
    return true;
  });

  await checkIsConnected(context);
  return {
    props: {
      courses,
    },
  };
}
