"use client";

import { TopicStatus } from "@/lib/types";
import { ChevronDown } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const STATUS_LABELS: Record<TopicStatus, string> = {
  "not-started": "not started",
  "in-progress": "in progress",
  completed: "completed",
};

const STATUS_STYLES: Record<TopicStatus, string> = {
  "not-started": "status-not-started",
  "in-progress": "status-in-progress",
  completed: "status-completed",
};

interface StatusSelectorProps {
  value: TopicStatus;
  onChange: (status: TopicStatus) => void;
  id?: string;
}

export default function StatusSelector({
  value,
  onChange,
  id,
}: StatusSelectorProps) {
  return (
    <div className="relative inline-flex items-center border w-112.5">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as TopicStatus)}
        className={`${STATUS_STYLES[value] } w-full outline-0 border-0 focus:border-0 focus:outline-0 active:border-0 active:outline-0 focus-visible:border-0 focus-visible:outline-0`}
        aria-label="Topic status"
      >
        {(Object.keys(STATUS_LABELS) as TopicStatus[]).map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>

      
    </div>
  );
}