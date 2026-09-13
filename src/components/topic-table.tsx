"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  Cancel01Icon,
  CheckIcon,
} from "@hugeicons/core-free-icons";
import { Course, Topic, TopicStatus } from "@/lib/types";
import TopicRow from "./topic-row";

interface TopicTableProps {
  course: Course;
  onAddTopic: (topic: Omit<Topic, "id">) => void;
  onUpdateTopic: (
    topicId: string,
    patch: Partial<Omit<Topic, "id">>
  ) => void;
  onDeleteTopic: (topicId: string) => void;
}

const emptyDraft = (): Omit<Topic, "id"> => ({
  name: "",
  description: "",
  videoUrl: "",
  status: "not-started",
  pausedAt: "",
});

export default function TopicTable({
  course,
  onAddTopic,
  onUpdateTopic,
  onDeleteTopic,
}: TopicTableProps) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] =
    useState<Omit<Topic, "id">>(emptyDraft());

  function confirmAdd() {
    const trimmed = draft.name.trim();

    if (!trimmed) return;

    onAddTopic({
      ...draft,
      name: trimmed,
    });

    setDraft(emptyDraft());
    setAdding(false);
  }

  function cancelAdd() {
    setDraft(emptyDraft());
    setAdding(false);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Scrollable table area */}
      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[620px] table-fixed border-collapse">
          <colgroup>
            <col style={{ width: "38%" }} />
            <col style={{ width: "24%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "8%" }} />
          </colgroup>

          {/* Table header */}
          <thead className="sticky top-0 z-10 bg-[#F5F2E8]">
            <tr className="border-b border-[#292929]">
              <th className="px-4 py-3 text-left text-xs font-body font-normal tracking-wide text-[#29391D]/60">
                topic name
              </th>

              <th className="px-4 py-3 text-left text-xs font-body font-normal tracking-wide text-[#29391D]/60">
                video
              </th>

              <th className="px-4 py-3 text-left text-xs font-body font-normal tracking-wide text-[#29391D]/60">
                status 
              </th>

              <th className="px-3 py-3" />
            </tr>
          </thead>

          <tbody>
            {/* Empty state */}
            {course.topics.length === 0 && !adding && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-12 text-center"
                >
                  <p className="font-body text-sm text-[#29391D]/40">
                    no topics yet. add one below.
                  </p>
                </td>
              </tr>
            )}

            {/* Topics */}
            {course.topics.map((topic, i) => (
              <TopicRow
                key={topic.id}
                topic={topic}
                index={i}
                isStatic={topic.isStatic}
                onUpdate={(patch) =>
                  onUpdateTopic(topic.id, patch)
                }
                onDelete={() =>
                  onDeleteTopic(topic.id)
                }
              />
            ))}

            {/* Add topic row */}
            {adding && (
              <tr className="border-b border-[#292929]/20 bg-[#EAE5D5]/30">
                {/* Topic */}
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1.5">
                    <input
                      autoFocus
                      value={draft.name}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          name: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          confirmAdd();
                        }

                        if (e.key === "Escape") {
                          cancelAdd();
                        }
                      }}
                      placeholder="topic name *"
                      className="inline-edit text-sm"
                      aria-label="New topic name"
                    />

                    <input
                      value={draft.description}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          description: e.target.value,
                        })
                      }
                      placeholder="description (optional)"
                      className="inline-edit text-xs"
                      aria-label="New topic description"
                    />
                  </div>
                </td>

                {/* Video */}
                <td className="px-4 py-3">
                  <input
                    value={draft.videoUrl}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        videoUrl: e.target.value,
                      })
                    }
                    placeholder="youtube url"
                    className="inline-edit w-full text-xs"
                    aria-label="New topic video URL"
                  />
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <select
                    value={draft.status}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        status: e.target.value as TopicStatus,
                      })
                    }
                    className="inline-edit text-xs"
                    aria-label="New topic status"
                  >
                    <option value="not-started">
                      not started
                    </option>

                    <option value="in-progress">
                      in progress
                    </option>

                    <option value="completed">
                      completed
                    </option>
                  </select>
                </td>

                {/* Actions */}
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={confirmAdd}
                      className="icon-btn text-green-700"
                      aria-label="Add topic"
                    >
                      <HugeiconsIcon
                        icon={CheckIcon}
                        size={13}
                        strokeWidth={1.5}
                      />
                    </button>

                    <button
                      onClick={cancelAdd}
                      className="icon-btn"
                      aria-label="Cancel add topic"
                    >
                      <HugeiconsIcon
                        icon={Cancel01Icon}
                        size={13}
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Fixed bottom add-topic bar */}
      <div className="shrink-0 border-t border-[#292929]/20 px-4 py-3">
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 font-body text-xs text-[#29391D]/60 transition-colors hover:text-[#29391D]"
            aria-label="Add new topic"
          >
            <HugeiconsIcon
              icon={PlusSignIcon}
              size={13}
              strokeWidth={1.5}
            />

            add topic
          </button>
        )}
      </div>
    </div>
  );
}