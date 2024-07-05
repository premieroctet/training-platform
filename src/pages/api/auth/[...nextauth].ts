import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "../../../lib/prisma";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";

interface GithubUserEmails {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}

export default NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST!,
        auth: {
          user: process.env.SMTP_USER!,
          pass: process.env.SMTP_PASSWORD!,
        },
        port: +process.env.SMTP_PORT!,
      },
      from: process.env.EMAIL_FROM,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      // @ts-expect-error
      scope: "user:email,email:primary",
      profile: async (profile, tokens) => {
        let userEmail;
        if (!profile.email) {
          const response = await fetch(`https://api.github.com/user/emails`, {
            headers: { authorization: `Bearer ${tokens.accessToken}` },
          });
          const data: GithubUserEmails[] = await response.json();
          userEmail = data.find((user) => user.primary)?.email as string;
        }
        const userId = profile.id.toString();
        return {
          id: userId,
          name: profile.name || profile.login,
          email: profile.email || userEmail,
          image: profile.avatar_url,
        }; // Returns the profile in a shape that is different from the built-in one.
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/signin",
  },
  events: {
    async linkAccount(data) {
      const { user, account } = data;
      if (!user.email) {
        const response = await fetch(`https://api.github.com/user/emails`, {
          headers: { authorization: `Bearer ${account.accessToken}` },
        });
        const json: GithubUserEmails[] = await response.json();
        const userEmail = json.find((user) => user.primary)?.email as string;
        prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            email: userEmail,
          },
        });
      }
    },
  },
  callbacks: {
    // @ts-expect-error
    async session(session) {
      const user =
        session.user?.email &&
        (await prisma.user.findFirst({
          where: {
            email: session.user?.email,
          },
          select: {
            id: true,
            name: true,
            email: true,
            courses: true,
            role: true,
            image: true,
          },
        }));

      if (user) {
        // @ts-expect-error
        session.user = user;
      }

      return session;
    },
  },
});
