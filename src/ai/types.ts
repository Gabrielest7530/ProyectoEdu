export type EducationLevel =
  | "Preescolar"
  | "Primaria"
  | "Secundaria";

export type CampoFormativo =
  | "Lenguajes"
  | "Saberes y pensamiento científico"
  | "Ética, naturaleza y sociedades"
  | "De lo humano y lo comunitario";

export interface PromptInput {
  level: EducationLevel;
  grade: string;
  campo: CampoFormativo;
  proyecto: string;
  objective: string;
}
