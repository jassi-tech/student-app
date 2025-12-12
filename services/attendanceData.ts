export type Student = { id: string; roll: string; name: string; present?: boolean };

// Source the sample students from the central data file so the app uses a single
// source of truth. We map the `mockUsers` shape to the simpler `Student` shape
// used by the attendance UI.
import { mockUsers } from "./dataSource";

export const sampleStudents: Student[] = mockUsers.map((u) => ({
  id: u.id,
  roll: u.roll,
  name: u.name,
  // `present` is optional in `Student`; default to false here. Adjust as needed.
  present: false,
}));

/**
 * Format a Date into a local YYYY-MM-DD string.
 * Using local date components avoids timezone shifts caused by toISOString().
 */
export function formatDateKey(dt: Date): string {
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const d = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Generate a simple attendance map for the given month.
 * - Keys are local YYYY-MM-DD strings (see `formatDateKey`).
 * - Only includes dates up to (and including) today; future dates are skipped.
 * - Dummy rule: weekdays => "present", weekends => "absent".
 */
export function generateAttendanceMap(viewDate: Date): Record<string, "present" | "absent" | "leave"> {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const map: Record<string, "present" | "absent" | "leave"> = {};

  // Today (local) at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let d = 1; d <= daysInMonth; d++) {
    const dt = new Date(year, month, d);
    dt.setHours(0, 0, 0, 0);
    if (dt.getTime() > today.getTime()) {
      // skip future dates
      continue;
    }
    const weekday = dt.getDay();
    const key = formatDateKey(dt);
    // Dummy rule: weekdays present, weekends absent
    map[key] = weekday === 0 || weekday === 6 ? "absent" : "present";
  }

  return map;
}
