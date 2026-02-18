// Capa de Persistencia - "La Memoria de la App"
// Este archivo permite que los proyectos se guarden en el navegador del docente.

export interface Project {
    id: string;
    titulo: string;
    campo: string; // Para compatibilidad con el dashboard
    campos: string[];
    grado: string;
    nivel: string;
    fecha: string;
    [key: string]: any;
}

const STORAGE_KEY = 'eduproyectos_saved_data';

export const storage = {
    // Guardar un nuevo proyecto
    saveProject: (project: any): void => {
        try {
            const existing = storage.getProjects();
            // Aseguramos que tenga el formato que el Dashboard espera
            const formattedProject = {
                ...project,
                campo: project.campos?.[0] || "General", // Usamos el primer campo para la vista rápida
                title: project.titulo // Alias para compatibilidad
            };

            const updated = [formattedProject, ...existing];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    },

    // Obtener todos los proyectos
    getProjects: (): Project[] => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Error al obtener:", error);
            return [];
        }
    },

    // Eliminar un proyecto por ID
    deleteProject: (id: string): void => {
        try {
            const existing = storage.getProjects();
            const filtered = existing.filter(p => p.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    }
};
