import { useState } from "react";
import { generatePrompt } from "@/ai/promptBuilder";
import {
  PromptInput,
  EducationLevel,
  CampoFormativo
} from "@/ai/types";

export default function PromptGenerator() {
  const [form, setForm] = useState<PromptInput>({
    level: "Primaria",
    grade: "",
    campo: "Lenguajes",
    proyecto: "",
    objective: ""
  });

  const [result, setResult] = useState("");

  const handleChange = (
    field: keyof PromptInput,
    value: string
  ) => {
    setForm({ ...form, [field]: value });
  };

  const handleGenerate = () => {
    const output = generatePrompt(form);
    setResult(output);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Generador de Proyecto Educativo</h2>

      <select
        value={form.level}
        onChange={(e) =>
          handleChange(
            "level",
            e.target.value as EducationLevel
          )
        }
      >
        <option>Preescolar</option>
        <option>Primaria</option>
        <option>Secundaria</option>
      </select>

      <input
        placeholder="Grado"
        value={form.grade}
        onChange={(e) =>
          handleChange("grade", e.target.value)
        }
      />

      <select
        value={form.campo}
        onChange={(e) =>
          handleChange(
            "campo",
            e.target.value as CampoFormativo
          )
        }
      >
        <option>Lenguajes</option>
        <option>Saberes y pensamiento científico</option>
        <option>Ética, naturaleza y sociedades</option>
        <option>De lo humano y lo comunitario</option>
      </select>

      <textarea
        placeholder="Describe el proyecto educativo"
        value={form.proyecto}
        onChange={(e) =>
          handleChange("proyecto", e.target.value)
        }
      />

      <textarea
        placeholder="Objetivo de aprendizaje"
        value={form.objective}
        onChange={(e) =>
          handleChange("objective", e.target.value)
        }
      />

      <button onClick={handleGenerate}>
        Generar Proyecto
      </button>

      <pre>{result}</pre>
    </div>
  );
}
