"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon, Cancel01Icon, CheckIcon } from "@hugeicons/core-free-icons";
import { Course, Topic, TopicStatus } from "@/lib/types";
import TopicRow from "./topic-row";

interface TopicTableProps {
  course: Course;
  onAddTopic: (topic: Omit<Topic, "id">) => void;
  onUpdateTopic: (topicId: string, patch: Partial<Omit<Topic, "id">>) => void;
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
  const [draft, setDraft] = useState<Omit<Topic, "id">>(emptyDraft());

  function confirmAdd() {
    const trimmed = draft.name.trim();
    if (!trimmed) return;
    onAddTopic({ ...draft, name: trimmed });
    setDraft(emptyDraft());
    setAdding(false);
  }

  function cancelAdd() {
    setDraft(emptyDraft());
    setAdding(false);
  }

  return (
    <div className="flex flex-col flex-1 min-w-0">
      <div className="overflow-x-auto flex-1">
        <table className="w-full min-w-[620px] border-collapse table-fixed">
          <colgroup>
            <col style={{ width: "38%" }} />
            <col style={{ width: "24%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "8%" }} />
          </colgroup>
          <thead>
            <tr className="border-b border-[#292929]">
              <th className="px-4 py-3 text-left text-xs font-body font-normal text-[#29391D]/60 tracking-wide">
                topic name
              </th>
              <th className="px-4 py-3 text-left text-xs font-body font-normal text-[#29391D]/60 tracking-wide">
                video
              </th>
              <th className="px-4 py-3 text-left text-xs font-body font-normal text-[#29391D]/60 tracking-wide">
                status (completed or not)
              </th>
              <th className="px-3 py-3" />
            </tr>
          </thead>
          <tbody>
            {course.topics.length === 0 && !adding && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center">
                  <p className="text-sm text-[#29391D]/40 font-body">
                    no topics yet. add one below.
                  </p>
                </td>
              </tr>
            )}

            {course.topics.map((topic, i) => (
              <TopicRow
                key={topic.id}
                topic={topic}
                index={i}
                isStatic={topic.isStatic}
                onUpdate={(patch) => onUpdateTopic(topic.id, patch)}
                onDelete={() => onDeleteTopic(topic.id)}
              />
            ))}

            {/* Add topic inline row */}
            {adding && (
              <tr className="border-b border-[#292929]/20 bg-[#EAE5D5]/30">
                <td className="px-4 py-3" colSpan={1}>
                  <div className="flex flex-col gap-1.5">
                    <input
                      autoFocus
                      value={draft.name}
                      onChange={(e) =>
                        setDraft({ ...draft, name: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") confirmAdd();
                        if (e.key === "Escape") cancelAdd();
                      }}
                      placeholder="topic name *"
                      className="inline-edit text-sm"
                      aria-label="New topic name"
                    />
                    <input
                      value={draft.description}
                      onChange={(e) =>
                        setDraft({ ...draft, description: e.target.value })
                      }
                      placeholder="description (optional)"
                      className="inline-edit text-xs"
                      aria-label="New topic description"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <input
                    value={draft.videoUrl}
                    onChange={(e) =>
                      setDraft({ ...draft, videoUrl: e.target.value })
                    }
                    placeholder="youtube url"
                    className="inline-edit text-xs w-full"
                    aria-label="New topic video URL"
                  />
                </td>
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
                    <option value="not-started">not started</option>
                    <option value="in-progress">in progress</option>
                    <option value="completed">completed</option>
                  </select>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={confirmAdd}
                      className="icon-btn text-green-700"
                      aria-label="Add topic"
                    >
                      <HugeiconsIcon icon={CheckIcon} size={13} strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={cancelAdd}
                      className="icon-btn"
                      aria-label="Cancel add topic"
                    >
                      <HugeiconsIcon icon={Cancel01Icon} size={13} strokeWidth={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add topic button */}
      <div className="border-t border-[#292929]/20 px-4 py-3">
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 text-xs text-[#29391D]/60 hover:text-[#29391D] transition-colors font-body"
            aria-label="Add new topic"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={13} strokeWidth={1.5} />
            add topic
          </button>
        )}
      </div>
    </div>
  );
}
