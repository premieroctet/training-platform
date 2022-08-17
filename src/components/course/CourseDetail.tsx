import { Button, Box, Icon, Text, HStack, Image } from "@chakra-ui/react";
import router from "next/router";
import { MdFileDownload, MdPlayCircleOutline } from "react-icons/md";
import { CourseType } from "src/pages";
import { getCourseCover } from "src/utils/courses";
import CourseMapPreview from "../CourseMapPreview";

const CourseDetail = ({ course }: { course: CourseType }) => {
  return (
    <Box
      background="white"
      borderRadius="md"
      p={5}
      height="75vh"
      overflowY={"scroll"}
    >
      <Image
        height="300"
        width="100%"
        src={getCourseCover(course)}
        fit="cover"
      />
      <HStack paddingY={8} justifyContent="center">
        <Button
          variant="link"
          onClick={() => router.push(`/api/download?course=${course.title}`)}
          aria-label="download"
          disabled={!course?.hasPdf}
        >
          <Icon color="primary.500" as={MdFileDownload} />
          <Text fontSize="xs" color="black" paddingLeft="1">
            Télécharger le cours
          </Text>
        </Button>
        <Button
          onClick={() => router.push(`/${course.title}/${course.chapters[0]}`)}
          variant="link"
          aria-label="play"
        >
          <Icon color="primary.500" as={MdPlayCircleOutline} />
          <Text fontSize="xs" color="black" paddingLeft="1">
            Lancer le cours
          </Text>
        </Button>
      </HStack>
      <Text paddingY={10}>{course?.info?.description}</Text>
      {course?.courseMap && <CourseMapPreview course={course} />}
    </Box>
  );
};

export default CourseDetail;
