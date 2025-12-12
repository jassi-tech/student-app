// Central data source: users and attendance generator
export type MockUser = {
  id: string; // internal id
  studentId: string; // used as login id in the app
  username: string; // optional username
  password: string; // plain-text for dummy data only
  name: string;
  roll: string;
  email?: string;
  fatherName?: string;
  phone?: string;
  className?: string;
};

// Use the exact user list provided
export const mockUsers: MockUser[] = [
  {
    id: "1",
    studentId: "01",
    username: "admin",
    password: "admin",
    name: "Admin One",
    roll: "01",
    email: "admin01@school.edu",
    fatherName: "Mr. Admin",
    phone: "+91 90000 00001",
    className: "12 - A",
  },
  {
    id: "2",
    studentId: "02",
    username: "test1",
    password: "test1",
    name: "Test Student",
    roll: "02",
    email: "test02@school.edu",
    fatherName: "Mr. Test",
    phone: "+91 90000 00002",
    className: "11 - B",
  },
  {
    id: "3",
    studentId: "03",
    username: "jasleen",
    password: "jasleen",
    name: "Rakesh Rao",
    roll: "03",
    email: "rakesh03@school.edu",
    fatherName: "Mr. Rao",
    phone: "+91 90000 00003",
    className: "10 - A",
  },
  {
    id: "4",
    studentId: "04",
    username: "pass",
    password: "pass",
    name: "Meera Sharma",
    roll: "04",
    email: "meera04@school.edu",
    fatherName: "Mr. Sharma",
    phone: "+91 90000 00004",
    className: "09 - C",
  },
];

/**
 * Generate a simple attendance map for the given month.
 * It will only include dates up to today (no entries for future dates).
 */
export function generateAttendanceMap(viewDate: Date): Record<string, "present" | "absent" | "leave"> {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const map: Record<string, "present" | "absent" | "leave"> = {};

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let d = 1; d <= daysInMonth; d++) {
    const dt = new Date(year, month, d);
    dt.setHours(0, 0, 0, 0);
    if (dt.getTime() > today.getTime()) continue; // skip future dates
    const weekday = dt.getDay();
    const key = dt.toISOString().slice(0, 10);
    // Dummy rule: weekdays present, weekends absent
    map[key] = weekday === 0 || weekday === 6 ? "absent" : "present";
  }

  return map;
}

// Build mockAttendance for each user for the current month
const now = new Date();
export const mockAttendance: Record<string, Record<string, "present" | "absent" | "leave">> = {};
for (const u of mockUsers) {
  mockAttendance[u.id] = generateAttendanceMap(now);
}

// Helper to find user by credential (studentId, username or full name)
export function findUserByCredentials(studentIdOrUsername: string, password: string) {
  const lower = studentIdOrUsername.toLowerCase();
  return mockUsers.find(
    (u) => (u.studentId === studentIdOrUsername || u.username === lower || u.name.toLowerCase() === lower) && u.password === password
  ) || null;
}

export default { mockUsers, mockAttendance, generateAttendanceMap, findUserByCredentials };
