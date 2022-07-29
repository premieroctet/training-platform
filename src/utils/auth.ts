import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/client";

export const checkIsConnected = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);
  if ((session && !session.user?.isAdmin) || !session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
