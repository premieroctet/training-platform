import CourseForm from "@/components/course/CourseForm";
import Layout from "@/components/Layout";
import { Center, Flex, Heading } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { checkIsConnected } from "src/utils/auth";
import { inferSSRProps } from "@/lib/inferNextProps";
import prisma from "@/lib/prisma";

const EditCourse = ({ course }: inferSSRProps<typeof getServerSideProps>) => {
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
          <CourseForm course={course} />
        </Flex>
      </Center>
    </Layout>
  );
};

export default EditCourse;

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
  }

  return {
    props: { course },
  };
}
