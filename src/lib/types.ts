export type TopicStatus = "not-started" | "in-progress" | "completed";

export interface Topic {
  id: string;
  name: string;
  description: string;
  videoUrl: string;
  status: TopicStatus;
  pausedAt: string;
  isStatic?: boolean;
}

export interface Course {
  id: string;
  name: string;
  topics: Topic[];
  isStatic?: boolean;
}

export interface AppData {
  courses: Course[];
  selectedCourseId: string;
}
