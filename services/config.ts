import Constants from "expo-constants";

// Priority order:
// 1. process.env.BACKEND_URL (useful in some dev setups / CI)
// 2. Expo config extra.apiUrl (from app.json or app.config)
// 3. fallback to empty string (uses mock data in services/api.ts)

const envUrl = process.env.BACKEND_URL;
const extraUrl = (Constants.expoConfig && (Constants.expoConfig.extra as any)?.apiUrl) || (Constants.manifest as any)?.extra?.apiUrl;

export const API_BASE_URL = envUrl || extraUrl || "";

export default {
  API_BASE_URL,
};
