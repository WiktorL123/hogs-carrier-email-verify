"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Underline() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 40%"],
  });

  const easedProgress = useTransform(
    scrollYProgress,
    (v) => 1 - Math.pow(1 - v, 3),
  );

  const scaleX = useTransform(easedProgress, [0, 1], [0, 1], {
    clamp: true,
  });

  return (
    <motion.div
      ref={ref}
      style={{ scaleX }}
      className="h-[0.4rem] max-w-[50rem] bg-mainAccent-purple rounded-full origin-left"
    />
  );
}
