import { PromptInput } from "./types";

export function buildTemplate(input: PromptInput): string {
  return `
Actúa como experto en educación básica mexicana.

Nivel educativo: ${input.level}
Grado: ${input.grade}
Campo formativo: ${input.campo}

Proyecto educativo:
${input.proyecto}

Objetivo de aprendizaje:
${input.objective}

Diseña un proyecto didáctico completo con las siguientes características:

- El proyecto debe durar EXACTAMENTE 15 días.
- La planeación debe organizarse del Día 1 al Día 15.
- Cada día debe incluir actividades claras y aplicables en el aula.

El proyecto debe incluir:

1. Inicio motivador general del proyecto
2. Desarrollo con actividades activas organizadas por día
3. Cierre reflexivo final
4. Evaluación formativa
5. Materiales necesarios

Organiza las actividades así:

Día 1  
Día 2  
Día 3  
...
Hasta el Día 15

Usa metodologías activas y lenguaje claro para docentes.
`;
}
