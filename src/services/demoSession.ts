import type { UserData } from "@/pages/HomeTemplate/components/_Type/type";

export type DemoSession = { user: Omit<UserData, "password">; token: string };

export function readDemoSession(): DemoSession | null {
  const value = localStorage.getItem("userLogin") ?? sessionStorage.getItem("userLogin");
  try {
    const session = value ? JSON.parse(value) : null;
    return Number.isInteger(session?.user?.id) ? session : null;
  } catch {
    return null;
  }
}
