"use client";

import { Course, Topic } from "@/lib/types";
import CourseSidebar from "./course-sidebar";
import TopicTable from "./topic-table";

interface LearningTrackerProps {
  courses: Course[];
  selectedCourse: Course | null;
  selectedCourseId: string;
  onSelectCourse: (id: string) => void;
  onAddCourse: (name: string) => void;
  onRenameCourse: (id: string, name: string) => void;
  onDeleteCourse: (id: string) => void;
  onAddTopic: (courseId: string, topic: Omit<Topic, "id">) => void;
  onUpdateTopic: (
    courseId: string,
    topicId: string,
    patch: Partial<Omit<Topic, "id">>
  ) => void;
  onDeleteTopic: (courseId: string, topicId: string) => void;
  onReset: () => void;
}

export default function LearningTracker({
  courses,
  selectedCourse,
  selectedCourseId,
  onSelectCourse,
  onAddCourse,
  onRenameCourse,
  onDeleteCourse,
  onAddTopic,
  onUpdateTopic,
  onDeleteTopic,
  onReset,
}: LearningTrackerProps) {
  return (
    <section
      className="mx-auto w-full px-6 pb-10"
      aria-labelledby="tracker-heading"
    >
      <h2 id="tracker-heading" className="sr-only">
        Learning Tracker
      </h2>

      {/* Outer border — matches the big bordered box in the reference */}
      <div className="border border-[#292929] flex" style={{ minHeight: "560px" }}>
        {/* Sidebar — fixed width */}
        <div className="w-44 shrink-0">
          <CourseSidebar
            courses={courses}
            selectedCourseId={selectedCourseId}
            onSelect={onSelectCourse}
            onAdd={onAddCourse}
            onRename={onRenameCourse}
            onDelete={onDeleteCourse}
            onReset={onReset}
          />
        </div>

        {/* Topic table — fills remaining width */}
        <div className="flex-1 flex flex-col min-w-0 border-l border-[#292929]">
          {selectedCourse ? (
            <TopicTable
              course={selectedCourse}
              onAddTopic={(t) => onAddTopic(selectedCourse.id, t)}
              onUpdateTopic={(tid, patch) =>
                onUpdateTopic(selectedCourse.id, tid, patch)
              }
              onDeleteTopic={(tid) => onDeleteTopic(selectedCourse.id, tid)}
            />
          ) : (
            <div className="flex items-center justify-center flex-1 p-10">
              <p className="text-sm text-[#29391D]/40 font-body">
                select a course from the sidebar.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
