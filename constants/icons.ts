//import name from "@/assets/icons/name.png";
import housesolidfull from "@/assets/icons/house.png";
import globesolidfull from "@/assets/icons/globe.png";
import calendarsolidfull from "@/assets/icons/calendar.png";
import settings from "@/assets/icons/settings.png";

import completed from "@/assets/icons/completed.png";
import chevron from "@/assets/icons/chevron.png";

export const icons = {
    housesolidfull,
    globesolidfull,
    calendarsolidfull,
    completed,
    chevron,
    settings
} as const;

export type IconKey = keyof typeof icons;