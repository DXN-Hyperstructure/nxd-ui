import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

const calculateTimeLeft = ({ targetDate }: CountdownProps) => {
  const difference = targetDate.getTime() - new Date().getTime();
  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  } else {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
};
export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft({ targetDate }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft({ targetDate }));
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <>
      {timeLeft.days}D / {timeLeft.hours}H / {timeLeft.minutes}M /{' '}
      {timeLeft.seconds}s
    </>
  );
};
