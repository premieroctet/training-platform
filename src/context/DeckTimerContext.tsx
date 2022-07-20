import { createContext, ReactNode, useContext } from "react";
import { useTimer } from "use-timer";
import { ReturnValue } from "use-timer/lib/types";

export const DeckTimerContext = createContext<ReturnValue>({
  time: 0,
  start: () => {},
  pause: () => {},
  reset: () => {},
  status: "STOPPED",
  advanceTime: () => {},
});

type DeckTimerContextProviderProps = {
  children: ReactNode;
};

export default function DeckTimerContextProvider({
  children,
}: DeckTimerContextProviderProps) {
  const { time, start, pause, reset, status, advanceTime } = useTimer();

  return (
    <DeckTimerContext.Provider
      value={{ time, start, pause, reset, status, advanceTime }}
    >
      {children}
    </DeckTimerContext.Provider>
  );
}

export const useDeckTimer = () => useContext(DeckTimerContext);
