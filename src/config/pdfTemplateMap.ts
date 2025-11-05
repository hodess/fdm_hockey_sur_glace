import type { FormData } from "../types/index";
import { getSpecialFormatDateFromDatetime } from "../types/index";

export type FieldPdf = {
  x?: number;
  y: number;
  fontSize?: number;
  type?: string;
  color?: string;
  text?: string;
  active: boolean;
  circleWidth?: number;
};

export const PdfTemplateMap: Record<string, FieldPdf> = {
  date: {
    x: 35,
    y: 640,
    fontSize: 8,
    active: false,
  },
  lieux: {
    x: 90,
    y: 643,
    fontSize: 12,
    active: false,
  },
  hours: {
    x: 175,
    y: 643,
    fontSize: 12,
    active: false,
  },
  sexe: {
    x: 261,
    fontSize: 14,
    type: "circle",
    y: -1,
    active: false,
    circleWidth: 14,
  },
  competition: {
    x: -1,
    fontSize: 14,
    type: "circle",
    y: 659,
    active: false,
    circleWidth: 33,
  },
  niveau: {
    x: -1,
    fontSize: 14,
    type: "circle",
    y: 641,
    active: false,
    circleWidth: 18,
  },
};

function getXcompetition(typeCompetition: string): number {
  const positions: Record<string, number> = {
    Internat: 363,
    Champ: 404,
    Coupe: 446,
    Amical: 487,
    Magnus: 528,
  };

  return positions[typeCompetition] ?? 0;
}

function getXniveau(niveau: string): number {
  const positions: Record<string, number> = {
    élite: 311,
    D1: 361,
    D2: 382,
    D3: 406,
    U20: 423,
    U17: 443,
    U15: 464,
    U13: 485,
    U11: 505,
    U09: 526,
    Loisir: 556,
  };

  return positions[niveau] ?? 0;
}

export function getPdfTemplate(globalInfo: FormData): Record<string, FieldPdf> {
  const pdfTemplateMap = { ...PdfTemplateMap };

  if (globalInfo.lieux) {
    pdfTemplateMap["lieux"].text = globalInfo.lieux;
    pdfTemplateMap["lieux"].active = true;
  }

  if (globalInfo.datetime) {
    pdfTemplateMap["date"].text = getSpecialFormatDateFromDatetime(
      globalInfo.datetime,
      "DD/MM/YYYY",
    );
    pdfTemplateMap["date"].active = true;
  }

  if (globalInfo.datetime) {
    pdfTemplateMap["hours"].text = getSpecialFormatDateFromDatetime(
      globalInfo.datetime,
      "HH:mm",
    );
    pdfTemplateMap["hours"].active = true;
  }

  if (globalInfo.sexe) {
    pdfTemplateMap["sexe"].y = globalInfo.sexe === "F" ? 641 : 659;
    pdfTemplateMap["sexe"].active = true;
  }

  if (globalInfo.competition) {
    pdfTemplateMap["competition"].x = getXcompetition(globalInfo.competition);
    pdfTemplateMap["competition"].active = true;
  }

  if (globalInfo.niveau) {
    pdfTemplateMap["niveau"].x = getXniveau(globalInfo.niveau);
    pdfTemplateMap["niveau"].active = true;
  }

  return pdfTemplateMap;
}
