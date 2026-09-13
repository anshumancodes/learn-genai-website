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

      {/* Outer tracker */}
      <div className="flex h-[calc(100vh-220px)] min-h-0 border border-[#292929]">
        {/* Sidebar */}
        <div className="w-44 shrink-0 min-h-0">
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

        {/* Topic table */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col border-l border-[#292929]">
          {selectedCourse ? (
            <TopicTable
              course={selectedCourse}
              onAddTopic={(topic) =>
                onAddTopic(selectedCourse.id, topic)
              }
              onUpdateTopic={(topicId, patch) =>
                onUpdateTopic(
                  selectedCourse.id,
                  topicId,
                  patch
                )
              }
              onDeleteTopic={(topicId) =>
                onDeleteTopic(
                  selectedCourse.id,
                  topicId
                )
              }
            />
          ) : (
            <div className="flex min-h-0 flex-1 items-center justify-center p-10">
              <p className="font-body text-sm text-[#29391D]/40">
                select a course from the sidebar.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}