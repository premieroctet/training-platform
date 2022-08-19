import { Button } from "@chakra-ui/button";
import { CloseButton } from "@chakra-ui/close-button";
import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import { Slide as ChakraAnimationSlide } from "@chakra-ui/transition";
import { useWindowSize } from "@react-hook/window-size/throttled";
import Link from "next/link";
import { MdHome } from "react-icons/md";
import { CourseType } from "src/pages";
import ChaptersMenu from "./ChaptersMenu";

export interface SideBarProps {
  course: CourseType;
  currentChapter: string;
  chapters: string[];
  showSideBar: boolean;
  setSideBar: any;
}

const SideBar: React.FC<SideBarProps> = ({
  course,
  currentChapter,
  chapters,
  showSideBar,
  setSideBar,
}) => {
  const [width] = useWindowSize({ fps: 15 });
  const print =
    process.browser &&
    window.location.search &&
    new URLSearchParams(window.location.search).get("print") !== null;

  return (
    (!print && (
      <ChakraAnimationSlide
        direction="left"
        in={showSideBar}
        style={{
          position: showSideBar && width >= 1800 ? "relative" : "absolute",
          margin: 0,
          padding: 0,
          zIndex: 10,
          width: "min-content",
        }}
      >
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          minWidth="240px"
          width="20vw"
          maxWidth="420px"
          height="100%"
          flex="min-content 0 1"
          m="0"
          p="xs"
          fontSize="3rem"
          backgroundColor="#F6F6FA"
          borderRightRadius="md"
        >
          <Flex justifyContent="space-between">
            <Link href="/">
              <Button size="lg" variant="ghost" colorScheme="blackAlpha">
                <Icon as={MdHome} />
              </Button>
            </Link>
            <CloseButton
              size="lg"
              variant="ghost"
              colorScheme="blackAlpha"
              onClick={setSideBar.off}
            />
          </Flex>
          <ChaptersMenu
            course={course}
            currentChapter={currentChapter}
            chapters={chapters}
          />
        </Flex>
      </ChakraAnimationSlide>
    )) ||
    null
  );
};

export default SideBar;
