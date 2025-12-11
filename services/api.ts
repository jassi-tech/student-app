import { API_BASE_URL } from "./config";

export type Receipt = {
  id: string;
  studentName: string;
  amount: number;
  date: string; // ISO
  description?: string;
  status?: string; // paid, free, pending
};

const MOCK_RECEIPTS: Receipt[] = [
  { id: "r1", studentName: "John Doe", amount: 0, date: "2025-11-05T10:15:00.000Z", description: "Free item promotion", status: "free" },
  { id: "r2", studentName: "Jane Smith", amount: 150, date: "2025-11-02T14:30:00.000Z", description: "Tuition fee", status: "paid" },
  { id: "r3", studentName: "Pranav Kumar", amount: 0, date: "2025-10-21T09:00:00.000Z", description: "Scholarship - fee waived", status: "free" },
];

export async function getReceipts(): Promise<Receipt[]> {
  if (!API_BASE_URL) {
    // Return mock data for now
    return new Promise((res) => setTimeout(() => res(MOCK_RECEIPTS), 350));
  }

  const res = await fetch(`${API_BASE_URL}/receipts`);
  if (!res.ok) throw new Error("Failed to fetch receipts");
  const data = await res.json();
  return data as Receipt[];
}

export default { getReceipts };
