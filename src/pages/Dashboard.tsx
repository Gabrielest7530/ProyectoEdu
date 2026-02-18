import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Clock, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/AppLayout";
import { storage, Project } from "@/lib/storage";

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Cargar los proyectos reales al entrar al Dashboard
    const savedProjects = storage.getProjects();
    setProjects(savedProjects);
  }, []);

  const stats = [
    { label: "Proyectos Creados", value: projects.length.toString(), icon: BookOpen, color: "text-primary" },
    { label: "Tiempo Ahorrado", value: `~${projects.length * 3} hrs`, icon: Clock, color: "text-secondary" },
    { label: "Compartidos", value: "0", icon: Users, color: "text-warm" },
  ];

  return (
    <AppLayout>
      <div className="container py-8 space-y-8">
        {/* Welcome */}
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-bold">¡Bienvenido, Docente!</h1>
          <p className="text-muted-foreground">Tus planeaciones integrales en un solo lugar</p>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center">
          {/* Solo Modo Asistido */}
          <Link to="/generar?modo=asistido" className="w-full max-w-lg">
            <Card className="group cursor-pointer border-2 border-transparent transition-all hover:border-primary hover:shadow-lg">
              <CardContent className="flex items-center gap-5 p-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <FileText className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-sans text-lg font-semibold">Modo Asistido</h3>
                  <p className="text-sm text-muted-foreground">Configura cada detalle de tu proyecto paso a paso</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Projects */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Proyectos Recientes</h2>
            <Link to="/proyectos">
              <Button variant="ghost" size="sm">Ver todos</Button>
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12 border rounded-xl border-dashed">
              <p className="text-muted-foreground">Aún no has creado proyectos. ¡Empieza uno hoy!</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <Card key={project.id} className="group cursor-pointer transition-all hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                        {project.grado}° {project.nivel}
                      </span>
                      <span className="text-xs text-muted-foreground">{project.fecha}</span>
                    </div>
                    <CardTitle className="font-sans text-base font-semibold leading-snug">
                      {project.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">{project.campo}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
