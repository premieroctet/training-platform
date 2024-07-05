import ConnectedHome from "@/components/homes/ConnectedHome";
import PublicHome from "@/components/homes/PublicHome";
import prisma from "@/lib/prisma";
import { Training, User } from "@prisma/client";
import { readdirSync, existsSync } from "fs";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import path from "path";
import Layout from "../components/Layout";

export interface CourseType extends Training {
  chapters: string[];
  courseMap: string | null;
  author: User;
}

type Props = {
  session: Session | null | undefined;
  courses: CourseType[];
};

const Home = ({ session, courses }: Props) => {
  return (
    <Layout title="Training Platform">
      {session ? <ConnectedHome courses={courses} /> : <PublicHome />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const session = await getSession(context);
  const courses = await prisma.training.findMany({ include: { author: true } });

  const coursesDirectory = path.join(process.cwd(), "courses");

  const allCourses = courses
    .filter((course) => {
      const courseDirectory = path.join(coursesDirectory, course?.slug);
      return existsSync(courseDirectory);
    })
    .map((course) => {
      const courseDirectory = path.join(coursesDirectory, course?.slug);
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
  let userCourses = allCourses;

  if (user?.role === "trainee") {
    userCourses = allCourses.filter(({ slug }) => {
      return user?.courses && user?.courses.includes(slug);
    });
  }
  if (user?.role === "teacher") {
    // Teachers only have access to their courses
    userCourses = allCourses.filter((course) => {
      return course?.userId === user?.id;
    });
  }

  return {
    props: {
      session,
      courses: userCourses,
    },
  };
};

export default Home;
