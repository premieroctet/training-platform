import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSwipeable } from "react-swipeable";
import { CourseType } from "src/pages";
import { useSocketContext } from "./SocketContext";

type SlidesContextValues = {
  currentSlide: number;
  currentMode: string;
  setTotalSlides: Dispatch<SetStateAction<number | undefined>>;
  toggleFollowMode: () => void;
};

export const SlidesContext = createContext<SlidesContextValues>({
  currentSlide: 0,
  currentMode: "slideshow",
  setTotalSlides: () => {},
  toggleFollowMode: () => {},
});

type SlidesProviderProps = {
  children: any;
  course: CourseType;
  chapters: string[];
  chapter: string;
  isAdmin: Boolean;
};

type BroadcastPresenterMessage = {
  slide: number;
  course: CourseType;
  chapter: string;
};

export function SlidesProvider({
  children,
  course,
  chapters,
  chapter,
  isAdmin,
}: SlidesProviderProps) {
  const router = useRouter();
  const { pushSlide } = useSocketContext();
  const currentChapter: number = chapters.indexOf(chapter);
  const totalChapters = chapters.length;
  const [totalSlides, setTotalSlides] = useState<number | undefined>();
  const broadcastChannelRef = useRef<BroadcastChannel | undefined>(undefined);

  const currentSlide =
    process.browser && router.query.slide
      ? parseInt(router.query.slide as string)
      : 0;

  const currentMode =
    !router.query.mode || router.query.mode === "undefined"
      ? "slideshow"
      : router.query.mode.toString();

  useEffect(() => {
    // Backwards chapter navigation:
    // replaces 999 by last slide from current chapter
    if (totalSlides) {
      if (currentSlide === 999 || currentSlide > totalSlides - 1) {
        router.replace(
          {
            query: {
              course: course?.slug,
              chapter,
              slide: totalSlides - 1,
              mode: currentMode,
            },
          },
          undefined,
          { shallow: true }
        );
      }
    }
  }, [totalSlides, currentSlide]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (totalSlides) {
        if (currentSlide < totalSlides - 1) {
          slideNav(1);
        } else if (
          currentSlide >= totalSlides - 1 &&
          currentChapter < totalChapters - 1
        ) {
          chapterNav(1);
        }
      }
    },
    onSwipedRight: () => {
      if (currentSlide > 0) {
        slideNav(-1);
      } else if (currentSlide <= 0 && currentChapter > 0) {
        chapterNav(-1);
      }
    },
    // preventDefaultTouchmoveEven
  });

  const slideNav = (n: number) => {
    router.push(
      {
        query: {
          course: course?.slug,
          chapter,
          slide: currentSlide + n,
          mode: currentMode,
        },
      },
      undefined,
      { shallow: true }
    );
    if (isAdmin) {
      pushSlide({
        course: course?.slug,
        chapter: chapter,
        slide: currentSlide + n,
      });
    }
  };

  const toggleFollowMode = () => {
    router.push({
      query: {
        course: course?.slug,
        chapter,
        slide: currentSlide,
        mode: currentMode === "follow" ? "slideshow" : "follow",
      },
    });
  };

  const chapterNav = (n: number) => {
    setTotalSlides(undefined);
    router.push({
      pathname: "/[course]/[chapter]",
      query: {
        course: course?.slug,
        chapter: chapters[currentChapter + n],
        slide: n < 0 ? 999 : 0,
        mode: router.query.mode ?? "slideshow",
      },
    });
    if (isAdmin) {
      pushSlide({
        course: course?.slug,
        chapter: chapters[currentChapter + n],
        slide: n < 0 ? 999 : 0,
      });
    }
  };

  const keyboardNavHandler = (event: KeyboardEvent) => {
    if (event.altKey && event.code === "KeyP") {
      const nextMode = currentMode === "speaker" ? "slideshow" : "speaker";
      router.replace({
        query: {
          course: course?.slug,
          chapter,
          slide: currentSlide,
          mode: nextMode,
        },
      });
    }

    if (event.key === "ArrowLeft") {
      if (currentSlide > 0) {
        slideNav(-1);
      } else if (currentSlide <= 0 && currentChapter > 0) {
        chapterNav(-1);
      }
    }

    if (event.key === "ArrowRight" && totalSlides) {
      if (currentSlide < totalSlides - 1) {
        slideNav(1);
      } else if (
        currentSlide >= totalSlides - 1 &&
        currentChapter < totalChapters - 1
      ) {
        chapterNav(1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyboardNavHandler);
    return () => {
      window.removeEventListener("keydown", keyboardNavHandler);
    };
  });

  useEffect(() => {
    broadcastChannelRef.current = new BroadcastChannel("presenter");

    broadcastChannelRef.current.onmessage = (
      eventMessage: MessageEvent<BroadcastPresenterMessage>
    ) => {
      if (currentMode === "slideshow") {
        router.push({
          pathname: "/[course]/[chapter]",
          query: {
            course: eventMessage.data.course?.slug,
            chapter: eventMessage.data.chapter,
            slide: eventMessage.data.slide,
          },
        });
      }
    };

    return () => {
      broadcastChannelRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (currentMode === "speaker" && broadcastChannelRef.current) {
      broadcastChannelRef.current.postMessage({
        slide: currentSlide,
        course,
        chapter: chapters[currentChapter],
      } as BroadcastPresenterMessage);
    }
  }, [currentMode, currentSlide, currentChapter]);

  return (
    <SlidesContext.Provider
      value={{ currentSlide, currentMode, setTotalSlides, toggleFollowMode }}
    >
      <Box {...swipeHandlers}>{children}</Box>
    </SlidesContext.Provider>
  );
}

export const useSlidesContext = () => useContext(SlidesContext);
