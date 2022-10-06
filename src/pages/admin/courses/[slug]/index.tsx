import CourseForm from "@/components/course/CourseForm";
import Layout from "@/components/Layout";
import { Center, Flex, Heading } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { checkIsConnected } from "src/utils/auth";
import { inferSSRProps } from "@/lib/inferNextProps";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

const EditCourse = ({
  course,
  chaptersCount,
}: inferSSRProps<typeof getServerSideProps>) => {
  return (
    <Layout title="Cours">
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
          <CourseForm course={course} chaptersCount={chaptersCount} />
        </Flex>
      </Center>
    </Layout>
  );
};

export default EditCourse;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let chaptersCount = 0;
  const redirect = await checkIsConnected({ context, staffOnly: true });
  if (redirect) {
    return redirect;
  }

  const slug = context.params!.slug as string;
  const course = await prisma.training.findUnique({
    where: {
      slug,
    },
  });

  if (!course) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  } else {
    chaptersCount = fs
      .readdirSync(path.join(process.cwd(), "courses", `${course.slug}`))
      .filter((name) => name.endsWith(".mdx"))?.length;
  }

  return {
    props: { course, chaptersCount },
  };
}
