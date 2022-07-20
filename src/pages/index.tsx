import ConnectedHome from "@/components/homes/ConnectedHome";
import PublicHome from "@/components/homes/PublicHome";
import { readdirSync } from "fs";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import path from "path";
import Layout from "../components/Layout";

export type CourseType = {
  title: string;
  chapters: string[];
  courseMap: string | null;
};

type Props = {
  session: Session | null | undefined;
  courses: CourseType[];
  demoCourse: CourseType;
};

const Home = ({ session, courses, demoCourse }: Props) => {
  return (
    <Layout session={session} title="Formations Premier Octet">
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
  const coursesDirectory = path.join(process.cwd(), "courses");
  const allCourses = readdirSync(coursesDirectory)
    .filter((course) => {
      return course !== "assets" && course !== ".DS_Store";
    })
    .map((course) => {
      const courseDirectory = path.join(coursesDirectory, course);
      const chapters = readdirSync(courseDirectory)
        .filter((name) => name.endsWith(".mdx"))
        .map((x) => x.replace(".mdx", ""));
      const courseMap =
        readdirSync(courseDirectory).find((name) => name.endsWith(".md")) ||
        null;

      return { title: course, chapters, courseMap };
    })
    .filter(({ chapters }) => chapters.length > 0);

  const noDemoCourses = allCourses.filter(
    ({ title }) => !title?.toLowerCase().includes("demo")
  );

  const user = session?.user;
  const userCourses = noDemoCourses.filter(({ title }) => {
    user?.courses && user?.courses.includes(title);
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
      demoCourse: user?.isAdmin ? demoAdmin : demoUser,
    },
  };
};

export default Home;
