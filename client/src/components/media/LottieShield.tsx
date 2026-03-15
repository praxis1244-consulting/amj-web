import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Lottie from "lottie-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export default function LottieShield() {
  const [lottieData, setLottieData] = useState<object | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    const idleWindow = window as IdleWindow;

    const loadAnimation = () => {
      fetch("/lottie-shield.json")
        .then((response) => response.json())
        .then((data) => {
          if (!cancelled) {
            setLottieData(data);
          }
        })
        .catch(() => {});
    };

    if (idleWindow.requestIdleCallback) {
      const idleHandle = idleWindow.requestIdleCallback(loadAnimation, {
        timeout: 1200,
      });

      return () => {
        cancelled = true;
        idleWindow.cancelIdleCallback?.(idleHandle);
      };
    }

    const timeoutId = window.setTimeout(loadAnimation, 120);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!lottieData) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute inset-[15%] rounded-full blur-3xl bg-indigo-400/[0.08] dark:bg-indigo-400/[0.06]"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="absolute inset-[15%] rounded-full blur-3xl bg-indigo-400/[0.07] dark:bg-indigo-400/[0.05]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1, scale: 1 }
            : {
                opacity: [0, 1, 1],
                scale: [0.8, 1, 1.05, 1],
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0.4, ease: EASE }
            : {
                opacity: { duration: 1.5, delay: 0.5, ease: EASE },
                scale: {
                  duration: 6,
                  delay: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }
        }
      />

      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1, scale: 1, y: 0 }
            : {
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? {
                opacity: { duration: 0.35, ease: EASE },
                scale: { duration: 0.35, ease: EASE },
              }
            : {
                opacity: { duration: 1, delay: 0.5, ease: EASE },
                scale: { duration: 1.2, delay: 0.5, ease: EASE },
                y: { duration: 5, delay: 1.7, repeat: Infinity, ease: "easeInOut" },
              }
        }
      >
        <Lottie animationData={lottieData} loop={!prefersReducedMotion} className="w-full h-full" />
      </motion.div>
    </div>
  );
}
