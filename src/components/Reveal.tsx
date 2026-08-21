"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type RevealProps = {
  children: ReactNode;
  /** Stagger helper — index within a group, in units of 60ms. */
  index?: number;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span" | "p";
  /** Text-style reveals travel a little further than block reveals. */
  distance?: number;
};

export function Reveal({
  children,
  index = 0,
  delay = 0,
  className,
  as = "div",
  distance = 18,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: 0.75,
        delay: delay + index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
}
