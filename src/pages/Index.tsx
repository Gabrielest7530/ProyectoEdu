import { Link } from "react-router-dom";
import { BookOpen, Zap, FileText, Shield, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-education.jpg";

const features = [
  { icon: Zap, title: "Ultra Automático", desc: "Describe una problemática y obtén un proyecto completo en segundos" },
  { icon: FileText, title: "Modo Asistido", desc: "Formulario guiado con todos los datos de tu grupo y contexto" },
  { icon: Shield, title: "Alineado a la NEM", desc: "Campos formativos, PDA, ejes articuladores y estrategias nacionales" },
  { icon: CheckCircle, title: "Listo para Usar", desc: "Descarga en PDF o Word con diseño profesional tipo revista pedagógica" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">ProyectaEdu</span>
        </div>

        <div className="flex gap-2">
          <Link to="/login">
            <Button variant="outline" className="gap-2">
              Iniciar Sesión <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="space-y-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <Zap className="h-4 w-4" /> Nueva Escuela Mexicana
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Proyectos didácticos con{" "}
            <span className="text-gradient">inteligencia artificial</span>
          </h1>

          <p className="max-w-lg text-lg text-muted-foreground">
            Genera proyectos completos, contextualizados y profesionales en segundos.
            Alineados a campos formativos, PDA y ejes articuladores.
          </p>

          <div className="flex gap-3">
            <Link to="/login">
              <Button size="lg" className="gap-2">
                Comenzar Ahora <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative animate-float">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img src={heroImage} alt="Educación e innovación" className="w-full object-cover" />
          </div>

          <div className="absolute -bottom-4 -left-4 rounded-xl glass-card p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success text-success-foreground">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Proyecto Generado</p>
                <p className="text-xs text-muted-foreground">En 30 segundos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/50 py-20">
        <div className="container space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl font-bold">¿Cómo funciona?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dos modos de uso diseñados para ahorrarte tiempo sin sacrificar calidad pedagógica
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-card p-6 shadow-sm space-y-3 transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-sans text-base font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-8 text-center text-sm text-muted-foreground">
        <p>ProyectaEdu · Plataforma educativa para docentes de educación básica en México</p>
      </footer>
    </div>
  );
};

export default Index;
