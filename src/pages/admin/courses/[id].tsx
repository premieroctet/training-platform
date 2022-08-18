import CourseForm from "@/components/course/CourseForm";
import Layout from "@/components/Layout";
import { Center, Flex, Heading, useBoolean } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { checkIsConnected } from "src/utils/auth";
import { inferSSRProps } from "@/lib/inferNextProps";
import prisma from "@/lib/prisma";
import path from "path";
import fs from "fs";
import EditCourseContent from "@/components/course/EditCourseContent";

const EditCourse = ({
  course,
  filename,
}: inferSSRProps<typeof getServerSideProps>) => {
  const [contentEditor, setContentEditor] = useBoolean(false);

  return (
    <Layout title="Cours">
      {contentEditor ? (
        <EditCourseContent filename={filename} />
      ) : (
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
              Éditer le Cours
            </Heading>
            <CourseForm
              course={course}
              setContentEditor={setContentEditor.toggle}
            />
          </Flex>
        </Center>
      )}
    </Layout>
  );
};

export default EditCourse;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await checkIsConnected(context);

  const id = context.params!.id as string;
  const course = await prisma.training.findUnique({
    where: {
      id,
    },
  });

  if (!course) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const chapters = fs
    .readdirSync(path.join(process.cwd(), "courses", `${course.courseFile}`))
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(".mdx", ""));

  const filename = path.join(`${course.courseFile}`, `${chapters[0]}.mdx`);

  return {
    props: { course, filename },
  };
}
