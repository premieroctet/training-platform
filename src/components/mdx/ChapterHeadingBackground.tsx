import { Flex } from "@chakra-ui/layout";

const directions = ["to-tl", "to-br", "to-bl", "to-tr"];
const bgGradientColors = ["blue", "pink", "orange", "purple"];

const ChapterDefaultBg: React.FC = ({}) => {
  const bgGradients = bgGradientColors.map((color, i) => {
    return `linear(${directions[i]}, ${color}.600, transparent 50% )`;
  });

  return (
    <Flex
      position="absolute"
      minHeight="100%"
      minWidth="100%"
      filter={`hue-rotate(${Math.random() * 360}deg)`}
    >
      {bgGradients.reverse().map((bg, i) => {
        return (
          <Flex
            key={i}
            position="absolute"
            minHeight="100%"
            minWidth="100%"
            bgRepeat="repeat"
            filter={`opacity(40%)`}
          >
            <Flex
              position="absolute"
              minHeight="100%"
              minWidth="100%"
              bgGradient={bg}
              filter={`hue-rotate(${Math.random() * 360}deg) opacity(100%)`}
              height="100%"
              width="100%"
            ></Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default ChapterDefaultBg;
