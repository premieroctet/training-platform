import ConnectedHome from "@/components/homes/ConnectedHome";
import PublicHome from "@/components/homes/PublicHome";
import prisma from "@/lib/prisma";
import { readdirSync, statSync } from "fs";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import path from "path";
import Layout from "../components/Layout";

export type CourseType = {
  title: string;
  chapters: string[];
  courseMap: string | null;
  info?: {
    title: string;
    description: string;
    courseFile?: string;
  };
};

type Props = {
  session: Session | null | undefined;
  courses: CourseType[];
  demoCourse?: CourseType;
};

const Home = ({ session, courses, demoCourse }: Props) => {
  return (
    <Layout title="Formations Premier Octet">
      {session ? (
        <ConnectedHome courses={courses} demoCourse={demoCourse} />
      ) : (
        <PublicHome />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const session = await getSession(context);
  const coursesInfo = await prisma.training.findMany();

  const coursesDirectory = path.join(process.cwd(), "courses");

  const allCourses = readdirSync(coursesDirectory)
    .filter((course) => {
      const courseDirectory = path.join(coursesDirectory, course);
      if (!statSync(courseDirectory).isDirectory() || course === "assets") {
        return false;
      }
      return true;
    })
    .map((course) => {
      const courseDirectory = path.join(coursesDirectory, course);
      const chapters = readdirSync(courseDirectory)
        .filter((name) => name.endsWith(".mdx"))
        .map((x) => x.replace(".mdx", ""));
      const courseMap =
        readdirSync(courseDirectory).find((name) => name.endsWith(".md")) ||
        null;

      const courseInfo = coursesInfo.find((el) => el?.courseFile === course);

      return {
        title: course,
        chapters,
        courseMap,
        info: courseInfo,
      };
    })
    .filter(({ chapters }) => chapters.length > 0);

  const noDemoCourses = allCourses.filter(
    ({ title }) => !title?.toLowerCase().includes("demo")
  );

  const user = session?.user;
  const userCourses = noDemoCourses.filter(({ title }) => {
    return user?.courses && user?.courses.includes(title);
  });
  const demoAdmin = allCourses.find((course) => {
    return course.title === "Demo Admin";
  })!;
  const demoUser = allCourses.find((course) => course.title === "Demo User")!;
  const authorizedCourses = user?.isAdmin ? noDemoCourses : userCourses;

  return {
    props: {
      session,
      courses: authorizedCourses,
      demoCourse: user?.isAdmin ? demoAdmin : demoUser ?? null,
    },
  };
};

export default Home;
