"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

type Direction = "left" | "right";

interface ScrollSlideRevealProps {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  className?: string;
}

export default function ScrollSlideReveal({
  children,
  direction = "left",
  distance = 80,
  className,
}: ScrollSlideRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const sign = direction === "left" ? -1 : 1;

  const x = useTransform(
    scrollYProgress,
    [0, 0.18, 0.25, 0.5, 0.75, 0.82, 1],
    [
      sign * distance,
      sign * distance * 0.35,
      sign * distance * 0.18,
      0,
      -sign * distance * 0.18,
      -sign * distance * 0.35,
      -sign * distance,
    ],
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0],
  );

  return (
    <motion.div ref={ref} style={{ x, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
