import { Flex, Heading, FlexProps, Image } from "@chakra-ui/react";
import DefaultBackground from "./ChapterHeadingBackground";

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
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      {...rest}
    >
      <Flex position="absolute" minWidth="100%" height="100%">
        {imgSrc && (
          <Image objectFit="cover" src={imgSrc} width="100%" alt="heading" />
        )}
        {!imgSrc && <DefaultBackground />}
      </Flex>
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Heading
          p="0.25em"
          textAlign="center"
          width="80%"
          fontSize="2.4em"
          color="white"
          bgColor="#0000007A"
          backdropFilter="blur(2px)"
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
            bgColor="#0000007A"
            backdropFilter="blur(2px)"
            textShadow="1px 1px black"
          >
            {subtitle}
          </Heading>
        )}
      </Flex>
    </Flex>
  );
};

export default ChapterHeading;
