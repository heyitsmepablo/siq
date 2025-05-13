import PrismaSingleton from '../singletons/prisma-singleton/prisma-singleton';
import * as manualOna from './documents/manual-ona.json';

interface Requirement {
  number: number;
  description: string;
  guidence: string;
  suggestion: string;
}

interface Level {
  levelNumber: number;
  levelDescription: string;
  requirements: Requirement[];
}

interface Subsection {
  code: string;
  name: string;
  description: string;
  levels: Level[];
}

interface ManualOnaSection {
  code: string;
  subsections: Subsection[];
}

const prisma = PrismaSingleton.instance.client;

const manualOnaTyped =
  (manualOna as { default?: ManualOnaSection[] }).default ??
  (manualOna as ManualOnaSection[]);

async function main() {
  await prisma.processes.upsert({
    where: { name: 'ONA' },
    update: {},
    create: { name: 'ONA', type: 'certificação' },
  });
  for (const section of manualOnaTyped) {
    await prisma.sections.upsert({
      where: { code: section.code },
      update: {},
      create: { code: section.code, processes: { connect: { name: 'ONA' } } },
    });
    for (const subsection of section.subsections) {
      await prisma.subsections.upsert({
        where: { code: subsection.code, name: subsection.name },
        update: {},
        create: {
          code: subsection.code,
          name: subsection.name,
          description: subsection.description,
          sections: { connect: { code: section.code } },
          levels: {},
        },
      });
      for (const level of subsection.levels) {
        await prisma.levels.upsert({
          where: {
            description: level.levelDescription,
            number: level.levelNumber,
          },
          update: {},
          create: {
            number: level.levelNumber,
            description: level.levelDescription,
            subsections: {
              connect: { code: subsection.code, name: subsection.name },
            },
          },
        });
        for (const requirement of level.requirements) {
          await prisma.requirements.upsert({
            where: {
              description: requirement.description,
            },
            create: {
              description: requirement.description,
              guidence: requirement.guidence,
              suggestion: requirement.suggestion,
              levels: {
                connect: {
                  number: level.levelNumber,
                  description: level.levelDescription,
                },
              },
              subsections: {
                connect: { code: subsection.code, name: subsection.name },
              },
            },
            update: {},
          });
        }
      }
    }
  }
  await prisma.$disconnect();
}
main();
