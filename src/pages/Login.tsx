import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

import { supabase } from "@/lib/supabaseClient";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const dominiosPermitidos = ["@jaliscoedu.mx", "@sej.gob.mx", ".gob.mx", ".edu.mx"];
    const esInstitucional = dominiosPermitidos.some((d) =>
      email.toLowerCase().endsWith(d)
    );

    if (!esInstitucional) {
      toast.error("Solo se permiten correos institucionales (@jaliscoedu.mx, @sej.gob.mx, .gob.mx o .edu.mx)");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message === "Invalid login credentials" ? "Correo o contraseña incorrectos" : error.message);
        setIsLoading(false);
        return;
      }

      toast.success("Inicio de sesión exitoso");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error al iniciar sesión");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden w-1/2 flex-col justify-between gradient-hero p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20">
            <BookOpen className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold text-primary-foreground">ProyectaEdu</span>
        </div>

        <div className="space-y-6">
          <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground">
            Proyectos didácticos<br />
            con inteligencia artificial
          </h1>
          <p className="max-w-md text-lg text-primary-foreground/80">
            Genera proyectos completos alineados a la Nueva Escuela Mexicana en segundos.
            Contextualizados, profesionales y listos para usar.
          </p>
        </div>

        <p className="text-sm text-primary-foreground/60">
          Nueva Escuela Mexicana · Campos Formativos · PDA · Ejes Articuladores
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <Card className="w-full max-w-md border-0 shadow-none">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary lg:hidden">
              <BookOpen className="h-7 w-7 text-primary-foreground" />
            </div>
            <CardTitle className="font-display text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>
              Usa tu correo institucional para acceder
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">

              {/* Campos fantasma para bloquear autocompletado del navegador */}
              <input type="text" name="fakeuser" style={{ display: "none" }} />
              <input type="password" name="fakepass" style={{ display: "none" }} />

              <div className="space-y-2">
                <Label htmlFor="email">Correo Institucional</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email_real"
                    type="email"
                    placeholder="nombre@jaliscoedu.mx"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password_real"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                {isLoading ? "Ingresando..." : "Ingresar"}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Solo se permiten correos institucionales oficiales
              </p>

              <p className="text-sm">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/registro"
                  className="font-semibold text-primary hover:underline"
                >
                  Registrarse
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
