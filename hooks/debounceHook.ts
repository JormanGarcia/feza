import { useEffect, useState } from "react";

export function useDebounce(value: string, time: number, callback: () => void) {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(callback, time);

    setTimer(newTimer);
  }, [value]);
}
