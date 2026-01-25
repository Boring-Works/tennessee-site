"use client";

import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-07-04T00:00:00-04:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const difference = TARGET_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function CountdownUnit({
  value,
  label,
  isSeconds = false,
}: {
  value: number;
  label: string;
  isSeconds?: boolean;
}) {
  return (
    <div className="text-center">
      <div
        className={`font-serif text-3xl md:text-4xl font-light text-white ${
          isSeconds ? "pulse-subtle" : ""
        }`}
      >
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-[10px] text-white/80 uppercase tracking-[0.3em] mt-1">
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return <span className="text-white/50 text-2xl font-light mx-2" aria-hidden="true">:</span>;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Use timeout to avoid synchronous setState in effect body
    const initialTimeout = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 0);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(timer);
    };
  }, []);

  // Loading state (SSR hydration)
  if (!timeLeft) {
    return (
      <div className="flex flex-col items-center" aria-label="Countdown loading">
        <div className="flex items-center justify-center gap-1">
          {["Days", "Hrs", "Min", "Sec"].map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="text-center">
                <div className="font-serif text-3xl md:text-4xl font-light text-white">
                  --
                </div>
                <div className="text-[10px] text-white/80 uppercase tracking-[0.3em] mt-1">
                  {label}
                </div>
              </div>
              {i < 3 && <Separator />}
            </div>
          ))}
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/80 mt-4">
          Until America&apos;s 250th
        </p>
      </div>
    );
  }

  // Target date has passed - celebratory message
  const isComplete = timeLeft.days === 0 && timeLeft.hours === 0 &&
                     timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isComplete) {
    return (
      <div className="flex flex-col items-center" aria-live="polite">
        <p className="font-serif text-2xl md:text-3xl font-bold text-accent">
          America&apos;s 250th Has Arrived
        </p>
        <p className="text-sm text-white/80 mt-2 uppercase tracking-[0.2em]">
          Celebrating 250 Years of Independence
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center" aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds until America's 250th`}>
      <div className="flex items-center justify-center">
        <CountdownUnit value={timeLeft.days} label="Days" />
        <Separator />
        <CountdownUnit value={timeLeft.hours} label="Hrs" />
        <Separator />
        <CountdownUnit value={timeLeft.minutes} label="Min" />
        <Separator />
        <CountdownUnit value={timeLeft.seconds} label="Sec" isSeconds />
      </div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/80 mt-4">
        Until America&apos;s 250th
      </p>
    </div>
  );
}
