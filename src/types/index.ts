import type { Dayjs } from "dayjs";

export interface FormData {
  datetime: Dayjs | null;
  lieux: string;
  sexe: string;
  competition: string;
  niveau: string;
}

export function getSpecialFormatDateFromDatetime(
  date: Dayjs,
  Format: string,
): string {
  if (!date) return "";
  return date.format(Format);
}
