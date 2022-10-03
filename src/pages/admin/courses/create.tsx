import CourseForm from "@/components/course/CourseForm";
import Layout from "@/components/Layout";
import { Center, Flex, Heading } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { checkIsConnected } from "src/utils/auth";
import useSWR from "swr";
import fetcher from "src/utils/fetcher";

const CreateCourse = () => {
  const { data } = useSWR("/api/courses", fetcher);
  //@ts-ignore
  const existingCourses = data?.map((course) => course?.slug);

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
          <CourseForm />
        </Flex>
      </Center>
    </Layout>
  );
};

export default CreateCourse;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const redirect = await checkIsConnected({ context, staffOnly: true });
  if (redirect) {
    return redirect;
  }
  return {
    props: {},
  };
}
