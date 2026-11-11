import { ACTIVITIES, ACTIVITY_DETAILS } from "@/utils/PlaceholderData";

export type ActivityList = Activity[];
export type ActivityDetails = (typeof ACTIVITY_DETAILS)[number];
export type ActivitySection = ActivityDetails["sections"][number];

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const USE_PLACEHOLDER_DATA = process.env.EXPO_PUBLIC_USE_PLACEHOLDER_DATA === "true";
const placeholderActivities = ACTIVITIES.map(activity => ({ ...activity }));
const placeholderActivityDetails = ACTIVITY_DETAILS.map(activity => ({
  ...activity,
  sections: activity.sections.map(section => ({ ...section })),
}));

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
    typeof activity.totalSections === "number" &&
    typeof activity.title === "string" &&
    typeof activity.description === "string" &&
    typeof activity.icon === "string" &&
    typeof activity.theme === "string" &&
    typeof activity.approximateTime === "string" &&
    (activity.index === undefined || typeof activity.index === "number") &&
    (activity.sectionsCompleted === undefined || typeof activity.sectionsCompleted === "number") &&
    (activity.mostRecentDate === undefined || typeof activity.mostRecentDate === "string") &&
    (activity.color === undefined || typeof activity.color === "string")
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isActivitySection(value: unknown): value is ActivitySection {
  if (
    !isRecord(value) ||
    typeof value.title !== "string" ||
    !(typeof value.subtitle === "string" || value.subtitle === null) ||
    !(value.elements === null ||
      (Array.isArray(value.elements) && value.elements.every(element =>
        isRecord(element) &&
        ["picture", "web", "audio", "text", "embed"].includes(String(element.type)) &&
        typeof element.src === "string" &&
        (typeof element.accessibility_text === "string" || element.accessibility_text === null),
      ))) ||
    !(typeof value.subtext_icon === "string" || value.subtext_icon === null) ||
    !(typeof value.subtext === "string" || value.subtext === null) ||
    !(typeof value.next_page_text === "string" || value.next_page_text === null)
  ) {
    return false;
  }

  switch (value.page_type) {
    case "none":
      return true;
    case "multiple_choice":
      return (
        Array.isArray(value.Options) &&
        value.Options.every(option =>
          isRecord(option) &&
          (typeof option.icon === "string" || option.icon === null) &&
          typeof option.text === "string",
        ) &&
        Array.isArray(value.CorrectOptions) &&
        value.CorrectOptions.every(option => typeof option === "number") &&
        (typeof value.WrongMessage === "string" || value.WrongMessage === null) &&
        (typeof value.CorrectMessage === "string" || value.CorrectMessage === null)
      );
    case "open_ended":
      return (
        (typeof value.DefaultText === "string" || value.DefaultText === null) &&
        (typeof value.PromptText === "string" || value.PromptText === null) &&
        (typeof value.CorrectAnswer === "string" || value.CorrectAnswer === null) &&
        (typeof value.ModelAnswer === "string" || value.ModelAnswer === null) &&
        (typeof value.PastResponse === "string" || value.PastResponse === null)
      );
    case "connections":
      return (
        Array.isArray(value.Pairings) &&
        value.Pairings.every(pairing =>
          Array.isArray(pairing) &&
          pairing.length === 2 &&
          pairing.every(item => typeof item === "string"),
        )
      );
    default:
      return false;
  }
}

function isActivityDetails(value: unknown): value is ActivityDetails {
  return (
    isRecord(value) &&
    typeof value._guid === "string" &&
    typeof value.title === "string" &&
    Array.isArray(value.sections) &&
    value.sections.every(isActivitySection)
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
    const activity = placeholderActivityDetails.find(item => item._guid === id);
    if (!activity) {
      throw new Error(`Placeholder activity "${id}" was not found.`);
    }

    return { ...activity };
  }

  const response = await request(`ActivityDetails/${encodeURIComponent(id)}`);
  const data: unknown = await response.json();

  if (!isActivityDetails(data)) {
    throw new Error("Activity API returned an invalid ActivityDetails response.");
  }

  return data;
}

export async function sendActivityCompletion(id: string,lastCompleted: number): Promise<void> {
  if (USE_PLACEHOLDER_DATA) {
    const activity = placeholderActivities.find(item => item._guid === id);
    if (!activity) {
      throw new Error(`Placeholder activity "${id}" was not found.`);
    }

    activity.completedSection = activity.completedSection?Math.max(activity.completedSection,lastCompleted):lastCompleted;
    activity.mostRecentDate = new Date().toISOString();
    return;
  }

  await request(`ActivityDetails/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completion: lastCompleted,
      completedDate: new Date().toISOString(),
    }),
  });
}
