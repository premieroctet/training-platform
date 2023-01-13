import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import { CourseMetadata } from "src/pages/[course]/[chapter]";
import ChaptersMenu from "./ChaptersMenu";

export interface SideBarProps {
  course: CourseMetadata;
  currentChapter: string;
  chapters: string[];
  isOpen: boolean;
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  course,
  currentChapter,
  chapters,
  isOpen,
  onClose,
}) => {
  const print =
    process.browser &&
    window.location.search &&
    new URLSearchParams(window.location.search).get("print") !== null;

  return (
    (!print && (
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent p="xs" backgroundColor="#F6F6FA">
          <DrawerCloseButton onClick={() => onClose()} />
          <ChaptersMenu
            course={course}
            currentChapter={currentChapter}
            chapters={chapters}
          />
        </DrawerContent>
      </Drawer>
    )) ||
    null
  );
};

export default SideBar;
