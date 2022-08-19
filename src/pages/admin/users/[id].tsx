import Layout from "@/components/Layout";
import Message from "@/components/users/Message";
import UserForm from "@/components/users/UserForm";
import { inferSSRProps } from "@/lib/inferNextProps";
import prisma from "@/lib/prisma";
import { Center, Flex, Heading } from "@chakra-ui/react";
import { readdirSync } from "fs";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import { getSession } from "next-auth/client";
import { parseBody } from "next/dist/server/api-utils";
import path from "path";

export type Message = {
  type: "success" | "warning" | "error";
  message: string;
};

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

  // Update user
  const courses = readdirSync(path.join(process.cwd(), "courses")).filter(
    (course) => course !== "assets"
  );
  const body = await parseBody(context.req as NextApiRequest, "1mb");
  let message: Message | null = null;

  if (context.req.method === "POST") {
    let success;
    try {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          name: body.name,
          email: body.email,
          courses: body.courses,
        },
      });

      context.res.writeHead(301, {
        Location: "/admin/users",
      });
      context.res.end();
    } catch (error) {
      success = false;
    }

    message = {
      message: success
        ? `${body.email} a été mis à jour avec succès`
        : `Erreur lors de la mise à jour de l'utilisateur`,
      type: success ? "success" : "error",
    };
  }

  return {
    props: { session, user, message, courses },
  };
};

const EditUserPage = ({
  user,
  message,
  courses,
}: inferSSRProps<typeof getServerSideProps>) => {
  return (
    <Layout title="Stagiaires">
      <Center
        mx={"auto"}
        my={"8"}
        borderWidth="1px"
        borderRadius={"md"}
        background="white"
      >
        <Flex direction={"column"} justifyContent={"center"} p="4">
          <Heading size="md" textAlign="center" fontSize="lg" paddingTop={10}>
            Utilisateur {user.email}
          </Heading>
          <Message message={message} />
          <UserForm user={user} courses={courses} />
        </Flex>
      </Center>
    </Layout>
  );
};

export default EditUserPage;
