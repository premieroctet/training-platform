import { Box, Flex, Text } from "@chakra-ui/layout";
export interface FollowingFeedbackDotProps {
  isFollowing: Boolean;
}

const FollowingFeedbackDot: React.FC<FollowingFeedbackDotProps> = ({
  isFollowing,
}) => {
  return (
    (isFollowing && (
      <Flex
        position="fixed"
        top="xs"
        right="0"
        zIndex="20"
        alignItems="center"
        gridGap="xs"
        p="xs"
        opacity="0.4"
      >
        <Box
          width="20px"
          height="20px"
          borderRadius="100%"
          backgroundColor="red.500"
          boxShadow="xl"
        ></Box>
        <Text fontSize="xs" fontWeight="600">
          live
        </Text>
      </Flex>
    )) ||
    null
  );
};

export default FollowingFeedbackDot;
