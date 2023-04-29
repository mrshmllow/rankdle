import pluralize from "pluralize";
import { useEffect, useState } from "react";

export default function CountDown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const utcNow = new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
      );

      const nextMidnight = new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 1
      );

      const timeLeftMs = nextMidnight.getTime() - utcNow.getTime();
      const timeLeftHours = Math.floor(timeLeftMs / (1000 * 60 * 60));
      const timeLeftMinutes = Math.floor(
        (timeLeftMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      const timeLeftSeconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: timeLeftHours,
        minutes: timeLeftMinutes,
        seconds: timeLeftSeconds,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <p>
      <span className="font-bold">
        {timeLeft.hours} {pluralize("hours", timeLeft.hours)},{"  "}
        {timeLeft.minutes} {pluralize("minutes", timeLeft.minutes)}, and{"  "}
        {timeLeft.seconds} {pluralize("seconds", timeLeft.seconds)}
      </span>{" "}
      until new clips! (UTC Midnight)
    </p>
  );
}
