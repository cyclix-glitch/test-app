//import name from "@/assets/icons/name.png";
import test from "@/assets/images/icon.png";
import housesolidfull from "@/assets/house.png";
import globesolidfull from "@/assets/globe.png";
import calendarsolidfull from "@/assets/calendar.png";

export const icons = {
    //name
    test,
    housesolidfull,
    globesolidfull,
    calendarsolidfull
} as const;

export type IconKey = keyof typeof icons;