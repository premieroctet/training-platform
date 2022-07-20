import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useSocketContext } from "@/context/SocketContext";

export interface SpeakerFooterProps {}

const SpeakerFooter: React.FC<SpeakerFooterProps> = () => {
  const { user } = useSocketContext();
  const username = user?.name ?? user?.email;

  const [dayTime, setDayTime] = useState<string>();
  const dateTimeToString = (date: Date) => {
    setDayTime(
      date
        .toLocaleTimeString("fr", {
          day: "2-digit",
          year: "numeric",
          month: "long",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(", ", " - ")
    );
  };

  useEffect(() => {
    const date = new Date();
    dateTimeToString(date);
    let interval = setInterval(dateTimeToString, 1000, date);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box fontSize="1.4em" fontFamily="monospace" color="gray.500">
      {username} - {dayTime}
    </Box>
  );
};

export default SpeakerFooter;
