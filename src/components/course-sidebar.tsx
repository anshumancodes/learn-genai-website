"use client";

import { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PencilEdit01Icon,
  Delete01Icon,
  CheckIcon,
  Cancel01Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import { Course } from "@/lib/types";

interface CourseSidebarProps {
  courses: Course[];
  selectedCourseId: string;
  onSelect: (id: string) => void;
  onAdd: (name: string) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onReset: () => void;
}

export default function CourseSidebar({
  courses,
  selectedCourseId,
  onSelect,
  onAdd,
  onRename,
  onDelete,
  onReset,
}: CourseSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [adding, setAdding] = useState(false);
  const [addValue, setAddValue] = useState("");
  const editRef = useRef<HTMLInputElement>(null);
  const addRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId && editRef.current) editRef.current.focus();
  }, [editingId]);

  useEffect(() => {
    if (adding && addRef.current) addRef.current.focus();
  }, [adding]);

  function startEdit(course: Course) {
    setEditingId(course.id);
    setEditValue(course.name);
  }

  function confirmEdit() {
    if (!editingId) return;
    const trimmed = editValue.trim();
    if (trimmed) onRename(editingId, trimmed);
    setEditingId(null);
  }

  function confirmAdd() {
    const trimmed = addValue.trim();
    if (trimmed) onAdd(trimmed);
    setAdding(false);
    setAddValue("");
  }

  return (
    <aside
      className="border-r border-[#292929] flex flex-col min-w-0"
      aria-label="Course sidebar"
    >
      {/* Header */}
      <div className="border-b border-[#292929] px-4 py-3 flex items-center justify-between gap-2">
        <span className="text-xs text-[#29391D] font-body tracking-wide">
          course
        </span>
        <button
          onClick={() => setAdding(true)}
          className="icon-btn"
          aria-label="Add new course"
          title="Add course"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={13} strokeWidth={1.5} />
        </button>
      </div>

      {/* Course list */}
      <ul className="flex-1 overflow-y-auto py-1">
        {courses.map((course) => (
          <li key={course.id} className="group relative">
            {editingId === course.id ? (
              <div className="flex items-center gap-1 px-3 py-2">
                <input
                  ref={editRef}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") confirmEdit();
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  className="inline-edit flex-1"
                  aria-label="Rename course"
                />
                <button
                  onClick={confirmEdit}
                  className="icon-btn text-green-700"
                  aria-label="Confirm rename"
                >
                  <HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="icon-btn"
                  aria-label="Cancel rename"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onSelect(course.id)}
                className={`w-full text-left px-4 py-2.5 text-sm font-body transition-colors flex items-center justify-between gap-2 ${
                  selectedCourseId === course.id
                    ? "bg-[#29391D] text-[#F5F2E8]"
                    : "text-[#29391D] hover:bg-[#EAE5D5]"
                }`}
                aria-current={
                  selectedCourseId === course.id ? "true" : undefined
                }
              >
                <span className="truncate">{course.name}</span>

                {/* Edit / Delete — visible on hover */}
                <span
                  className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      startEdit(course);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") startEdit(course);
                    }}
                    className={`icon-btn ${
                      selectedCourseId === course.id
                        ? "text-[#F5F2E8] hover:text-[#B8A879]"
                        : ""
                    }`}
                    aria-label={`Rename ${course.name}`}
                  >
                    <HugeiconsIcon icon={PencilEdit01Icon} size={11} strokeWidth={1.5} />
                  </span>
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(course.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onDelete(course.id);
                    }}
                    className={`icon-btn ${
                      selectedCourseId === course.id
                        ? "text-[#F5F2E8] hover:text-red-400"
                        : "hover:text-red-600"
                    }`}
                    aria-label={`Delete ${course.name}`}
                  >
                    <HugeiconsIcon icon={Delete01Icon} size={11} strokeWidth={1.5} />
                  </span>
                </span>
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Add course inline input */}
      {adding && (
        <div className="border-t border-[#292929] px-3 py-2 flex items-center gap-1">
          <input
            ref={addRef}
            value={addValue}
            onChange={(e) => setAddValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") confirmAdd();
              if (e.key === "Escape") {
                setAdding(false);
                setAddValue("");
              }
            }}
            placeholder="course name"
            className="inline-edit flex-1 text-xs"
            aria-label="New course name"
          />
          <button
            onClick={confirmAdd}
            className="icon-btn text-green-700"
            aria-label="Add course"
          >
            <HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => {
              setAdding(false);
              setAddValue("");
            }}
            className="icon-btn"
            aria-label="Cancel add"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={1.5} />
          </button>
        </div>
      )}

      {/* Reset to defaults */}
      <div className="border-t border-[#292929]/30 px-4 py-2">
        <button
          onClick={() => {
            if (confirm("Reset all data to defaults? This cannot be undone."))
              onReset();
          }}
          className="text-[10px] text-[#29391D]/35 hover:text-[#29391D]/70 transition-colors font-body"
          aria-label="Reset all data to defaults"
        >
          reset to defaults
        </button>
      </div>
    </aside>
  );
}
