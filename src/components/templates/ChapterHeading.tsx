import { Flex, Heading, FlexProps, Image, Box } from "@chakra-ui/react";

type ChapterHeadingProps = {
  imgSrc?: string;
  title: string;
  subtitle: string;
  bgGradientColors?: string[] | null;
  children?: any;
};

const ChapterHeading: React.FC<ChapterHeadingProps & FlexProps> = ({
  imgSrc,
  title,
  subtitle,
  ...rest
}) => {
  return (
    <Flex
      position="absolute"
      left={0}
      right={0}
      top={0}
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      {...rest}
    >
      <Flex position="absolute" minWidth="100%" height="100%">
        {imgSrc && <Image objectFit="cover" src={imgSrc} width="100%" alt="" />}
      </Flex>
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Box
          bgColor="#0000007A"
          backdropFilter="blur(2px)"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Heading
            p="0.25em"
            textAlign="center"
            width="80%"
            fontSize="2.4em"
            color="white"
            textShadow="0 0 2px black"
          >
            {title}
          </Heading>
          {subtitle && (
            <Heading
              p="0.25em"
              textAlign="center"
              width="80%"
              fontSize="1.3em"
              color="white"
              textShadow="1px 1px black"
            >
              {subtitle}
            </Heading>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default ChapterHeading;
