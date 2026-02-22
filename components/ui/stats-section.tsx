"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function StatLine({
  value,
  progress,
  threshold,
}: {
  value: string;
  progress: any;
  threshold: [number, number];
}) {
  const y = useTransform(progress, threshold, ["100vh", "0vh"]);
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  return (
    <div className="overflow-hidden">
      <motion.div style={{ y: springY }}>
        <span className="text-[clamp(2rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.05] text-foreground">
          {value}
        </span>
      </motion.div>
    </div>
  );
}

function FloatingIcons() {
  const floaters = [
    {
      name: "Next.js",
      icon: "https://cdn.simpleicons.org/nextdotjs/ffffff",
      bg: "#000000",
      top: "6%",
      left: "6%",
      size: 96,
      delay: 0,
      duration: 6.0,
      amplitude: 10,
    },
    {
      name: "TypeScript",
      icon: "https://cdn.simpleicons.org/typescript/ffffff",
      bg: "#3178C6",
      top: "6%",
      left: "44%",
      size: 88,
      delay: 0.5,
      duration: 5.5,
      amplitude: 14,
    },
    {
      name: "Tailwind",
      icon: "https://cdn.simpleicons.org/tailwindcss/ffffff",
      bg: "#06B6D4",
      top: "18%",
      left: "28%",
      size: 100,
      delay: 0.3,
      duration: 6.5,
      amplitude: 11,
    },
    {
      name: "React",
      icon: "https://cdn.simpleicons.org/react/ffffff",
      bg: "#0f172a",
      top: "16%",
      right: "20%",
      size: 88,
      delay: 0.8,
      duration: 7.0,
      amplitude: 8,
    },
    {
      name: "Vercel",
      icon: "https://cdn.simpleicons.org/vercel/ffffff",
      bg: "#000000",
      top: "6%",
      right: "6%",
      size: 88,
      delay: 0.2,
      duration: 5.2,
      amplitude: 16,
    },
    {
      name: "Prisma",
      icon: "https://cdn.simpleicons.org/prisma/ffffff",
      bg: "#2D3748",
      top: "42%",
      left: "10%",
      size: 108,
      delay: 0.6,
      duration: 6.8,
      amplitude: 12,
    },
    {
      name: "Supabase",
      icon: "https://cdn.simpleicons.org/supabase/ffffff",
      bg: "#1C1C1C",
      top: "40%",
      right: "10%",
      size: 100,
      delay: 0.4,
      duration: 6.1,
      amplitude: 10,
    },
    {
      name: "Framer",
      icon: "https://cdn.simpleicons.org/framer/ffffff",
      bg: "#0055FF",
      top: "68%",
      left: "5%",
      size: 96,
      delay: 0.9,
      duration: 5.9,
      amplitude: 13,
    },
    {
      name: "Radix UI",
      icon: "https://cdn.simpleicons.org/radixui/ffffff",
      bg: "#161618",
      top: "66%",
      right: "5%",
      size: 96,
      delay: 0.1,
      duration: 6.6,
      amplitude: 9,
    },
    {
      name: "tRPC",
      icon: "https://cdn.simpleicons.org/trpc/ffffff",
      bg: "#2596BE",
      top: "82%",
      left: "20%",
      size: 90,
      delay: 0.7,
      duration: 6.3,
      amplitude: 11,
    },
    {
      name: "Bun",
      icon: "https://cdn.simpleicons.org/bun/ffffff",
      bg: "#FBF0DF",
      top: "82%",
      left: "40%",
      size: 96,
      delay: 0.35,
      duration: 5.7,
      amplitude: 14,
    },
    {
      name: "ESLint",
      icon: "https://cdn.simpleicons.org/eslint/ffffff",
      bg: "#4B32C3",
      top: "82%",
      right: "14%",
      size: 80,
      delay: 0.55,
      duration: 7.1,
      amplitude: 8,
    },
  ];

  return (
    <>
      {floaters.map((f, i) => (
        <motion.div
          key={i}
          className="absolute select-none pointer-events-none"
          style={{
            top: f.top,
            left: "left" in f ? f.left : undefined,
            right: "right" in f ? (f as any).right : undefined,
            width: f.size,
            height: f.size,
          }}
          animate={{ y: [0, -f.amplitude, 0] }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1],
            repeatType: "mirror",
          }}
        >
          <div
            className="w-full h-full rounded-[22%] flex items-center justify-center shadow-lg"
            style={{ background: f.bg }}
          >
            <img
              src={f.icon}
              alt={f.name}
              style={{ width: "52%", height: "52%", objectFit: "contain" }}
            />
          </div>
        </motion.div>
      ))}
    </>
  );
}

const stats = [
  { value: "1,150 apps" },
  { value: "594,500 screens" },
  { value: "316,200 flows" },
];

const thresholds: [number, number][] = [
  [0.05, 0.3],
  [0.2, 0.45],
  [0.35, 0.6],
];

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-background rounded-b-4xl"
      style={{ height: "250vh" }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <FloatingIcons />

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <p className="text-sm font-medium text-muted-foreground mb-4 tracking-wide">
            A growing library of
          </p>

          <div className="flex flex-col items-center gap-1">
            {stats.map((stat, i) => (
              <StatLine
                key={stat.value}
                value={stat.value}
                progress={scrollYProgress}
                threshold={thresholds[i]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
