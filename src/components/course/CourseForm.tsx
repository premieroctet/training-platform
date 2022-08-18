import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "../fields/TextField";
import TextAreaField from "../fields/TextAreaInput";
import { Box, Button, Center, HStack, Stack, Text } from "@chakra-ui/react";
import SelectField from "../fields/SelectField";
import { useRouter } from "next/router";
import SwitchField from "../fields/SwitchField";

interface ICourseFormProps {
  course?: any;
  availableCourses?: string[];
  setContentEditor?: (bool: boolean) => any;
}

const CourseForm = ({
  course,
  availableCourses,
  setContentEditor,
}: ICourseFormProps) => {
  const router = useRouter();
  const { id } = router.query;

  const schema = yup
    .object({
      title: yup.string().required(),
      description: yup.string().required(),
      courseFile: yup.string().required(),
    })
    .required();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: course ?? {},
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    try {
      if (id) {
        // Update
        await fetch(`/api/courses/` + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        // Create
        await fetch(`/api/courses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      await router.push("/admin/courses");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6}>
            {course && (
              <HStack>
                <Text fontWeight="bold">Fichier de cours: </Text>
                <Text>{course?.courseFile} </Text>
              </HStack>
            )}
            <TextField name="title" label="Titre du cours" />
            <TextAreaField name="description" label="Description courte" />
            <SwitchField
              name="isDownloadable"
              label="Autoriser le téléchargement PDF"
            />
            {availableCourses && (
              <SelectField
                name="courseFile"
                label="Fichier cours"
                options={availableCourses.map((courseName: any) => ({
                  label: courseName,
                  value: courseName,
                }))}
              />
            )}
            <Center>
              <Button
                type="submit"
                colorScheme="orange"
                variant="solid"
                border="1px"
                fontSize="sm"
                mx="sm"
                onClick={() => setContentEditor!(true)}
              >
                Editer le contenu
              </Button>
              <Button
                type="submit"
                colorScheme="primary"
                variant="solid"
                border="1px"
                fontSize="sm"
                mx="sm"
              >
                Valider
              </Button>
            </Center>
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default CourseForm;
