import { Box, Flex, Heading, Text, Image, VStack } from "@chakra-ui/react";
import LoginButton from "../LoginButton";

const PublicHome = () => {
  return (
    <>
      <Flex
        flexDirection={["column", "row"]}
        maxW="container.lg"
        marginX="auto"
        paddingTop={20}
      >
        <VStack
          flex={1}
          p="md"
          justifyContent="center"
          alignItems={["center", "flex-start"]}
          spacing={6}
        >
          <Heading fontSize="2rem" fontWeight="500">
            Premier Octet Training Platform
          </Heading>
          <Text>
            Connectez vous à votre compte pour accéder à l'ensemble de vos cours
            sur la plateforme de formation
          </Text>
          <LoginButton variant="solid" />
        </VStack>
        <Box flex={2}>
          <Image
            height="500px"
            width="100%"
            src="/Home.png"
            fit="contain"
            alt="home"
          />
        </Box>
      </Flex>
    </>
  );
};

export default PublicHome;
