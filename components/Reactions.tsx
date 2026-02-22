"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ReactionType } from "@/convex/constants";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { Loader2Icon, ThumbsUp } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition, useState, useRef } from "react";
import { toast } from "sonner";

const REACTIONS: { type: ReactionType; emoji: string; label: string }[] = [
  { type: "like", emoji: "👍", label: "Like" },
  { type: "love", emoji: "❤️", label: "Love" },
  { type: "haha", emoji: "😂", label: "Haha" },
  { type: "wow", emoji: "😮", label: "Wow" },
  { type: "sad", emoji: "😢", label: "Sad" },
  { type: "angry", emoji: "😡", label: "Angry" },
];

export default function Reactions(props: {
  preloadedReactions: Preloaded<typeof api.reactions.getReactionByPostId>;
}) {
  const params = useParams();
  const data = usePreloadedQuery(props.preloadedReactions);
  const [isPending, startTransition] = useTransition();
  const mutation = useMutation(api.reactions.createReaction);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredReaction, setHoveredReaction] = useState<string | null>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleReaction(type: ReactionType) {
    startTransition(async () => {
      try {
        await mutation({ type, postId: params.postId as Id<"posts"> });
        toast.success("Reaction added!");
      } catch (error) {
        console.log(error);
        toast.error("Failed to add reaction");
      }
    });
    setIsHovered(false);
  }

  function handleMouseEnter() {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setIsHovered(true);
  }

  function handleMouseLeave() {
    hideTimeout.current = setTimeout(() => setIsHovered(false), 300);
  }

  if (data === undefined) {
    return <Loader2Icon className="animate-spin size-4" />;
  }

  // Count all reactions grouped by type
  const counts = REACTIONS.reduce(
    (acc, { type }) => {
      acc[type] = data.filter((r) => r.type === type).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  const totalReactions = data.length;

  return (
    <div className="flex items-center gap-3">
      {/* Like button with hover trigger */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Reaction Picker Popup */}
        <div
          className={`
            absolute bottom-full left-0 mb-2 transition-all duration-200
            ${isHovered ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}
          `}
        >
          <div className="flex items-center gap-1 bg-white rounded-full shadow-xl border border-gray-100 px-3 py-2">
            {REACTIONS.map(({ type, emoji, label }) => (
              <div key={type} className="relative group/reaction">
                <button
                  onClick={() => handleReaction(type)}
                  onMouseEnter={() => setHoveredReaction(type)}
                  onMouseLeave={() => setHoveredReaction(null)}
                  disabled={isPending}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-transform duration-150 hover:scale-125 disabled:opacity-50"
                >
                  <span className="text-2xl leading-none">{emoji}</span>
                </button>

                {/* Tooltip label */}
                <div
                  className={`
                    absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs
                    rounded px-2 py-1 whitespace-nowrap transition-opacity duration-100
                    ${hoveredReaction === type ? "opacity-100" : "opacity-0"}
                  `}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Little arrow */}
          <div className="w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45 ml-5 -mt-1.5 shadow-sm" />
        </div>

        {/* The main Like button */}
        <button
          disabled={isPending}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600 disabled:opacity-50"
        >
          {isPending ? (
            <Loader2Icon className="animate-spin size-4" />
          ) : (
            <ThumbsUp className="size-4" />
          )}
          <span>Like</span>
          {totalReactions > 0 && (
            <span className="text-gray-400 font-normal">{totalReactions}</span>
          )}
        </button>
      </div>

      {/* Reaction summary */}
      {totalReactions > 0 && (
        <div className="flex items-center gap-1">
          {REACTIONS.filter(({ type }) => counts[type] > 0).map(
            ({ type, emoji }) => (
              <span
                key={type}
                className="text-sm"
                title={`${counts[type]} ${type}`}
              >
                {emoji}
                <span className="text-xs text-gray-500 ml-0.5">
                  {counts[type]}
                </span>
              </span>
            ),
          )}
        </div>
      )}
    </div>
  );
}
