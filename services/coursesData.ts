export type Course = {
  id: string;
  title: string;
  subtitle?: string;
  instructor?: string;
  progress?: number;
  description?: string;
};

// Centralized dummy data for courses used across the app
export const courses: Course[] = [
  {
    id: "1",
    title: "Mathematics",
    subtitle: "Algebra & Calculus",
    instructor: "Mr. Sharma",
    progress: 76,
    description: "Covers algebraic techniques, limits, derivatives and integrals. Includes weekly problem sets and quizzes.",
  },
  {
    id: "2",
    title: "English",
    subtitle: "Reading & Writing",
    instructor: "Ms. Kumar",
    progress: 92,
    description: "Focus on reading comprehension, essay writing, grammar and vocabulary development.",
  },
  {
    id: "3",
    title: "Science",
    subtitle: "Physics & Chemistry",
    instructor: "Mrs. Iyer",
    progress: 64,
    description: "Introductory physics and chemistry with lab sessions and weekly assessments.",
  },
  {
    id: "4",
    title: "History",
    subtitle: "World History",
    instructor: "Mr. Gupta",
    progress: 81,
    description: "Survey of major world events from ancient to modern times with project-based learning.",
  },
];

export default { courses };
