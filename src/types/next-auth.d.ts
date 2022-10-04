import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user?: {
      id?: string | null;
      name?: string | null;
      email: string | null;
      courses?: string[] | null;
      role: string;
      isAdmin: Boolean;
      image?: string | null;
    };
    expires?: string;
  }
  interface User {
    id: string;
    name?: string | null;
    email: string | null;
  }
}
