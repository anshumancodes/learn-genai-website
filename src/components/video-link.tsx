"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { YoutubeIcon, ExternalLinkIcon } from "@hugeicons/core-free-icons";

interface VideoLinkProps {
  url: string;
  onEdit: () => void;
}

export default function VideoLink({ url, onEdit }: VideoLinkProps) {
  if (!url) {
    return (
      <button
        onClick={onEdit}
        className="text-xs text-[#B8A879] hover:text-[#29391D] transition-colors font-body underline underline-offset-2"
        aria-label="Add video URL"
      >
        add video
      </button>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-xs text-[#29391D] hover:text-[#3A4A29] transition-colors font-body group"
      aria-label="Watch video (opens YouTube in new tab)"
    >
      <HugeiconsIcon
        icon={YoutubeIcon}
        size={14}
        strokeWidth={1.5}
        className="text-[#B8A879] group-hover:text-[#29391D] transition-colors shrink-0"
      />
      <span className="underline underline-offset-2">watch video</span>
      <HugeiconsIcon
        icon={ExternalLinkIcon}
        size={11}
        strokeWidth={1.5}
        className="opacity-50 shrink-0"
      />
    </a>
  );
}
