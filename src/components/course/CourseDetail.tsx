import {
  Button,
  Box,
  Icon,
  Text,
  HStack,
  Image,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import router from "next/router";
import { useState } from "react";
import { MdFileDownload, MdPlayCircleOutline } from "react-icons/md";
import { CourseType } from "src/pages";
import { getCourseCover } from "src/utils/courses";
import { ChapterInfo } from "./CourseForm";

const CourseDetail = ({ course }: { course: CourseType }) => {
  const [loadingPdf, setLoadingPdf] = useState(false);
  const chaptersInfo = course?.chaptersInfo as ChapterInfo[];
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
        alt="cover"
      />
      <HStack paddingY={8} justifyContent="center">
        <Button
          variant="link"
          onClick={async () => {
            setLoadingPdf(true);
            await router.push(`/api/download?id=${course.id!}`);
            setLoadingPdf(false);
          }}
          aria-label="download"
          disabled={!course?.isDownloadable}
          isLoading={loadingPdf}
        >
          <Icon color="primary.500" as={MdFileDownload} />
          <Text fontSize="xs" color="black" paddingLeft="1">
            Télécharger le cours
          </Text>
        </Button>
        <Button
          onClick={() => router.push(`/${course.slug}/0`)}
          variant="link"
          aria-label="play"
        >
          <Icon color="primary.500" as={MdPlayCircleOutline} />
          <Text fontSize="xs" color="black" paddingLeft="1">
            Lancer le cours
          </Text>
        </Button>
      </HStack>
      <Text paddingY={10}>{course?.description}</Text>
      <Text paddingTop={4} fontWeight="bold" fontSize="md" paddingBottom={4}>
        Plan du cours
      </Text>
      <UnorderedList>
        {chaptersInfo?.map(({ title, description }, idx) => (
          <ListItem key={idx}>
            <Text fontSize="sm" fontWeight="bold">
              {title}
            </Text>
            <Text fontSize="sm" paddingLeft={2} paddingBottom={2}>
              {description}
            </Text>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default CourseDetail;
