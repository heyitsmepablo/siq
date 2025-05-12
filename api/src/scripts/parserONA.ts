import { resolve } from 'path';
import * as XLSX from 'xlsx';

export interface Subsection {
  code: string;
  name: string;
}

interface Description {
  description: string;
}

interface Level {
  levelNumber: number;
  levelDescription: string;
}

function parseSubsection(text: string): Subsection | null {
  const regex = /^Subseção\s+([\d.]+)\s*-\s*(.+)$/i;
  const match = text.match(regex);

  if (match) {
    const [, code, name] = match;
    return { code, name: name.trim() };
  }

  return null;
}

function parseDescription(text: string): Description | null {
  const regex = /^Descrição:\s*(.+)$/i;
  const match = text.match(regex);

  if (match) {
    return { description: match[1].trim() };
  }

  return null;
}
function parseLevel(text: string): Level | null {
  const regex = /^Padrão Nível\s+(\d+):\s*(.+)$/i;
  const match = text.match(regex);

  if (match) {
    const [, levelStr] = match;
    return {
      levelNumber: parseInt(levelStr, 10),
      levelDescription: text.trim(),
    };
  }
  return null;
}

function main() {
  const filePath = resolve(
    __dirname, // This gives the directory of the current module
    'documents',
    'Manual_ONA_2022-2025.xlsx',
  );
  const workbook = XLSX.readFile(filePath);
  const sheetNames = workbook.SheetNames;
  let currentDescription!: Description | null;
  let currentLevel!: Level | null;

  for (const sheetName of sheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const jsonSheet = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });
    for (const row of jsonSheet) {
      if (row.length <= 2) {
        for (const data of row) {
          if (parseDescription(data)) {
            currentDescription = parseDescription(data);
          } else {
            currentLevel = parseLevel(data);
          }
          console.log(currentDescription, currentLevel);
        }
      }
    }
  }
}
main();
