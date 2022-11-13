import { Session } from "next-auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export type SlideType = {
  course: string;
  chapter: string;
  slide: number | string;
};

type SocketContextValues = {
  pushSlide: (slide: SlideType) => void;
  user: Session["user"] | undefined;
};

export const SocketContext = createContext<SocketContextValues>({
  pushSlide: () => {},
  user: undefined,
});

type SocketProviderProps = {
  session: Session | null | undefined;
  children: any;
};

export function SocketProvider({ session, children }: SocketProviderProps) {
  const user = session?.user;
  const isAdmin = user?.role === "admin";
  const router = useRouter();
  const currentMode = router.query.mode;
  const followModeOn = currentMode === "follow" ?? false;

  const socketRef = useRef<Socket | undefined>();

  useEffect(() => {
    if (!isAdmin) {
      if (followModeOn) {
        socketRef.current = io();
        socketRef.current.on("slideChange", slideChange);
        socketRef.current.emit("getCurrentSlide");
      } else if (!followModeOn) {
        socketRef.current?.off("slideChange", slideChange);
        socketRef.current?.disconnect();
      }
    }
    if (isAdmin) {
      socketRef.current = io();
    }
  }, [currentMode]);

  useEffect(() => {
    const getCurrentSlide = () => {
      pushSlide({
        course: router.query.course.toString(),
        chapter: router.query.chapter.toString(),
        slide: router.query.slide?.toString() || 0,
      });
    };
    if (isAdmin) {
      socketRef.current?.on("getCurrentSlide", getCurrentSlide);
    }
    return () => {
      socketRef.current?.off("getCurrentSlide", getCurrentSlide);
    };
  }, [router.query]);

  const pushSlide = (slide: SlideType) => {
    if (isAdmin) {
      socketRef.current?.emit("slideChange", slide);
    }
  };

  const slideChange = ({ course, chapter, slide }: SlideType) => {
    router.push({
      pathname: "/[course]/[chapter]",
      query: {
        course,
        chapter,
        slide,
        mode: "follow",
      },
    });
  };

  return (
    <SocketContext.Provider value={{ pushSlide, user }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocketContext = () => useContext(SocketContext);
