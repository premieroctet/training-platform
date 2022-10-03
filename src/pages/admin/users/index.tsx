import Layout from "@/components/Layout";
import AddUserModal from "@/components/users/AddUserModal";
import UsersTable from "@/components/users/UsersTable";
import { inferSSRProps } from "@/lib/inferNextProps";
import prisma from "@/lib/prisma";
import {
  Center,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { checkIsConnected } from "src/utils/auth";

const ManageUsers = ({
  admins,
  trainees,
  teachers,
}: inferSSRProps<typeof getServerSideProps>) => {
  const [session] = useSession();
  const router = useRouter();
  const { tab } = router.query;

  return (
    <Layout title="Stagiaires">
      <Center mx={"auto"} my={"8"} borderWidth="1px" borderRadius={"md"}>
        <VStack
          p={8}
          background="white"
          minW="60vw"
          spacing={8}
          alignItems="flex-start"
        >
          <Heading size="md" paddingTop="5">
            Gérer les utilisateurs
          </Heading>

          <Flex>
            <AddUserModal />
          </Flex>

          <VStack spacing={2}>
            <Tabs variant="enclosed" defaultIndex={tab ? +tab : 0}>
              <TabList>
                <Tab>
                  <Flex>Stagiaires</Flex>
                </Tab>
                {session?.user?.role === "admin" && (
                  <>
                    <Tab>
                      <Flex>Formateurs</Flex>
                    </Tab>
                    <Tab>
                      <Flex>Admins</Flex>
                    </Tab>
                  </>
                )}
              </TabList>

              <TabPanels>
                <TabPanel>
                  <UsersTable users={trainees} tab={0} />
                </TabPanel>
                <TabPanel>
                  <UsersTable users={teachers} tab={1} />
                </TabPanel>
                <TabPanel>
                  <UsersTable users={admins} tab={2} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </VStack>
      </Center>
    </Layout>
  );
};

export default ManageUsers;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const redirect = await checkIsConnected({ context, staffOnly: true });

  if (redirect) {
    return redirect;
  }
  const admins = await prisma.user.findMany({
    where: {
      role: "admin",
    },
  });

  const trainees = await prisma.user.findMany({
    where: {
      role: "trainee",
    },
    include: {
      trainings: true,
    },
  });

  const teachers = await prisma.user.findMany({
    where: {
      role: "teacher",
    },
  });

  return {
    props: {
      admins,
      trainees,
      teachers,
    },
  };
};
