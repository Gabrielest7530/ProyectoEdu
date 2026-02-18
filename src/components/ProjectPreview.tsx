import { exportProjectToWord } from "@/utils/wordExport";
import { ArrowLeft, Download, Share2, Edit3, BookOpen, Target, Users, CheckCircle, Lightbulb, GraduationCap, Compass, Crosshair, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { exportProjectToPDF } from "@/lib/pdfExport";

interface ProjectPreviewProps {
  project: any;
  onBack: () => void;
}

const SectionCard = ({ icon: Icon, title, color, children }: { icon: any; title: string; color: string; children: React.ReactNode }) => (
  <Card className="overflow-hidden">
    <CardHeader className="pb-3">
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="font-sans text-base font-semibold">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="pt-0">{children}</CardContent>
  </Card>
);

const ProjectPreview = ({ project, onBack }: ProjectPreviewProps) => {
  return (
    <div className="container max-w-4xl py-8 space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Regresar
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Edit3 className="h-4 w-4" /> Editar
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info("Función disponible próximamente")}>
            <Share2 className="h-4 w-4" /> Compartir
          </Button>
          <Button size="sm" className="gap-2" onClick={() => { exportProjectToPDF(project); toast.success("PDF descargado"); }}>
            <Download className="h-4 w-4" /> Descargar PDF
          </Button>
        </div>
      </div>

      {/* Project Title Card */}
      <Card className="gradient-hero text-primary-foreground overflow-hidden">
        <CardContent className="p-8 space-y-3">
          <Badge className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 border-0">
            Proyecto Didáctico
          </Badge>
          <h1 className="font-display text-2xl font-bold md:text-3xl">{project.titulo}</h1>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.campos.map((c: string) => (
              <span key={c} className="rounded-full bg-primary-foreground/15 px-3 py-1 text-sm">{c}</span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Propósito del Proyecto */}
      {project.proposito && (
        <SectionCard icon={Crosshair} title="Propósito del Proyecto" color="bg-primary/15 text-primary">
          <p className="text-sm leading-relaxed text-muted-foreground">{project.proposito}</p>
        </SectionCard>
      )}

      {/* Justificación */}
      <SectionCard icon={Lightbulb} title="Justificación Pedagógica" color="bg-secondary/20 text-secondary">
        <p className="text-sm leading-relaxed text-muted-foreground">{project.justificacion}</p>
      </SectionCard>

      {/* Contextualización */}
      <SectionCard icon={Users} title="Contextualización" color="bg-warm/20 text-warm">
        <p className="text-sm leading-relaxed text-muted-foreground">{project.contextualizacion}</p>
      </SectionCard>

      {/* Problema */}
      <SectionCard icon={Target} title="Planteamiento del Problema" color="bg-destructive/10 text-destructive">
        <p className="text-sm leading-relaxed text-muted-foreground">{project.problema}</p>
      </SectionCard>

      {/* Contenidos y PDA */}
      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard icon={BookOpen} title="Contenidos Seleccionados" color="bg-primary/10 text-primary">
          <ul className="space-y-2">
            {project.contenidos.map((c: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {c}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard icon={GraduationCap} title="PDA Seleccionados" color="bg-accent text-accent-foreground">
          <ul className="space-y-2">
            {project.pda.map((p: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-foreground" />
                {p}
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* Ejes Articuladores */}
      <Card>
        <CardContent className="p-5">
          <p className="mb-3 text-sm font-semibold">Ejes Articuladores</p>
          <div className="flex flex-wrap gap-2">
            {project.ejes.map((e: string) => (
              <Badge key={e} variant="secondary">{e}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metodologías */}
      {project.metodologias && project.metodologias.length > 0 && (
        <SectionCard icon={Compass} title="Metodologías Activas (NEM)" color="bg-secondary/15 text-secondary">
          <ul className="space-y-2">
            {project.metodologias.map((m: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                {m}
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {/* Secuencia Didáctica */}
      <SectionCard icon={Target} title="Secuencia de Actividades" color="bg-primary/10 text-primary">
        <div className="space-y-6">
          {project.fases.map((fase: any, i: number) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-sans text-sm font-semibold">{fase.nombre}</h4>
                <span className="text-xs text-muted-foreground">{fase.duracion}</span>
              </div>
              <ul className="space-y-2 pl-1">
                {fase.actividades.map((a: string, j: number) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {j + 1}
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
              {i < project.fases.length - 1 && <Separator className="mt-5" />}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Libros de Texto Gratuitos */}
      {project.librosTexto && project.librosTexto.length > 0 && (
        <SectionCard icon={Library} title="Integración de Libros de Texto Gratuitos" color="bg-warm/15 text-warm">
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground italic">
              Se sugiere consultar los siguientes materiales de la SEP para enriquecer las actividades y vincular los contenidos del programa con los libros de texto:
            </p>
            {project.librosTexto.map((item: { campo: string; libros: string[] }, i: number) => (
              <div key={i}>
                <p className="text-sm font-semibold mb-2">{item.campo}</p>
                <ul className="space-y-1.5">
                  {item.libros.map((libro: string, j: number) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4 mt-0.5 shrink-0 text-warm" />
                      {libro}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Estrategia Nacional & Inclusión */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-secondary/30 bg-secondary/5">
          <CardContent className="p-5 space-y-2">
            <p className="text-sm font-semibold">Estrategia Nacional SEP</p>
            <p className="text-sm text-muted-foreground">{project.estrategiaNacional}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 space-y-3">
            <p className="text-sm font-semibold">Inclusión y Diversidad</p>
            <ul className="space-y-1">
              {project.inclusion.map((item: string, i: number) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Evaluación */}
      <SectionCard icon={CheckCircle} title="Evaluación" color="bg-success/10 text-success">
        <div className="space-y-5">
          <div>
            <p className="text-sm font-semibold mb-2">Productos Finales</p>
            <div className="flex flex-wrap gap-2">
              {project.productos.map((p: string) => (
                <Badge key={p} variant="outline">{p}</Badge>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-semibold mb-1">Evaluación Formativa</p>
            <p className="text-sm text-muted-foreground">{project.evaluacion.formativa}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-semibold mb-2">Criterios de Evaluación</p>
            <ul className="space-y-2">
              {project.evaluacion.criterios.map((c: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* Bottom Actions */}
      <div className="flex justify-center gap-3 pb-8">
        <Button
          variant="outline"
          size="lg"
          className="gap-2"
          onClick={async () => {
            await exportProjectToWord(project);
            toast.success("Documento Word descargado");
          }}
        >
          <Download className="h-4 w-4" /> Descargar Word
        </Button>
        <Button size="lg" className="gap-2" onClick={() => { exportProjectToPDF(project); toast.success("PDF descargado"); }}>
          <Download className="h-4 w-4" /> Descargar PDF
        </Button>
      </div>
    </div>
  );
};

export default ProjectPreview;
