import { ACTIVITIES } from "@/utils/PlaceholderData";

export type ActivityList = Activity[];
export type ActivityDetails = Activity;

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const USE_PLACEHOLDER_DATA = process.env.EXPO_PUBLIC_USE_PLACEHOLDER_DATA === "true";
const placeholderActivities = ACTIVITIES.map(activity => ({ ...activity }));

function getApiUrl(path: string): string {
  if (!API_BASE_URL) {
    throw new Error("EXPO_PUBLIC_API_URL must be set to use the activity API.");
  }

  return `${API_BASE_URL.replace(/\/+$/, "")}/${path}`;
}

function isActivity(value: unknown): value is Activity {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const activity = value as Record<string, unknown>;
  return (
    typeof activity._guid === "string" &&
    typeof activity.isActive === "boolean" &&
    typeof activity.completion === "number" &&
    typeof activity.title === "string" &&
    typeof activity.description === "string" &&
    typeof activity.icon === "string" &&
    typeof activity.theme === "string" &&
    typeof activity.approximateTime === "string" &&
    (activity.index === undefined || typeof activity.index === "number") &&
    (activity.completedDate === undefined || typeof activity.completedDate === "string") &&
    (activity.color === undefined || typeof activity.color === "string")
  );
}

async function request(path: string, init?: RequestInit): Promise<Response> {
  const response = await fetch(getApiUrl(path), {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const responseText = await response.text();
    const detail = responseText.trim();
    throw new Error(
      `Activity API request failed (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`,
    );
  }

  return response;
}

export async function getActivityList(): Promise<ActivityList> {
  if (USE_PLACEHOLDER_DATA) {
    return placeholderActivities.map(activity => ({ ...activity }));
  }

  const response = await request("ActivityList");
  const data: unknown = await response.json();

  if (!Array.isArray(data) || !data.every(isActivity)) {
    throw new Error("Activity API returned an invalid ActivityList response.");
  }

  return data;
}

export async function getActivityDetails(id: string): Promise<ActivityDetails> {
  if (USE_PLACEHOLDER_DATA) {
    const activity = placeholderActivities.find(item => item._guid === id);
    if (!activity) {
      throw new Error(`Placeholder activity "${id}" was not found.`);
    }

    return { ...activity };
  }

  const response = await request(`ActivityDetails/${encodeURIComponent(id)}`);
  const data: unknown = await response.json();

  if (!isActivity(data)) {
    throw new Error("Activity API returned an invalid ActivityDetails response.");
  }

  return data;
}

export async function sendActivityCompletion(id: string): Promise<void> {
  if (USE_PLACEHOLDER_DATA) {
    const activity = placeholderActivities.find(item => item._guid === id);
    if (!activity) {
      throw new Error(`Placeholder activity "${id}" was not found.`);
    }

    activity.completion = 100;
    activity.completedDate = new Date().toISOString();
    return;
  }

  await request(`ActivityDetails/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completion: 100,
      completedDate: new Date().toISOString(),
    }),
  });
}
