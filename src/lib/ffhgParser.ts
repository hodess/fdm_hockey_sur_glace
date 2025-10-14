// src/lib/ffhgParser.ts
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs?worker&url";
(pdfjsLib as any).GlobalWorkerOptions.workerSrc = pdfjsWorker;

export type Player = {
  id: string;
  licence?: string;
  firstName: string;
  lastName: string;
  birthYear?: number;
  number?: number;
  position: "G" | "D" | "A";
  captainMark?: "C" | "A";
  line?: number;
};

export async function extractTextFromPDF(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  let all = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((it: any) => ("str" in it ? it.str : ""))
      .join(" ")
      .replace(/\s{2,}/g, " ");
    all += text + "\n";
  }
  return all;
}

// Parse les blocs de type FFHG: "M NOM Prénom ... N° 12345 ... Né(e) le dd/mm/yyyy ..."
export function parseRosterFFHG(text: string): Player[] {
  // normalisation douce
  const t = text
    .replace(/\u00A0/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/•/g, " ")
    .trim();

  // On cherche chaque entête de personne indépendamment
  // 1er groupe: civilité (M, Mme, Mr, M.) — tolérante
  // 2e: NOM en majuscules (accents, tirets)
  // 3e: Prénom (majuscules/minuscules, accents)
  const personHeader =
    /\bM(?:me|r|\.)?\s+([A-ZÉÈÀÂÊÎÔÛÇ' -]+)\s+([A-Za-zÀ-ÖØ-öø-ÿ' -]+)\b/g;

  const players: Player[] = [];
  let m: RegExpExecArray | null;
  const indices: { start: number; lastName: string; firstName: string }[] = [];

  while ((m = personHeader.exec(t)) !== null) {
    indices.push({
      start: m.index,
      lastName: toTitle(m[1].trim()),
      firstName: toTitle(m[2].trim()),
    });
  }

  // Pour chaque personne trouvée, on regarde la fenêtre jusqu'au prochain header (ou la fin du texte)
  for (let i = 0; i < indices.length; i++) {
    const start = indices[i].start;
    const end = i < indices.length - 1 ? indices[i + 1].start : t.length;
    const slice = t.slice(start, end);

    const mLic = slice.match(/N[°o]\s*([0-9]{5,})/i);
    const licence = mLic?.[1];

    const mBirth = slice.match(/Né\(e\)\s*le\s*([0-9]{2})\/([0-9]{2})\/([0-9]{4})/i);
    const birthYear = mBirth ? parseInt(mBirth[3], 10) : undefined;

    players.push({
      id: licence || `${indices[i].lastName}-${indices[i].firstName}-${Math.random().toString(36).slice(2)}`,
      licence,
      firstName: indices[i].firstName,
      lastName: indices[i].lastName,
      birthYear,
      position: "A",
    });
  }

  return players;
}

function toTitle(s: string) {
  return s.toLowerCase().replace(/\b([a-zà-öø-ÿ])/g, (x) => x.toUpperCase());
}
