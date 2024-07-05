import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { isStaff } from "./users";

export const checkIsConnected = async ({
  context,
  staffOnly,
}: {
  context: GetServerSidePropsContext;
  staffOnly?: boolean;
}) => {
  const session = await getSession(context);

  if ((staffOnly && !isStaff(session)) || !session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
