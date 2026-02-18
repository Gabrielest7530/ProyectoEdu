import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, UserPlus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

import { supabase } from "@/lib/supabaseClient";

const Registro = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Por favor completa todos los campos");
            return;
        }

        const dominiosPermitidos = ["@jaliscoedu.mx", "@sej.gob.mx", ".gob.mx", ".edu.mx"];
        const esInstitucional = dominiosPermitidos.some((d) => email.toLowerCase().endsWith(d));

        if (!esInstitucional) {
            toast.error("Solo se permiten correos institucionales oficiales");
            return;
        }

        setIsLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                toast.error(error.message);
                setIsLoading(false);
                return;
            }

            toast.success("¡Registro exitoso! Por favor, verifica tu correo o inicia sesión.");

            setEmail("");
            setPassword("");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            toast.error("Hubo un error al procesar el registro");
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-accent/30 p-4">
            <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
                <CardHeader className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate("/login")} className="h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
                    </div>
                    <CardDescription>
                        Regístrate con tu correo institucional para comenzar
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-5" autoComplete="off">
                        {/* Trampa para autocompletado del navegador */}
                        <input type="text" name="prevent_autofill" style={{ display: 'none' }} tabIndex={-1} />
                        <input type="password" name="prevent_autofill_pass" style={{ display: 'none' }} tabIndex={-1} />

                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Institucional</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="nombre@jaliscoedu.mx"
                                    className="pl-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="new-password"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                    required
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">Mínimo 8 caracteres recomendado</p>
                        </div>

                        <Button type="submit" className="w-full gap-2" size="lg" disabled={isLoading}>
                            {isLoading ? "Procesando..." : "Registrarse"}
                            {!isLoading && <UserPlus className="h-4 w-4" />}
                        </Button>

                        <div className="text-center pt-2">
                            <p className="text-sm text-muted-foreground">
                                ¿Ya tienes una cuenta?{" "}
                                <Link to="/login" className="font-semibold text-primary hover:underline">
                                    Inicia sesión aquí
                                </Link>
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Registro;
