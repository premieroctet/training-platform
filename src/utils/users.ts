import { Session } from "next-auth";

export const getRoleLabel = (role: string) => {
  if (role === "teacher") {
    return "formateur";
  } else if (role == "trainee") {
    return "stagiaire";
  }
  return "admin";
};

export const isStaff = (session: Session | null) => {
  return session?.user && ["admin", "teacher"].includes(session?.user?.role);
};
