import { Box, Stack, HStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { getCourseCover } from "src/utils/courses";
import { CourseType } from "src/pages";

export interface CourseCardProps {
  course: CourseType;
  isSelected: boolean;
  handleSelect: (courseKey: number) => void;
  index: number;
}

const CourseCard = ({
  course,
  isSelected,
  handleSelect,
  index,
}: CourseCardProps) => {
  return (
    <Box
      background="white"
      borderRadius="md"
      boxShadow="md"
      overflow="hidden"
      border="2px solid"
      borderColor={isSelected ? "primary.200" : "transparent"}
      _hover={
        !isSelected
          ? {
              opacity: "0.5",
            }
          : undefined
      }
      cursor="pointer"
      onClick={() => !isSelected && handleSelect(index)}
    >
      <HStack alignItems="flex-start">
        <Box flex={1}>
          <Image height="200" src={getCourseCover(course)} fit="cover" />
        </Box>

        <Stack p={4} alignItems="flex-start" flex={1}>
          <Text fontWeight="bold" fontSize={"md"}>
            {course.info?.title ?? course?.title}
          </Text>
          {course?.info?.description && (
            <Text fontWeight="400" noOfLines={4} fontSize="sm">
              {course?.info?.description}
            </Text>
          )}
        </Stack>
      </HStack>
    </Box>
  );
};

export default CourseCard;
