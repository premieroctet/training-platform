import Layout from "@/components/Layout";
import Message, { MessageData } from "@/components/users/Message";
import UserForm from "@/components/users/UserForm";
import UsersPagination from "@/components/users/UsersPagination";
import UsersTable from "@/components/users/UsersTable";
import { inferSSRProps } from "@/lib/inferNextProps";
import prisma from "@/lib/prisma";
import { Center, Flex, Heading } from "@chakra-ui/react";
import { readdirSync } from "fs";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import { getSession } from "next-auth/client";
import { parseBody } from "next/dist/server/api-utils";
import path from "path";

const LIMIT = 10;

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

  const body = await parseBody(context.req as NextApiRequest, "1mb");
  let message: MessageData | null = null;

  if (context.req.method === "POST") {
    let success;
    try {
      await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          courses: body.courses,
        },
      });

      success = true;
    } catch (error) {
      console.log(error);
      success = false;
    }

    message = {
      message: success
        ? `${body.email} a été ajouté avec succès`
        : `${body.email} est déjà sur la liste`,
      type: success ? "success" : "error",
    };
  }

  if (context.req.method === "DELETE") {
    try {
      await prisma.user.delete({
        where: { id: body },
      });
      message = {
        message: `Utilisateur supprimé avec succès`,
        type: "success",
      };
    } catch (error) {
      throw new Error("Error adding new user");
    }
  }

  const page = parseInt(context.query.page?.toString()) || 1;
  const usersCount = await prisma.user.count();
  const maxPages = Math.ceil(usersCount / LIMIT);
  const users = await prisma.user.findMany({
    where: {
      isAdmin: false,
    },
    skip: page > 1 ? (page - 1) * LIMIT : 0,
    take: LIMIT,
    orderBy: {
      createdAt: "asc",
    },
  });
  const courses = readdirSync(path.join(process.cwd(), "courses")).filter(
    (course) => course !== "assets"
  );
  return {
    props: { session, users, maxPages, page, message, courses },
  };
};

const UsersPage = ({
  users,
  maxPages,
  page,
  message,
  courses,
}: inferSSRProps<typeof getServerSideProps>) => {
  return (
    <Layout title="Stagiaires | Formations Premier Octet">
      <Center mx={"auto"} my={"8"} borderWidth="1px" borderRadius={"md"}>
        <Flex
          direction={"column"}
          justifyContent={"center"}
          p="4"
          background="white"
        >
          <Heading
            size="md"
            textAlign="center"
            paddingBottom={20}
            paddingTop="5"
          >
            Stagiaires
          </Heading>
          <Message message={message} />
          <UsersTable users={users} />
          <UsersPagination maxPages={maxPages} page={page} limit={LIMIT} />
          <Heading size="sm" mt={4} textAlign="center" fontSize="md">
            Ajouter un stagiaire
          </Heading>
          <UserForm courses={courses} />
        </Flex>
      </Center>
    </Layout>
  );
};

export default UsersPage;
