import { useEffect, useRef, useState } from "react";

// Animates a numeric value from its previous value up (or down) to `target`
// over `duration` ms. Used for KPI cards so numbers visibly count in on load.
export const useCountUp = (target, duration = 800) => {
  const [value, setValue] = useState(0);
  const fromRef = useRef(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const from = fromRef.current;
    const to = Number.isFinite(target) ? target : 0;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * eased);
      setValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return value;
};
