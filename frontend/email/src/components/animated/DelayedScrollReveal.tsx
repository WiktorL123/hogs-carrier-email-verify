"use client";

import { motion, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface DelayedAppearProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function DelayedAppear({
  children,
  delay = 2000,
  className,
}: DelayedAppearProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0 && v < 1) {
        // Element enters viewport → start delayed appear
        if (!visible) {
          timer = setTimeout(() => setVisible(true), delay);
        }
      } else {
        // Element leaves viewport → disappear instantly
        setVisible(false);
        if (timer) clearTimeout(timer);
      }
    });

    return () => {
      unsubscribe();
      if (timer) clearTimeout(timer);
    };
  }, [scrollYProgress, delay, visible]);

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
