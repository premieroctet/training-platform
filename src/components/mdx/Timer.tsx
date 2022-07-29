import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { MdPause, MdPlayArrow, MdStop } from "react-icons/md";
import { useDeckTimer } from "@/context/DeckTimerContext";

export interface TimerProps {}

const ellapsedTime = (secs: number) => {
  const h = Math.floor(secs / (60 * 60));
  const divisor_for_minutes = secs % (60 * 60);
  const m = Math.floor(divisor_for_minutes / 60);
  const divisor_for_seconds = divisor_for_minutes % 60;
  const s = Math.ceil(divisor_for_seconds);

  const time = {
    hours: h < 10 ? `0${h}` : h,
    minutes: m < 10 ? `0${m}` : m,
    seconds: s < 10 ? `0${s}` : s,
  };

  return `${time.hours}:${time.minutes}:${time.seconds}`;
};

const Timer: React.FC<TimerProps> = () => {
  const { time, start, pause, reset, status } = useDeckTimer();

  return (
    <Flex
      fontSize="2em"
      fontFamily="monospace"
      justifyContent="flex-start"
      alignItems="center"
      gridGap="xs"
      m="xs"
    >
      {status === "RUNNING" ? (
        <Button colorScheme="primary" variant="outline" onClick={pause}>
          <MdPause />
        </Button>
      ) : (
        <Button colorScheme="green" variant="outline" onClick={start}>
          <MdPlayArrow />
        </Button>
      )}

      <Button colorScheme="red" variant="outline" onClick={reset}>
        <MdStop />
      </Button>
      <Box width="10ch" p="0 8px" fontWeight="700">
        {ellapsedTime(time)}
      </Box>
    </Flex>
  );
};

export default Timer;
