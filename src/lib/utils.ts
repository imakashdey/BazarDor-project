import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toBn = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);
};

export const toBnCurrency = (value: number | string): string => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return toBn(value);
  const formatted = num.toLocaleString("en-US");
  return toBn(formatted);
};

export const toBnDate = (date: Date = new Date()): string => {
  return date.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
};

export const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  gram: "গ্রাম",
  hali: "হালি",
  bundle: "আঁটি",
};

export const getUnitLabel = (unit: string): string => {
  const normalized = (unit || "").toLowerCase().trim();
  return unitBn[normalized] || unit;
};
