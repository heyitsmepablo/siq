import { writeFileSync } from 'fs';
import { resolve } from 'path';
import * as XLSX from 'xlsx';

interface Requirement {
  number: number;
  description: string;
  guidence: string;
  suggestion: string;
}

interface Level {
  levelNumber: number;
  levelDescription: string;
  requirements?: Requirement[];
}

interface Subsection {
  code: string;
  name: string;
  description: string;
  levels: Level[];
}

interface Section {
  code: string;
  subsections: Subsection[];
}

function parseSection(text: string): { code: string } | null {
  if (!text) return null;

  // Caso 1: código no formato 1, 2, 3 etc.
  const codeRegex = /^(\d+)/;
  const match = text.match(codeRegex);
  if (match) {
    return { code: match[1] };
  }

  // Caso 2: texto com "Nível X" ou "EXTRA"
  const nivelRegex = /(Nível\s*\d+|EXTRA)/i;
  if (nivelRegex.test(text)) {
    return { code: 'EXTRA' };
  }

  return null;
}

function parseSubsection(text: string): Subsection | null {
  if (!text) return null;

  // Primeiro tenta o padrão de subseção normal (1.1 - Nome)
  const subsectionRegex = /^Subseção\s+([\d.]+)\s*-\s*(.+)$/i;
  const subsectionMatch = text.match(subsectionRegex);

  if (subsectionMatch) {
    const [, code, name] = subsectionMatch;
    return {
      code,
      name: name.trim(),
      description: '',
      levels: [],
    };
  }

  // Se não encontrar, tenta o padrão "Nível X\r\nNome"
  const nivelRegex = /^Nível\s*(\d+)\s*\r?\n\s*(.+)$/i;
  const nivelMatch = text.match(nivelRegex);

  if (nivelMatch) {
    const [, levelNumber, name] = nivelMatch;
    return {
      code: `Nivel ${levelNumber}`,
      name: name.trim(),
      description: '',
      levels: [],
    };
  }

  return null;
}

function parseSubsectionDescription(text: string): string | null {
  const regex = /^Descrição:\s*(.+)$/i;
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}

function parseLevel(text: string): Level | null {
  if (!text) return null;
  const regex = /^Padrão Nível\s+(\d+):\s*(.+)$/i;
  const match = text.match(regex);
  return match
    ? {
        levelNumber: parseInt(match[1], 10),
        levelDescription: match[2].trim(),
        requirements: [],
      }
    : null;
}

function parseRequirement(row: string[]): Requirement {
  return {
    number: parseInt(row[0], 10),
    description: (row[1] ?? '').trim(),
    guidence: (row[2] ?? '').trim(),
    suggestion: (row[3] ?? '').trim(),
  };
}

function isRequirementRow(row: string[]): boolean {
  const number = parseInt(row[0], 10);
  return !isNaN(number) && row.length >= 4;
}

function main() {
  const filePath = resolve(__dirname, 'documents', 'Manual_ONA_2022-2025.xlsx');
  const workbook = XLSX.readFile(filePath);
  const sheetNames = workbook.SheetNames;

  const sections: Section[] = [];
  let currentSection: Section | null = null;
  let currentSubsection: Subsection | null = null;
  let currentLevel: Level | null = null;

  for (const sheetName of sheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const jsonSheet = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });

    // Parse da seção (incluindo EXTRA)
    const sectionInfo = parseSection(sheetName);
    if (sectionInfo) {
      currentSection =
        sections.find((s) => s.code === sectionInfo.code) || null;

      if (!currentSection) {
        currentSection = {
          code: sectionInfo.code,
          subsections: [],
        };
        sections.push(currentSection);
      }
    }

    for (const row of jsonSheet) {
      if (!row) continue;

      // Parse de subseções e descrições
      if (row.length === 3) {
        for (const data of row) {
          if (!data) continue;

          // Primeiro tenta parsear como subseção
          const subsection = parseSubsection(data);
          if (subsection && currentSection) {
            currentSubsection = {
              ...subsection,
              description: '', // Inicializa descrição vazia
            };
            currentSection.subsections.push(currentSubsection);
            continue;
          }
        }
      }

      // Parse de níveis
      else if (row.length === 1 && currentSubsection) {
        const data = row[0];
        if (!data) continue;

        // Se não for subseção, tenta parsear como descrição
        const description = parseSubsectionDescription(data);
        if (description && currentSubsection) {
          currentSubsection.description = description;
        }

        const level = parseLevel(data);
        if (level) {
          currentSubsection.levels.push(level);
          currentLevel = level;
        }
      }

      // Parse de requisitos
      else if (row.length === 4 && currentLevel) {
        if (isRequirementRow(row)) {
          const requirement = parseRequirement(row);
          currentLevel.requirements = currentLevel.requirements || [];
          currentLevel.requirements.push(requirement);
        }
      }
    }
  }

  // Salva o JSON corrigido
  const outputPath = resolve(__dirname, '/documents/', 'manual-ona.json');
  writeFileSync(outputPath, JSON.stringify(sections, null, 2), 'utf-8');
  console.log(`JSON salvo em: ${outputPath}`);
  console.log(
    XLSX.utils.sheet_to_json(workbook.Sheets['Nível 3'], { header: 1 }),
  );
}

main();
