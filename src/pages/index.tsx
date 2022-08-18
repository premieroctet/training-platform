import ConnectedHome from "@/components/homes/ConnectedHome";
import PublicHome from "@/components/homes/PublicHome";
import prisma from "@/lib/prisma";
import { readdirSync } from "fs";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import path from "path";
import Layout from "../components/Layout";

export type CourseType = {
  chapters: string[];
  courseMap: string | null;
  id: string;
  title: string;
  description: string;
  courseFile?: string;
  isDownloadable?: boolean;
};

type Props = {
  session: Session | null | undefined;
  courses: CourseType[];
};

const Home = ({ session, courses }: Props) => {
  return (
    <Layout title="Formations Premier Octet">
      {session ? <ConnectedHome courses={courses} /> : <PublicHome />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const session = await getSession(context);
  const courses = await prisma.training.findMany();

  const coursesDirectory = path.join(process.cwd(), "courses");

  const allCourses = courses
    .map((course) => {
      const courseDirectory = path.join(coursesDirectory, course?.courseFile);
      const chapters = readdirSync(courseDirectory)
        .filter((name) => name.endsWith(".mdx"))
        .map((x) => x.replace(".mdx", ""));
      const courseMap =
        readdirSync(courseDirectory).find((name) => name.endsWith(".md")) ||
        null;

      return {
        chapters,
        courseMap,
        ...course,
      };
    })
    .filter(({ chapters }) => chapters.length > 0);

  const user = session?.user;
  const userCourses = allCourses.filter(({ title }) => {
    return user?.courses && user?.courses.includes(title);
  });

  return {
    props: {
      session,
      courses: user?.isAdmin ? allCourses : userCourses,
    },
  };
};

export default Home;
