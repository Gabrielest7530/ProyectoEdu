import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Registro from "./pages/Registro"; // ✅ NUEVO
import Dashboard from "./pages/Dashboard";
import GenerarProyecto from "./pages/GenerarProyecto";
import MisProyectos from "./pages/MisProyectos";
import PromptGenerator from "./pages/PromptGenerator";
import NotFound from "./pages/NotFound";

import { AuthProvider, ProtectedRoute } from "@/components/AuthProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <AuthProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/generar"
                  element={
                    <ProtectedRoute>
                      <GenerarProyecto />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/proyectos"
                  element={
                    <ProtectedRoute>
                      <MisProyectos />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/prompt"
                  element={
                    <ProtectedRoute>
                      <PromptGenerator />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
