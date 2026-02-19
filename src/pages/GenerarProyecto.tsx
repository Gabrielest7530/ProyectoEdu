import { useReducer, useRef, useState } from "react";
import { Zap, FileText, Send, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import AppLayout from "@/components/AppLayout";
import ProjectPreview from "@/components/ProjectPreview";
import { toast } from "sonner";
import { generarProyectoDinamico } from "@/lib/projectEngine";
import { storage } from "@/lib/storage";

// --- Definiciones del Motor de Formulario ---
const camposFormativos = [
  "Lenguajes",
  "Saberes y Pensamiento Científico",
  "Ética, Naturaleza y Sociedades",
  "De lo Humano y lo Comunitario",
];

const contextos = ["Urbano", "Rural", "Indígena", "Marginado", "Migrante", "Multigrado"];

const metodologiasNEM = [
  { id: "abp", nombre: "Aprendizaje Basado en Proyectos Comunitarios (ABP)" },
  { id: "abpr", nombre: "Aprendizaje Basado en Problemas (ABPr)" },
  { id: "steam", nombre: "STEAM con enfoque comunitario" },
  { id: "aps", nombre: "Aprendizaje-Servicio (ApS)" },
  { id: "indagacion", nombre: "Aprendizaje por Indagación" },
  { id: "codiseno", nombre: "Codiseño con la Comunidad" },
];

// Estado inicial unificado
const initialState = {
  nivel: "",
  grado: "",
  selectedCampos: [] as string[],
  problema: "",
  contexto: "",
  selectedRecursos: [] as string[],
  selectedCaracteristicas: [] as string[],
  selectedMetodologias: [] as string[],
  uploadedFile: null as File | null,
};

type State = typeof initialState;
type Action =
  | { type: 'SET_FIELD'; field: keyof State; value: any }
  | { type: 'TOGGLE_LIST'; field: 'selectedCampos' | 'selectedRecursos' | 'selectedCaracteristicas' | 'selectedMetodologias'; value: string }
  | { type: 'RESET' };

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'TOGGLE_LIST':
      const list = state[action.field] as string[];
      const newList = list.includes(action.value)
        ? list.filter(i => i !== action.value)
        : [...list, action.value];
      return { ...state, [action.field]: newList };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// --- Componente Principal ---
const GenerarProyecto = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProject, setGeneratedProject] = useState<any>(null);

  const [state, dispatch] = useReducer(formReducer, initialState);

  const updateField = (field: keyof State, value: any) => dispatch({ type: 'SET_FIELD', field, value });
  const toggleItem = (field: 'selectedCampos' | 'selectedRecursos' | 'selectedCaracteristicas' | 'selectedMetodologias', value: string) =>
    dispatch({ type: 'TOGGLE_LIST', field, value });

  const validateForm = () => {
    if (!state.nivel) return "Por favor selecciona el nivel educativo.";
    if (!state.grado) return "Por favor selecciona el grado escolar.";
    if (state.selectedCampos.length === 0) return "Selecciona al menos un campo formativo.";
    if (!state.problema.trim()) return "Describe el problema de la comunidad.";
    return null;
  };

  const handleGenerate = () => {
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setIsGenerating(true);
    toast.info("Generando proyecto didáctico...");

    setTimeout(() => {
      const project = generarProyectoDinamico({
        ...state
      });

      storage.saveProject(project);

      setGeneratedProject(project);
      setIsGenerating(false);
      toast.success("¡Proyecto generado y guardado exitosamente!");
    }, 2500);
  };

  if (generatedProject) {
    return (
      <AppLayout>
        <ProjectPreview project={generatedProject} onBack={() => setGeneratedProject(null)} />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container max-w-3xl py-8 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="font-display text-3xl font-bold">Generar Proyecto Didáctico</h1>
          <p className="text-muted-foreground">Crea tu proyecto personalizado alineado a la NEM (Modo Asistido)</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Datos del Grupo y Contexto
              </CardTitle>
              <CardDescription>Completa la información básica para tu planeación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nivel Educativo</Label>
                  <Select 
                    value={state.nivel} 
                    onValueChange={(v) => {
                      console.log("Cambiando nivel a:", v);
                      updateField('nivel', v);
                    }}
                  >
                    <SelectTrigger><SelectValue placeholder="Selecciona nivel" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preescolar">Preescolar</SelectItem>
                      <SelectItem value="primaria">Primaria</SelectItem>
                      <SelectItem value="secundaria">Secundaria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Grado Escolar</Label>
                  <Select value={state.grado} onValueChange={(v) => updateField('grado', v)}>
                    <SelectTrigger><SelectValue placeholder="Selecciona grado" /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((g) => (
                        <SelectItem key={g} value={String(g)}>{g}° grado</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Campos Formativos</Label>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {camposFormativos.map((c) => (
                    <label key={c} className="flex items-center gap-2 rounded-lg border p-3 text-sm cursor-pointer hover:bg-accent transition-colors">
                      <Checkbox
                        checked={state.selectedCampos.includes(c)}
                        onCheckedChange={() => toggleItem('selectedCampos', c)}
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Problema o situación de la comunidad</Label>
                <Textarea
                  placeholder="Ejemplo: La falta de cuidado del agua en la escuela..."
                  value={state.problema}
                  onChange={(e) => updateField('problema', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Contexto</Label>
                  <Select value={state.contexto} onValueChange={(v) => updateField('contexto', v)}>
                    <SelectTrigger><SelectValue placeholder="Selecciona contexto" /></SelectTrigger>
                    <SelectContent>
                      {contextos.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Metodología NEM</Label>
                  <Select value={state.selectedMetodologias[0] || ""} onValueChange={(v) => updateField('selectedMetodologias', [v])}>
                    <SelectTrigger><SelectValue placeholder="Selecciona metodología" /></SelectTrigger>
                    <SelectContent>
                      {metodologiasNEM.map((m) => (
                        <SelectItem key={m.id} value={m.nombre}>{m.nombre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleGenerate} className="w-full gap-2" size="lg" disabled={isGenerating}>
            {isGenerating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            {isGenerating ? "Generando..." : "Generar Proyecto"}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default GenerarProyecto;
