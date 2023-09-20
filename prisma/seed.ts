import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  /*await prisma.current_job_status.createMany({
    data: [
      { state: 'Cesante, busco empleo en TI por primera vez.' },
      { state: 'Cesante, ya he trabajado antes en TI.' },
      { state: 'Tengo trabajo en TI, pero busco otro.' },
      { state: 'Tengo trabajo (en otras áreas), pero busco en TI.' },
    ],
  });*/

  await prisma.target_position.createMany({
    data: [
      { position: 'Desarrollador/a Full Stack' },
      { position: 'Desarrollador/a Back End' },
      { position: 'Desarrollador/a Front End' },
      { position: 'Diseñador/a UX / UX Research o UI' },
      { position: 'Desarrollador/a Móvil' },
      { position: 'Data Scientist o especialista machine learning' },
      { position: 'Ingeniería de Datos' },
      { position: 'Otros' },
    ],
  });

  await prisma.programming_language.createMany({
    data: [
      { language: 'Python' },
      { language: 'JavaScript' },
      { language: 'HTML/CSS' },
      { language: 'Java' },
      { language: 'PHP' },
      { language: 'Ruby' },
      { language: 'Scala/Perl y/o Go' },
      { language: 'C/C++' },
      { language: 'Kotlin' },
      { language: 'Swift' },
      { language: 'C#' },
      { language: 'TypeScript' },
      { language: 'Assembly' },
      { language: 'R' },
      { language: 'Go' },
      { language: 'Bash/Shell' },
    ],
  });

  await prisma.frameworks_or_batabase.createMany({
    data: [
      { technology_name: 'Oracle' },
      { technology_name: 'Cassandra' },
      { technology_name: 'SQLite' },
      { technology_name: 'Redis' },
      { technology_name: 'MongoDB' },
      { technology_name: 'PostgreSQL' },
      { technology_name: 'MySQL' },
      { technology_name: 'Firebase Realtime Database' },
      { technology_name: 'Firebase Firestore' },
      { technology_name: 'MariaDB' },
      { technology_name: 'Microsoft SQL Server' },
      { technology_name: 'JQuery' },
      { technology_name: 'React' },
      { technology_name: 'Spring' },
      { technology_name: 'Angular' },
      { technology_name: 'Vue.js' },
      { technology_name: 'Laravel' },
      { technology_name: 'Django' },
      { technology_name: 'Ruby on Rails' },
      { technology_name: 'ASP.NET o ASP.NET Core' },
      { technology_name: 'Flask' },
      { technology_name: 'Express.js' },
      { technology_name: 'FastAPI' },
      { technology_name: '.Net' },
      { technology_name: 'Node.js' },
    ],
  });

  await prisma.tools.createMany({
    data: [
      { tool: 'Github' },
      { tool: 'Adobe Illustrator' },
      { tool: 'Adobe Photoshop' },
      { tool: 'Adobe XD' },
      { tool: 'AWS' },
      { tool: 'Docker' },
      { tool: 'Figma' },
      { tool: 'GIT' },
      { tool: 'Google Analytics' },
      { tool: 'Google Cloud Plataform' },
      { tool: 'Google Data Studio' },
      { tool: 'Invision' },
      { tool: 'Invision Studio' },
      { tool: 'Jira' },
      { tool: 'Kubernetes' },
      { tool: 'Marvel' },
      { tool: 'Microsoft Excel' },
      { tool: 'Microsoft Azure' },
      { tool: 'Miro' },
      { tool: 'Power BI' },
      { tool: 'Proto.io' },
      { tool: 'Qlik' },
      { tool: 'Sketch' },
      { tool: 'SPSS' },
      { tool: 'Tableau' },
      { tool: 'Unity 3D' },
      { tool: 'Unreal Engine' },
      { tool: 'Zepelin' },
    ],
  });

  await prisma.soft_skills.createMany({
    data: [
      { skill: 'Líder' },
      { skill: 'Resiliente/Perseverante' },
      { skill: 'Comunicación/Sociable' },
      { skill: 'Colaborativo/Empatía' },
      { skill: 'Aprendizaje ágil/Autónomo' },
      { skill: 'Flexible/Adaptable' },
      { skill: 'Responsable' },
      { skill: 'Innovador/Curioso' },
      { skill: 'Negociación' },
      { skill: 'Resolución de problemas' },
      { skill: 'Productividad/Iniciativa' },
    ],
  });

  await prisma.years_experience.createMany({
    data: [
      { years: 'No poseo experiencia laboral' },
      { years: 'Entre 0 a 1 año de experiencia laboral' },
      { years: 'Entre 1 a 2 años de experiencia laboral' },
      { years: 'Entre 1 a 2 años de experiencia laboral' },
      { years: 'Más de 4 años de experiencia laboral' },
    ],
  });

  await prisma.better_current_situation.createMany({
    data: [
      { situation: 'Quiero trabajo desde mi ciudad actual' },
      {
        situation:
          'Estoy disponible para migrar de mi ciudad dentro de mi país',
      },
      { situation: 'Estoy disponible para migrar a otro país' },
    ],
  });

  await prisma.user_role.createMany({
    data: [{ role: 'Administrador' }, { role: 'Talento' }, { role: 'Staff' }],
  });

  await prisma.active_visa.createMany({
    data: [
      { country: 'Estados Unidos' },
      { country: 'Union Europea' },
      { country: 'Mi pais de origen' },
      { country: 'Otros paises' },
    ],
  });

  await prisma.availability.createMany({
    data: [
      { availability: 'Full Time' },
      { availability: 'Part Time' },
      { availability: 'Freelance' },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
