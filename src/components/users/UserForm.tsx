import { User } from ".prisma/client";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Checkbox, HStack, VStack, Text, SimpleGrid } from "@chakra-ui/react";

type Props = {
  user?: User;
  courses: string[];
};

const UserForm = ({ user, courses }: Props) => {
  return (
    <form method={"POST"}>
      {user && <input type="hidden" name="id" value={user.id} />}
      <VStack my="md">
        <SimpleGrid columns={[1, 2]} spacing={2}>
          <Input
            type="input"
            id="name"
            name="name"
            placeholder="prénom / pseudo"
            defaultValue={user ? user.name! : ""}
            fontSize="xs"
          />
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="adresse@email.fr"
            isRequired
            disabled={!!user?.email}
            defaultValue={user?.email ? user.email : undefined}
            readOnly={!!user?.email}
            fontSize="xs"
          />
        </SimpleGrid>
        <HStack justifyContent="space-between" p="sm">
          <SimpleGrid columns={[2, 3]} spacing={2} width="100%">
            {courses.map((course) => (
              <Checkbox
                key={course}
                name="courses"
                value={course}
                defaultChecked={user?.courses.includes(course)}
              >
                <Text fontSize="sm"> {course}</Text>
              </Checkbox>
            ))}
          </SimpleGrid>
        </HStack>
        <Button
          type="submit"
          colorScheme="secondary"
          variant="solid"
          marginLeft="xs"
          border="1px"
          fontSize="sm"
        >
          Sauvegarder
        </Button>
      </VStack>
    </form>
  );
};

export default UserForm;
