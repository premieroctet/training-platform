import CoursesTable from "@/components/course/CoursesTable";
import Layout from "@/components/Layout";
import { MessageData } from "@/components/users/Message";
import { inferSSRProps } from "@/lib/inferNextProps";
import prisma from "@/lib/prisma";
import { MdAddCircleOutline } from "react-icons/md";
import { Box, Button, Center, Heading, VStack, Text } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";

const LIMIT = 10;

const CoursesPage = ({ courses }: inferSSRProps<typeof getServerSideProps>) => {
  const router = useRouter();
  return (
    <Layout title="Cours">
      <Center mx={"auto"} my={"8"} borderWidth="1px" borderRadius={"md"}>
        <VStack
          p={10}
          background="white"
          width="container.sm"
          minH="60vh"
          spacing={10}
        >
          <Heading size="md" textAlign="center" paddingX="10">
            Liste des Cours
          </Heading>
          <Box>
            <Button
              colorScheme="primary"
              onClick={() => router.push("/admin/courses/create")}
              leftIcon={<MdAddCircleOutline size={24} />}
            >
              Ajouter un cours
            </Button>
          </Box>
          <Box>
            {courses?.length ? (
              <CoursesTable courses={courses} />
            ) : (
              <Text>Vous n'avez pas encore créé de cours</Text>
            )}
          </Box>
        </VStack>
      </Center>
    </Layout>
  );
};

export default CoursesPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  if ((session && !session.user?.isAdmin) || !session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let message: MessageData | null = null;

  const page = parseInt(context.query.page?.toString()) || 1;
  const coursesCount = await prisma.training.count();
  const maxPages = Math.ceil(coursesCount / LIMIT);
  const courses = await prisma.training.findMany({
    skip: page > 1 ? (page - 1) * LIMIT : 0,
    take: LIMIT,
    orderBy: {
      createdAt: "asc",
    },
  });
  return {
    props: { courses, maxPages, page, message },
  };
};
