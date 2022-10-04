import Layout from "@/components/Layout";
import Message from "@/components/users/Message";
import UserForm from "@/components/users/UserForm";
import { inferSSRProps } from "@/lib/inferNextProps";
import prisma from "@/lib/prisma";
import { Center, Flex, Heading, useToast } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { checkIsConnected } from "src/utils/auth";

export type Message = {
  type: "success" | "warning" | "error";
  message: string;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const redirect = await checkIsConnected({ context });
  if (redirect) {
    return redirect;
  }
  const session = await getSession(context);
  const id = context.params!.id as string;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const courses =
    session?.user?.role === "admin"
      ? await prisma.training.findMany()
      : await prisma.training.findMany({
          where: {
            userId: session?.user?.id!,
          },
        });

  return {
    props: { user, courses },
  };
};

const EditUserPage = ({
  user,
  courses,
}: inferSSRProps<typeof getServerSideProps>) => {
  const router = useRouter();
  const { tab } = router.query;
  const toast = useToast();
  return (
    <Layout title="Stagiaires">
      <Center
        mx={"auto"}
        my={"8"}
        borderWidth="1px"
        borderRadius={"md"}
        background="white"
        minW="60vw"
      >
        <Flex direction={"column"} justifyContent={"center"} p="4">
          <Heading size="md" textAlign="center" fontSize="lg" paddingTop={10}>
            Modifier l'utilisateur
          </Heading>
          <UserForm
            user={user}
            courses={courses}
            onSuccess={() => {
              toast({
                title: "Utilisateur modifié",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              router.push(`/admin/users?tab=${tab}`);
            }}
          />
        </Flex>
      </Center>
    </Layout>
  );
};

export default EditUserPage;
