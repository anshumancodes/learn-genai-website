"use client";

import { useState, useEffect, useCallback } from "react";
import { AppData, Course, Topic, TopicStatus } from "@/lib/types";
import { loadData, saveData, clearData, getDefaultData } from "@/lib/storage";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useLearningData() {
  const [data, setData] = useState<AppData | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadData();
    setData(loaded);
    setHydrated(true);
  }, []);

  const updateData = useCallback((next: AppData) => {
    setData(next);
    saveData(next);
  }, []);

  // Course operations

  const selectCourse = useCallback(
    (courseId: string) => {
      if (!data) return;
      updateData({ ...data, selectedCourseId: courseId });
    },
    [data, updateData]
  );

  const addCourse = useCallback(
    (name: string) => {
      if (!data) return;
      const newCourse: Course = { id: generateId(), name, topics: [] };
      const courses = [...data.courses, newCourse];
      updateData({ ...data, courses, selectedCourseId: newCourse.id });
    },
    [data, updateData]
  );

  const renameCourse = useCallback(
    (courseId: string, name: string) => {
      if (!data) return;
      const courses = data.courses.map((c) =>
        c.id === courseId ? { ...c, name } : c
      );
      updateData({ ...data, courses });
    },
    [data, updateData]
  );

  const deleteCourse = useCallback(
    (courseId: string) => {
      if (!data) return;
      const courses = data.courses.filter((c) => c.id !== courseId);
      const selectedCourseId =
        data.selectedCourseId === courseId
          ? (courses[0]?.id ?? "")
          : data.selectedCourseId;
      updateData({ ...data, courses, selectedCourseId });
    },
    [data, updateData]
  );

  // Topic operations

  const addTopic = useCallback(
    (
      courseId: string,
      topic: Omit<Topic, "id">
    ) => {
      if (!data) return;
      const newTopic: Topic = { ...topic, id: generateId() };
      const courses = data.courses.map((c) =>
        c.id === courseId ? { ...c, topics: [...c.topics, newTopic] } : c
      );
      updateData({ ...data, courses });
    },
    [data, updateData]
  );

  const updateTopic = useCallback(
    (courseId: string, topicId: string, patch: Partial<Omit<Topic, "id">>) => {
      if (!data) return;
      const courses = data.courses.map((c) => {
        if (c.id !== courseId) return c;
        return {
          ...c,
          topics: c.topics.map((t) =>
            t.id === topicId ? { ...t, ...patch } : t
          ),
        };
      });
      updateData({ ...data, courses });
    },
    [data, updateData]
  );

  const deleteTopic = useCallback(
    (courseId: string, topicId: string) => {
      if (!data) return;
      const courses = data.courses.map((c) => {
        if (c.id !== courseId) return c;
        return { ...c, topics: c.topics.filter((t) => t.id !== topicId) };
      });
      updateData({ ...data, courses });
    },
    [data, updateData]
  );

  const setTopicStatus = useCallback(
    (courseId: string, topicId: string, status: TopicStatus) => {
      updateTopic(courseId, topicId, { status });
    },
    [updateTopic]
  );

  const setTopicPausedAt = useCallback(
    (courseId: string, topicId: string, pausedAt: string) => {
      updateTopic(courseId, topicId, { pausedAt });
    },
    [updateTopic]
  );

  const resetToDefaults = useCallback(() => {
    clearData();
    const fresh = getDefaultData();
    setData(fresh);
    saveData(fresh);
  }, []);

  const selectedCourse =
    data?.courses.find((c) => c.id === data.selectedCourseId) ?? null;

  return {
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
    setTopicStatus,
    setTopicPausedAt,
    resetToDefaults,
  };
}
