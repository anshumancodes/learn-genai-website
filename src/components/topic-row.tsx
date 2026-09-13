"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PencilEdit01Icon,
  Delete01Icon,
  CheckIcon,
  Cancel01Icon,
  LockIcon,
} from "@hugeicons/core-free-icons";
import { Topic, TopicStatus } from "@/lib/types";
import StatusSelector from "./status-selector";
import VideoLink from "./video-link";

interface TopicRowProps {
  topic: Topic;
  index: number;
  isStatic?: boolean;
  onUpdate: (patch: Partial<Omit<Topic, "id">>) => void;
  onDelete: () => void;
}

export default function TopicRow({
  topic,
  index,
  isStatic = false,
  onUpdate,
  onDelete,
}: TopicRowProps) {
  const [editingVideo, setEditingVideo] = useState(false);
  const [videoInput, setVideoInput] = useState(topic.videoUrl);
  const [editingPaused, setEditingPaused] = useState(false);
  const [pausedInput, setPausedInput] = useState(topic.pausedAt);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(topic.name);

  function confirmVideo() {
    onUpdate({ videoUrl: videoInput.trim() });
    setEditingVideo(false);
  }

  function confirmPaused() {
    onUpdate({ pausedAt: pausedInput.trim() });
    setEditingPaused(false);
  }

  function confirmName() {
    const trimmed = nameInput.trim();
    if (trimmed) onUpdate({ name: trimmed });
    setEditingName(false);
  }

  return (
    <tr className="group border-b border-[#292929]/20 hover:bg-[#EAE5D5]/40 transition-colors">
      {/* # + Name */}
      <td className="px-4 py-3 align-top">
        <div className="flex items-start gap-2">
          <span className="text-xs text-[#B8A879] font-body select-none pt-0.5 w-5 shrink-0">
            {index + 1}.
          </span>
          <div className="flex-1 min-w-0">
            {!isStatic && editingName ? (
              <div className="flex items-center gap-1">
                <input
                  autoFocus
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") confirmName();
                    if (e.key === "Escape") setEditingName(false);
                  }}
                  className="inline-edit flex-1 text-sm"
                  aria-label="Edit topic name"
                />
                <button onClick={confirmName} className="icon-btn text-green-700" aria-label="Confirm name">
                  <HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={1.5} />
                </button>
                <button onClick={() => setEditingName(false)} className="icon-btn" aria-label="Cancel name edit">
                  <HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <p className="text-sm font-body text-[#29391D] leading-snug">
                {topic.name}
              </p>
            )}
            {topic.description && (
              <p className="text-xs text-[#29391D]/60 font-body mt-0.5 leading-snug">
                {topic.description}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* Video */}
      <td className="px-4 py-3 align-middle">
        {!isStatic && editingVideo ? (
          <div className="flex items-center gap-1">
            <input
              autoFocus
              value={videoInput}
              onChange={(e) => setVideoInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirmVideo();
                if (e.key === "Escape") setEditingVideo(false);
              }}
              placeholder="youtube url"
              className="inline-edit flex-1 text-xs"
              aria-label="Video URL"
            />
            <button onClick={confirmVideo} className="icon-btn text-green-700" aria-label="Save video URL">
              <HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => {
                setVideoInput(topic.videoUrl);
                setEditingVideo(false);
              }}
              className="icon-btn"
              aria-label="Cancel video edit"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={1.5} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <VideoLink url={topic.videoUrl} onEdit={!isStatic ? () => setEditingVideo(true) : undefined} />
            {!isStatic && topic.videoUrl && (
              <button
                onClick={() => setEditingVideo(true)}
                className="icon-btn opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Edit video URL"
              >
                <HugeiconsIcon icon={PencilEdit01Icon} size={11} strokeWidth={1.5} />
              </button>
            )}
          </div>
        )}
      </td>

      {/* Status + Paused at */}
      <td className="px-4 py-3 align-top">
        <div className="flex flex-col gap-1.5">
          <StatusSelector
            value={topic.status}
            onChange={(s: TopicStatus) => onUpdate({ status: s })}
            id={`status-${topic.id}`}
          />
          <div className="flex items-center gap-1">
            {editingPaused ? (
              <>
                <input
                  autoFocus
                  value={pausedInput}
                  onChange={(e) => setPausedInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") confirmPaused();
                    if (e.key === "Escape") setEditingPaused(false);
                  }}
                  placeholder="paused at..."
                  className="inline-edit flex-1 text-xs"
                  aria-label="Paused at"
                />
                <button onClick={confirmPaused} className="icon-btn text-green-700" aria-label="Save paused at">
                  <HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => {
                    setPausedInput(topic.pausedAt);
                    setEditingPaused(false);
                  }}
                  className="icon-btn"
                  aria-label="Cancel paused at edit"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={1.5} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditingPaused(true)}
                className="text-xs text-[#29391D]/50 hover:text-[#29391D] transition-colors font-body text-left leading-snug"
                aria-label={
                  topic.pausedAt
                    ? `Paused at: ${topic.pausedAt}. Click to edit.`
                    : "Add paused at note"
                }
              >
                {topic.pausedAt ? (
                  <span>
                    <span className="text-[#B8A879]">paused at: </span>
                    {topic.pausedAt}
                  </span>
                ) : (
                  <span className="opacity-50">paused at...</span>
                )}
              </button>
            )}
          </div>
        </div>
      </td>

      {/* Actions */}
      <td className="px-3 py-3 align-middle">
        {isStatic ? (
          <div className="flex items-center justify-end opacity-0 group-hover:opacity-40 transition-opacity">
            <HugeiconsIcon icon={LockIcon} size={12} strokeWidth={1.5} className="text-[#29391D]" />
          </div>
        ) : (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
            <button
              onClick={() => setEditingName(true)}
              className="icon-btn"
              aria-label={`Edit ${topic.name}`}
            >
              <HugeiconsIcon icon={PencilEdit01Icon} size={12} strokeWidth={1.5} />
            </button>
            <button
              onClick={onDelete}
              className="icon-btn hover:text-red-600"
              aria-label={`Delete ${topic.name}`}
            >
              <HugeiconsIcon icon={Delete01Icon} size={12} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
