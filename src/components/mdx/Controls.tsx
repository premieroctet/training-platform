import { Button, IconButton, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { FullScreenHandle } from "react-full-screen";
import { BsFullscreen } from "react-icons/bs";
import { useSlidesContext } from "@/context/SlidesContext";
import { MdHome, MdMenu, MdRepeat } from "react-icons/md";
import { useRouter } from "next/router";

export interface ControlsProps {
  handleFullScreen: FullScreenHandle;
  toggleSideBar: () => void;
  isAdmin: Boolean;
}

const Controls: React.FC<ControlsProps> = ({
  handleFullScreen,
  toggleSideBar,
  isAdmin,
}) => {
  const { toggleFollowMode, currentMode } = useSlidesContext();
  const [showControls, setShowControls] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const listener = () => {
      setShowControls(true);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    };
    window.addEventListener("mousemove", listener);

    return () => {
      window.removeEventListener("mousemove", listener);
    };
  });

  return (
    <Flex
      className="slides-controls"
      position="absolute"
      justifyContent="flex-end"
      alignItems="baseline"
      width="100%"
      maxWidth="100vw"
      p="xs"
      fontSize="2.2rem"
      fontFamily={'-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto"'}
      opacity={showControls ? "1" : "0"}
      top="0"
      transition="opacity 0.4s ease-in-out"
      _hover={{
        opacity: "1",
      }}
    >
      <IconButton
        mr={2}
        aria-label="Chapters"
        onClick={toggleSideBar}
        variant="outline"
      >
        <MdMenu />
      </IconButton>
      <Flex gap="xs">
        {!isAdmin && (
          <Button
            colorScheme="red"
            variant="outline"
            p="sm"
            onClick={toggleFollowMode}
            cursor="pointer"
          >
            <MdRepeat style={{ marginRight: "0.5rem" }} />
            sync
          </Button>
        )}
        <Button
          colorScheme="gray"
          variant="outline"
          p="sm"
          onClick={
            handleFullScreen.active
              ? handleFullScreen.exit
              : handleFullScreen.enter
          }
          cursor="pointer"
        >
          <BsFullscreen />
        </Button>
        <Button
          colorScheme="gray"
          variant="outline"
          p="sm"
          onClick={() => {
            router.push("/");
          }}
        >
          <MdHome />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Controls;
