import { Flex, Heading } from "@chakra-ui/layout";

export interface SlideHeaderProps {
  slideTitle: string;
}

const SlideHeader: React.FC<SlideHeaderProps> = ({ slideTitle }) => {
  return (
    <Flex
      position="absolute"
      top="0"
      width="100%"
      p="1em"
      color="gray.400"
      bgColor="inherit"
      paddingLeft={16}
    >
      <Heading fontSize="0.8em" fontWeight="600">
        {slideTitle}
      </Heading>
    </Flex>
  );
};

export default SlideHeader;
