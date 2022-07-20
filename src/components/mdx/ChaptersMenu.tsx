import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useSocketContext } from "@/context/SocketContext";

export interface ChaptersMenuProps {
  course: string;
  currentChapter: string;
  chapters: string[];
}

const ChaptersMenu: React.FC<ChaptersMenuProps> = ({
  course,
  currentChapter,
  chapters,
}) => {
  const router = useRouter();
  const { pushSlide } = useSocketContext();

  const handleChapterClick = (chapter: string) => {
    pushSlide({
      course,
      chapter,
      slide: 0,
    });
    router.push({
      pathname: `/${course}/${chapter}`,
      query: {
        mode: router.query.mode,
      },
    });
  };

  return (
    <Flex
      flexDirection="column"
      height="100%"
      width="100%"
      overflow="auto"
      gridGap="xs"
    >
      <Heading padding="0" fontSize="md" textAlign="center">
        {course}
      </Heading>
      {chapters.map((chapter: string, i) => {
        const isActive = chapter === currentChapter;
        return (
          <Box
            key={chapter}
            bgColor="whiteAlpha.800"
            lineHeight="1.2rem"
            p="12px"
            borderRadius="md"
            boxShadow="xs"
            borderLeftWidth="6px"
            borderColor={isActive ? "primary.200" : "primary.50"}
            cursor="pointer"
            _hover={{
              boxShadow: "md",
              backgroundColor: "white",
              borderColor: "primary.300",
              transition:
                "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            }}
            onClick={() => handleChapterClick(chapter)}
          >
            <Text fontSize="0.8rem">Chapitre {i + 1}</Text>
            <Text fontWeight="bold" fontSize="1.5rem">
              {chapter.replace(/^[\d-]*\s*/, "")}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
};

export default ChaptersMenu;
