import { API_BASE_URL } from "./config";

export type LoginResult = {
  token: string;
  user?: any;
};

export async function login({ rollNumber, studentId, password }: { rollNumber?: string; studentId?: string; password: string; }): Promise<LoginResult> {
  // If no backend configured, use a local mock for development
  const id = studentId ?? rollNumber ?? '';
  if (!API_BASE_URL) {
    // simple mock: accept any non-empty id and non-empty password
    if (id.trim() !== '' && password) {
      return new Promise((res) => setTimeout(() => res({ token: "__mock_token__", user: { id } }), 400));
    }
    throw new Error("Invalid credentials");
  }

  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId: id, password }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Login failed");
  }

  const data = await res.json();
  return data as LoginResult;
}

export default { login };
