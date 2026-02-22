"use client";

import { ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";

interface AppItem {
  name: string;
  icon: string;
  bg: string;
  iconColor?: string;
}

const row1: AppItem[] = [
  {
    name: "Uber",
    icon: "https://cdn.simpleicons.org/uber/ffffff",
    bg: "#000000",
  },
  {
    name: "Nike",
    icon: "https://cdn.simpleicons.org/nike/ffffff",
    bg: "#111111",
  },
  {
    name: "Pinterest",
    icon: "https://cdn.simpleicons.org/pinterest/ffffff",
    bg: "#E60023",
  },
  {
    name: "Coinbase",
    icon: "https://cdn.simpleicons.org/coinbase/ffffff",
    bg: "#1652F0",
  },
  {
    name: "Wise",
    icon: "https://cdn.simpleicons.org/wise/ffffff",
    bg: "#48C85D",
  },
  {
    name: "Headspace",
    icon: "https://cdn.simpleicons.org/headspace/ffffff",
    bg: "#F47D31",
  },
  {
    name: "Airbnb",
    icon: "https://cdn.simpleicons.org/airbnb/ffffff",
    bg: "#FF385C",
  },
  {
    name: "Shopify",
    icon: "https://cdn.simpleicons.org/shopify/ffffff",
    bg: "#96BF48",
  },
];

const row2: AppItem[] = [
  {
    name: "Creme",
    icon: "https://cdn.simpleicons.org/crunchyroll/ffffff",
    bg: "#1A1A1A",
  },
  {
    name: "Mailchimp",
    icon: "https://cdn.simpleicons.org/mailchimp/ffffff",
    bg: "#FFE01B",
    iconColor: "#000000",
  },
  {
    name: "Twitch",
    icon: "https://cdn.simpleicons.org/twitch/ffffff",
    bg: "#9146FF",
  },
  {
    name: "ChatGPT",
    icon: "https://cdn.simpleicons.org/openai/ffffff",
    bg: "#000000",
  },
  {
    name: "Shopify",
    icon: "https://cdn.simpleicons.org/shopify/ffffff",
    bg: "#5A8A3B",
  },
  {
    name: "Loom",
    icon: "https://cdn.simpleicons.org/loom/ffffff",
    bg: "#625DF5",
  },
  {
    name: "Notion",
    icon: "https://cdn.simpleicons.org/notion/ffffff",
    bg: "#000000",
  },
  {
    name: "Figma",
    icon: "https://cdn.simpleicons.org/figma/ffffff",
    bg: "#F24E1E",
  },
];

const row3: AppItem[] = [
  {
    name: "Retro",
    icon: "https://cdn.simpleicons.org/trpc/ffffff",
    bg: "#6D28D9",
  },
  {
    name: "Notion",
    icon: "https://cdn.simpleicons.org/notion/ffffff",
    bg: "#000000",
  },
  {
    name: "Dropbox",
    icon: "https://cdn.simpleicons.org/dropbox/ffffff",
    bg: "#0061FF",
  },
  {
    name: "Spotify",
    icon: "https://cdn.simpleicons.org/spotify/ffffff",
    bg: "#1DB954",
  },
  {
    name: "Apple TV",
    icon: "https://cdn.simpleicons.org/apple/ffffff",
    bg: "#000000",
  },
  {
    name: "Cosmos",
    icon: "https://cdn.simpleicons.org/cosmosdb/ffffff",
    bg: "#7B2FBE",
  },
  {
    name: "Linear",
    icon: "https://cdn.simpleicons.org/linear/ffffff",
    bg: "#5E6AD2",
  },
  {
    name: "Vercel",
    icon: "https://cdn.simpleicons.org/vercel/ffffff",
    bg: "#000000",
  },
];

function AppIcon({ item }: { item: AppItem }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 shrink-0">
      <div
        className="w-12 h-12 rounded-[22%] flex items-center justify-center shadow-sm shrink-0"
        style={{ background: item.bg }}
      >
        <img
          src={item.icon}
          alt={item.name}
          style={{
            width: "55%",
            height: "55%",
            objectFit: "contain",
            filter: item.iconColor === "#000000" ? "invert(1)" : undefined,
          }}
        />
      </div>
      <span className="text-lg font-semibold text-foreground whitespace-nowrap">
        {item.name}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  speed = 40,
}: {
  items: AppItem[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...items, ...items, ...items];
  const totalItems = items.length;
  // Each item is roughly 180px wide
  const itemWidth = 180;
  const totalWidth = totalItems * itemWidth;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Left fade */}
      <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex"
        animate={{
          x:
            direction === "left"
              ? [`0px`, `-${totalWidth}px`]
              : [`-${totalWidth}px`, `0px`],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {doubled.map((item, i) => (
          <AppIcon key={`${item.name}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export function InspireSection() {
  return (
    <section className="w-full py-28 flex flex-col items-center gap-16">
      {/* Heading block */}
      <div className="flex flex-col items-center text-center px-6 gap-5">
        <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-foreground max-w-xl">
          Never run out of inspiration again.
        </h2>

        <p className="text-muted-foreground text-base md:text-lg max-w-sm leading-relaxed">
          Use the app for free as long as you like or get full access with any
          of our paid plans.
        </p>

        <div className="flex items-center gap-3 mt-2">
          <button className="px-7 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-opacity text-sm">
            Join for free
          </button>
          <button className="group px-7 py-3 bg-background border border-border rounded-full font-bold flex items-center gap-2 hover:bg-accent transition-all shadow-sm text-sm text-foreground">
            See our plans
            <ArrowRightIcon
              size={16}
              strokeWidth={2.5}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="w-full flex flex-col gap-3">
        <MarqueeRow items={row1} direction="left" speed={50} />
        <MarqueeRow items={row2} direction="right" speed={45} />
        <MarqueeRow items={row3} direction="left" speed={55} />
      </div>
    </section>
  );
}
