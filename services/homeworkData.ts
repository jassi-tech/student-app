import { courses } from "./coursesData";

export type Homework = {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  dueDate: string; // YYYY-MM-DD
  completed?: boolean;
};

// Small helper to format a Date to YYYY-MM-DD (local)
function fmt(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const today = new Date();
const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

// Create a few homework items tied to existing courses
export const homework: Homework[] = [
  {
    id: "h1",
    courseId: courses[0]?.id ?? "1",
    title: "Algebra: Linear equations",
    description: "Solve problems 1-20 from chapter 3 and submit worksheet.",
    dueDate: fmt(tomorrow),
    completed: false,
  },
  {
    id: "h2",
    courseId: courses[1]?.id ?? "2",
    title: "Essay: Short story analysis",
    description: "Write a 500-word analysis for the provided short story.",
    dueDate: fmt(nextWeek),
    completed: false,
  },
  {
    id: "h3",
    courseId: courses[2]?.id ?? "3",
    title: "Lab report: Density experiment",
    description: "Complete lab report and attach photos of setup.",
    dueDate: fmt(today),
    completed: true,
  },
  {
    id: "h4",
    courseId: courses[3]?.id ?? "4",
    title: "Reading: Chapter 5",
    description: "Read chapter 5 and answer review questions.",
    dueDate: fmt(nextWeek),
    completed: false,
  },
];

export default { homework };
