import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import prisma from "../../../lib/prisma";

interface GithubUserEmails {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}

export default NextAuth({
  providers: [
    Providers.Email({
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
    /*Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "user:email,email:primary",
      // @ts-ignore
      profile: async (profile, tokens) => {
        let userEmail;
        if (!profile.email) {
          const response = await fetch(`https://api.github.com/user/emails`, {
            headers: { authorization: `Bearer ${tokens.accessToken}` },
          });
          const data: GithubUserEmails[] = await response.json();
          userEmail = data.find((user) => user.primary)?.email as string;
        }
        // @ts-ignore
        const userId = profile.id.toString();
        return {
          id: userId,
          name: profile.name || profile.login,
          email: profile.email || userEmail,
          image: profile.avatar_url,
        }; // Returns the profile in a shape that is different from the built-in one.
      },
    }),*/
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/signin",
  },
  events: {
    // @ts-ignore
    async linkAccount(data) {
      const { user, providerAccount } = data;
      if (!user.email) {
        const response = await fetch(`https://api.github.com/user/emails`, {
          headers: { authorization: `Bearer ${providerAccount.accessToken}` },
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
    // @ts-ignore
    redirect: async (url, baseUrl) => {
      return Promise.resolve(baseUrl);
    },
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
        session.user = user;
      }
      return session;
    },
  },
});
