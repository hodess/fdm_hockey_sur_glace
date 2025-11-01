import type { Dayjs } from "dayjs";

export interface FormData {
  datetime: Dayjs | null;
  lieux: string;
  sexe: string;
  competition: string;
  niveau: string;
}
