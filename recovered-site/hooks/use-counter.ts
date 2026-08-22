"use client";

import { useEffect, useState } from "react";

export function useCounter(target: number, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let frameId = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.round(progress * target));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [duration, target]);

  return value;
}
