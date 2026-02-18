import { useEffect, useState } from "react";
import { BookOpen, Clock, Trash2, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AppLayout from "@/components/AppLayout";
import ProjectPreview from "@/components/ProjectPreview";
import { toast } from "sonner";
import { storage, Project } from "@/lib/storage";

const MisProyectos = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Cargar proyectos al iniciar la página
    setProjects(storage.getProjects());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening the project when deleting
    storage.deleteProject(id);
    setProjects(storage.getProjects());
    toast.success("Proyecto eliminado correctamente");
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedProject) {
    return (
      <AppLayout>
        <ProjectPreview project={selectedProject} onBack={() => setSelectedProject(null)} />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container py-8 space-y-6">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-bold">Mis Proyectos</h1>
          <p className="text-muted-foreground">Historial completo de tus planeaciones generadas</p>
        </div>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-accent/10 rounded-2xl border-2 border-dashed">
            <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No tienes proyectos guardados todavía.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group relative transition-all hover:shadow-md cursor-pointer hover:border-primary/50"
                onClick={() => handleViewProject(project)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                      {project.grado}° {project.nivel}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {project.fecha}
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive transition-colors"
                            onClick={(e) => e.stopPropagation()} // Stop propagation on trigger button
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar este proyecto?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Se eliminará permanentemente "{project.titulo}". No podrás recuperarlo después.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Mejor no</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={(e) => handleDelete(project.id, e)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Sí, eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <CardTitle className="font-sans text-base font-semibold leading-snug pt-2">
                    {project.titulo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    {project.campo}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default MisProyectos;
