import { User } from ".prisma/client";
import { Button } from "@chakra-ui/button";
import { HStack, VStack, SimpleGrid, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SelectField from "../fields/SelectField";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "../fields/TextField";
import { Training } from "@prisma/client";
import CheckBoxFieldArray from "../fields/CheckBoxFieldArray";

type Props = {
  user?: User;
  courses?: Training[];
  onSuccess: () => void;
};

const UserForm = ({ user, courses, onSuccess }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();

  const getInitialValues = () => {
    if (user) {
      return {
        ...user,
        courses: courses?.map((course) => ({
          ...course,
          value: user?.courses.includes(course?.id),
        })),
      };
    }
    return {
      email: null,
      courses: courses?.map((course) => ({
        ...course,
        value: false,
      })),
    };
  };

  const schema = yup
    .object({
      name: yup.string().required("Ce champs est requis."),
      email: yup
        .string()
        .required("Ce champs est requis.")
        .email("L'email n'est pas valide."),
      role: yup.string().required("Ce champs est requis."),
    })
    .required();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: getInitialValues(),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    const courses = data?.courses?.map((course: Training) => course?.id);
    try {
      const response = await fetch(id ? `/api/users/` + id : `/api/users`, {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, courses }),
      });
      if (!response.ok) {
        response.json().then((text) => {
          toast({
            title: text.error,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
        methods.setError("email", {
          type: "custom",
          message: "Changer l'email",
        });
      } else {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {user && <input type="hidden" name="id" value={user.id} />}
        <VStack my="md">
          <TextField name="name" label="Nom" />
          <TextField name="email" label="Email" disabled={!!user} />

          <SelectField
            name="role"
            label="role"
            options={[
              { label: "Stagiaire", value: "trainee" },
              { label: "Formateur", value: "teacher" },
              { label: "Admin", value: "admin" },
            ]}
            disabled={!!user}
          />

          <HStack justifyContent="space-between" p="sm">
            <SimpleGrid columns={[2, 3]} spacing={2} width="100%">
              {
                // only students should be registered to courses
                courses && user && user?.role === "trainee" && (
                  <CheckBoxFieldArray
                    arrayName="courses"
                    labelFieldName="title"
                  />
                )
              }
            </SimpleGrid>
          </HStack>
          <Button
            type="submit"
            colorScheme="primary"
            variant="solid"
            marginLeft="xs"
            border="1px"
            fontSize="sm"
          >
            {user ? "Modifier" : "Créer"}
          </Button>
        </VStack>
      </form>
    </FormProvider>
  );
};

export default UserForm;
