import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "../fields/TextField";
import TextAreaField from "../fields/TextAreaInput";
import { Box, Button, Center, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SwitchField from "../fields/SwitchField";
import { Training } from "@prisma/client";
import { useSession } from "next-auth/client";
import { CopyIcon } from "@chakra-ui/icons";

interface ICourseFormProps {
  course?: Training;
}

const CourseForm = ({ course }: ICourseFormProps) => {
  const router = useRouter();
  const { id } = router.query;
  const [session, _] = useSession();

  const schema = yup
    .object({
      title: yup.string().required(),
      description: yup.string().required(),
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
          body: JSON.stringify({ ...data, userId: session?.user?.id }),
        });
      }
      await router.push("/admin/courses");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Center>
        {course && (
          <Button
            colorScheme="secondary"
            variant="solid"
            border="1px"
            fontSize="sm"
            mx="sm"
            leftIcon={<CopyIcon />}
            onClick={() =>
              router.push({
                pathname: "/admin/courses/[slug]/[chapterKey]",
                query: {
                  slug: course?.slug,
                  chapterKey: 0,
                },
              })
            }
          >
            Editer le contenu
          </Button>
        )}
      </Center>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6}>
            <TextField name="title" label="Titre du cours" />
            <TextAreaField name="description" label="Description courte" />
            <SwitchField
              name="isDownloadable"
              label="Autoriser le téléchargement PDF"
            />
            <Center>
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
