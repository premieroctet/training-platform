import {
  HStack,
  IconButton,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import ConfirmButton from "../ConfirmButton";
import { MdClose, MdEdit, MdVisibility } from "react-icons/md";

interface ICoursesTableProps {
  courses: any[];
}

const CoursesTable = ({ courses }: ICoursesTableProps) => {
  const router = useRouter();

  const deleteCourse = async (id: string) => {
    try {
      await fetch(`/api/courses/` + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      await router.push("/admin/courses");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>titre</Th>
          <Th>description</Th>
          <Th>slug</Th>
          <Th>formateur</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {courses.map((course, key) => (
          <Tr key={key}>
            <Td>{course?.title}</Td>
            <Td>
              <Text noOfLines={4}>{course?.description}</Text>
            </Td>
            <Td>{course?.slug}</Td>
            <Td>{course?.author?.email}</Td>
            <Td justifyContent="flex-end">
              <HStack>
                <Tooltip label="Voir le cours">
                  {/* @ts-expect-error */}
                  <IconButton
                    size="sm"
                    aria-label="View"
                    as={Link}
                    href={`/${course.slug}/0`}
                  >
                    <MdVisibility />
                  </IconButton>
                </Tooltip>
                <Tooltip label="Éditer les infos">
                  <IconButton
                    size="sm"
                    aria-label="Edit info"
                    as={Link}
                    href={`/admin/courses/${course.slug}`}
                  >
                    <MdEdit />
                  </IconButton>
                </Tooltip>
                <ConfirmButton
                  label="Supprimer le cours"
                  confirmDetail="Êtes-vous sûrs de vouloir supprimer ce cours?"
                  colorScheme="red"
                  icon={<MdClose />}
                  onConfirm={() => {
                    deleteCourse(course?.id);
                  }}
                  size="xs"
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CoursesTable;
