// src/ui/hooks/useCountdown.ts
import { Task } from "@/src/domain/task/models/task";
import { useState, useEffect } from "react";

export const useCountdown = (selectedTask: Task | null): string | null => {
  const [countdown, setCountdown] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (selectedTask) {
      const updateCountdown = () => {
        const now = new Date();
        const taskDate = new Date(selectedTask.dateTime);
        const timeDiff = taskDate.getTime() - now.getTime();

        if (timeDiff <= 300000 && timeDiff > 0) {
          // 5 minutos = 300000 ms
          const minutes = Math.floor(timeDiff / 60000);
          const seconds = Math.floor((timeDiff % 60000) / 1000);
          setCountdown(
            `${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`
          );
        } else if (timeDiff <= 0) {
          setCountdown("00:00");
          clearInterval(intervalId);
        } else {
          setCountdown(null);
        }
      };

      updateCountdown();
      intervalId = setInterval(updateCountdown, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [selectedTask]);

  return countdown;
};
