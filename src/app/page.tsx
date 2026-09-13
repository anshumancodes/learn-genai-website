"use client";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import LearningTracker from "@/components/learning-tracker";
import Footer from "@/components/footer";
import { useLearningData } from "@/hooks/use-learning-data";

export default function HomePage() {
  const {
    data,
    hydrated,
    selectedCourse,
    selectCourse,
    addCourse,
    renameCourse,
    deleteCourse,
    addTopic,
    updateTopic,
    deleteTopic,
    resetToDefaults,
  } = useLearningData();

  // Avoid hydration mismatch — render shell on SSR, real content after mount
  if (!hydrated || !data) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F2E8]">
        <Navbar />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2E8]">
      <Navbar />

      <main className="flex-1 flex flex-col">
        <Hero />

        <LearningTracker
          courses={data.courses}
          selectedCourse={selectedCourse}
          selectedCourseId={data.selectedCourseId}
          onSelectCourse={selectCourse}
          onAddCourse={addCourse}
          onRenameCourse={renameCourse}
          onDeleteCourse={deleteCourse}
          onAddTopic={addTopic}
          onUpdateTopic={updateTopic}
          onDeleteTopic={deleteTopic}
          onReset={resetToDefaults}
        />
      </main>

      <Footer />
    </div>
  );
}
