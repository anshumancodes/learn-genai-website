import { AppData } from "./types";
import { defaultCourses } from "./default-data";

const STORAGE_KEY = "learn-genai-data-v2";

export function loadData(): AppData {
  if (typeof window === "undefined") {
    return { courses: defaultCourses, selectedCourseId: defaultCourses[0].id };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData();
    const parsed = JSON.parse(raw) as AppData;
    if (!parsed.courses || !Array.isArray(parsed.courses)) return getDefaultData();
    return parsed;
  } catch {
    return getDefaultData();
  }
}

export function saveData(data: AppData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore write errors
  }
}

export function clearData(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function getDefaultData(): AppData {
  return {
    courses: defaultCourses,
    selectedCourseId: defaultCourses[0].id,
  };
}
