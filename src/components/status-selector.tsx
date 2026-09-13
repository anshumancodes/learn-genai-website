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
  "not-started": "status-badge status-not-started",
  "in-progress": "status-badge status-in-progress",
  completed: "status-badge status-completed",
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
    <div className="relative inline-flex items-center border">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as TopicStatus)}
        className={`${STATUS_STYLES[value]} min-w-[170px] cursor-pointer appearance-none border-0 outline-none ring-0 pl-3 pr-10 focus:border-0 focus:outline-none focus:ring-0`}
        aria-label="Topic status"
      >
        {(Object.keys(STATUS_LABELS) as TopicStatus[]).map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute right-3 flex items-center text-current opacity-70">
        <HugeiconsIcon
          icon={ChevronDown}
          size={16}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </span>
    </div>
  );
}