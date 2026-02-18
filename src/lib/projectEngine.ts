// Motor de Generación de Proyectos - "El Cerebro de la App"
// Este archivo procesa lo que el docente elige y construye el proyecto usando la base de datos pedagógica.

import * as data from "./pedagogicData";

export interface ProjectParams {
    nivel: string;
    grado: string;
    selectedCampos: string[];
    problema: string;
    contexto: string;
    selectedRecursos: string[];
    selectedCaracteristicas: string[];
    selectedMetodologias: string[];
}

// --------------------
// 1. Detector de Temas
// --------------------
function detectarTematica(problema: string): string {
    const lower = (problema || "").toLowerCase();
    if (/contamin|basura|desech|residuo|plástico/.test(lower)) return "contaminacion";
    if (/agua|río|arroyo|sequía|inundac/.test(lower)) return "agua";
    if (/aliment|nutri|comida|hambre|obesidad|huerto|desnutri/.test(lower)) return "alimentacion";
    if (/violen|bully|acoso|conflicto|paz|conviven/.test(lower)) return "violencia";
    if (/salud|enferm|higiene|vacun|prevenc|doctor/.test(lower)) return "salud";
    if (/cultur|tradici|lengua|costumbre|identidad|patrimonio|indígen/.test(lower)) return "cultura";
    if (/tecnolog|digital|internet|celular|pantalla|red/.test(lower)) return "tecnologia";
    return "default";
}

// --------------------
// 2. Generador de Títulos
// --------------------
function generarTitulo(tematica: string, camposCount: number): string {
    const titulos = data.titulosPorProblematica[tematica] || data.titulosPorProblematica.default;
    const idx = camposCount > 2 ? 2 : camposCount > 1 ? 1 : 0;
    return titulos[idx % titulos.length];
}

// --------------------
// 3. Justificación Pedagógica
// --------------------
function generarJustificacion(params: any): string {
    const { problema, campos, nivel, grado, contexto, caracteristicas } = params;

    const gradoText = grado ? `${grado}° grado de ${nivel || "primaria"}` : nivel || "educación básica";
    const camposText = campos.length > 0 ? campos.join(", ") : "los campos formativos";
    const contextoText = contexto ? `contexto ${contexto.toLowerCase()}` : "contexto comunitario";
    const caracText = (caracteristicas && caracteristicas.length > 0) ? `, atendiendo características como ${caracteristicas.join(", ").toLowerCase()}` : "";

    return `Este proyecto surge de la necesidad identificada en ${gradoText}: "${problema || "una problemática comunitaria relevante"}". Se articula desde ${camposText} para ofrecer una experiencia educativa integral en un ${contextoText}${caracText}. Desde la perspectiva de la Nueva Escuela Mexicana, se busca que los estudiantes sean agentes de transformación de su realidad, vinculando los aprendizajes escolares con las necesidades reales de su comunidad.`;
}

// --------------------
// 4. Generador de Fases y Actividades Creativas
// --------------------
const ltgDatabase: Record<string, any[]> = {
    contaminacion: [
        { libro: "Proyectos Comunitarios", proyecto: "¡Cuidamos el agua en nuestra comunidad!", pagina: "45-52" },
        { libro: "Proyectos del Aula", proyecto: "Guardianes de la naturaleza", pagina: "22-30" },
        { libro: "Nuestros Saberes", proyecto: "Residuos y reciclaje", pagina: "110-115" }
    ],
    agua: [
        { libro: "Proyectos del Aula", proyecto: "¿A dónde va el agua?", pagina: "88-95" },
        { libro: "Proyectos Escolares", proyecto: "Comunidad por el agua", pagina: "34-40" }
    ],
    alimentacion: [
        { libro: "Proyectos Comunitarios", proyecto: "Comer bien, vivir mejor", pagina: "12-18" },
        { libro: "Múltiples Lenguajes", proyecto: "Delicias de mi tierra", pagina: "56-60" }
    ],
    violencia: [
        { libro: "Proyectos Escolares", proyecto: "Círculos de paz", pagina: "154-162" },
        { libro: "Proyectos del Aula", proyecto: "Respeto y convivencia", pagina: "40-48" }
    ],
    salud: [
        { libro: "Nuestros Saberes", proyecto: "Higiene y prevención", pagina: "70-75" },
        { libro: "Proyectos del Aula", proyecto: "Mi cuerpo sano", pagina: "10-18" }
    ],
    cultura: [
        { libro: "Múltiples Lenguajes", proyecto: "Mitos y leyendas", pagina: "20-25" },
        { libro: "Proyectos Comunitarios", proyecto: "Nuestras raíces", pagina: "90-98" }
    ],
    tecnologia: [
        { libro: "Proyectos Escolares", proyecto: "Mundo digital", pagina: "130-140" },
        { libro: "Nuestros Saberes", proyecto: "Máquinas e invenciones", pagina: "45-50" }
    ],
    default: [
        { libro: "Proyectos Comunitarios", proyecto: "Mi comunidad activa", pagina: "10-20" }
    ]
};

function generarFases(problema: string, metodologia: string) {
    const tematica = detectarTematica(problema);
    const ltgOptions = ltgDatabase[tematica] || ltgDatabase.default;

    const obtenerLTG = (index: number) => {
        const item = ltgOptions[index % ltgOptions.length];
        return `Vinculación con el Libro de Texto:\nLibro: ${item.libro}\nProyecto: '${item.proyecto}'\nPágina: ${item.pagina}`;
    };

    const crearDia = (numero: number, fase: string, propósito: string, actividad: string, estrategia: string, evidencia: string) => {
        return `Día ${numero}\n\nFase: ${fase}\nPropósito: ${propósito}\nActividad detallada (4 horas completas): ${actividad}\nEstrategia creativa: ${estrategia}\nEvidencia esperada: ${evidencia}\n${obtenerLTG(numero)}`;
    };

    if (metodologia.includes("Aprendizaje-Servicio") || metodologia === "AS") {
        const fasesAS = [
            "Punto de partida",
            "Lo que sé y lo que quiero saber",
            "Organicemos las actividades",
            "Creatividad en marcha (Acción)",
            "Compartamos y evaluamos lo aprendido"
        ];

        return [
            {
                nombre: fasesAS[0],
                duracion: "2 días",
                actividades: [
                    crearDia(1, fasesAS[0], "Identificar la problemática real.", `Exploración y diálogo reflexivo sobre "${problema}" y su impacto en la comunidad inmediata.`, "Círculo de diálogo con preguntas generadoras.", "Mapa mental de la problemática."),
                    crearDia(2, fasesAS[0], "Sensibilización del grupo.", "Recorrido por la zona escolar para documentar la problemática con fotografías o dibujos.", "Safari fotográfico.", "Álbum de evidencias visuales.")
                ]
            },
            {
                nombre: fasesAS[1],
                duracion: "2 días",
                actividades: [
                    crearDia(3, fasesAS[1], "Recuperar saberes previos.", "Investigación bibliográfica y entrevistas a expertos o miembros de la comunidad.", "Laboratorio de curiosidad.", "Cuestionario de saberes."),
                    crearDia(4, fasesAS[1], "Definir objetivos de servicio.", "Plenaria para decidir el alcance del servicio y lo que se desea transformar.", "Lluvia de metas.", "Cronograma de aprendizaje.")
                ]
            },
            {
                nombre: fasesAS[2],
                duracion: "2 días",
                actividades: [
                    crearDia(5, fasesAS[2], "Planificar acciones.", "Distribución de roles y comisiones para la ejecución del plan de servicio.", "Roles cooperativos.", "Organigrama del proyecto."),
                    crearDia(6, fasesAS[2], "Gestionar recursos.", "Colecta y preparación de materiales necesarios para la intervención comunitaria.", "Gestión de apoyos.", "Lista de cotejo de recursos.")
                ]
            },
            {
                nombre: fasesAS[3],
                duracion: "2 días",
                actividades: [
                    crearDia(7, fasesAS[3], "Ejecución del servicio.", "Implementación directa de las acciones diseñadas para impactar positivamente.", "Intervención activa.", "Diario de campo."),
                    crearDia(8, fasesAS[3], "Ajuste y mejora.", "Evaluación parcial de la intervención y ajustes en tiempo real según la respuesta social.", "Taller de mejora continua.", "Registro de ajustes.")
                ]
            },
            {
                nombre: fasesAS[4],
                duracion: "2 días",
                actividades: [
                    crearDia(9, fasesAS[4], "Socialización de resultados.", "Presentación del pacto logrado y las transformaciones observadas ante la comunidad.", "Feria de resultados.", "Memoria técnica visual."),
                    crearDia(10, fasesAS[4], "Evaluación final.", "Reflexión individual y colectiva sobre los aprendizajes adquiridos y el impacto social.", "Escalera de la metacognición.", "Rúbrica de autoevaluación.")
                ]
            }
        ];
    } else {
        // Default: ABP
        const fasesABP = ["Planificación", "Estructuración", "Ejecución", "Presentación"];

        return [
            {
                nombre: fasesABP[0],
                duracion: "2 días",
                actividades: [
                    crearDia(1, fasesABP[0], "Lanzamiento del proyecto.", "Presentación del desafío relacionado con \"" + problema + "\" y generación de interés.", "Gamificación de inicio.", "Contrato de compromiso."),
                    crearDia(2, fasesABP[0], "Diseño del plan.", "Formulación de preguntas clave y definición de los productos finales esperados.", "Andamiaje de ideas.", "Esquema del proyecto.")
                ]
            },
            {
                nombre: fasesABP[1],
                duracion: "3 días",
                actividades: [
                    crearDia(3, fasesABP[1], "Indagación profunda.", "Búsqueda y selección de información en diversas fuentes (libros, digital, entrevistas).", "Caza del tesoro informativa.", "Fichas de investigación."),
                    crearDia(4, fasesABP[1], "Análisis y síntesis.", "Procesamiento de la información recolectada y debate sobre posibles soluciones.", "Debate de expertos.", "Cuadro comparativo."),
                    crearDia(5, fasesABP[1], "Desarrollo técnico.", "Bocetaje inicial de los productos y validación con los criterios de evaluación.", "Clínica de retroalimentación.", "Boceto del producto.")
                ]
            },
            {
                nombre: fasesABP[2],
                duracion: "3 días",
                actividades: [
                    crearDia(6, fasesABP[2], "Producción concreta.", "Construcción y elaboración del producto final aplicando los conocimientos adquiridos.", "Laboratorio creativo.", "Producto en proceso."),
                    crearDia(7, fasesABP[2], "Refinamiento.", "Revisión entre pares y aplicación de mejoras al producto final.", "Protocolo de revisión Crítica Amiga.", "Checklist de calidad."),
                    crearDia(8, fasesABP[2], "Ensayo general.", "Preparación de la puesta en escena o presentación pública de los hallazgos.", "Simulacro de exposición.", "Guion de presentación.")
                ]
            },
            {
                nombre: fasesABP[3],
                duracion: "2 días",
                actividades: [
                    crearDia(9, fasesABP[3], "Demostración pública.", "Presentación de los resultados finales ante una audiencia real (padres, otros grupos).", "Expo-Proyecto.", "Carpeta de evidencias."),
                    crearDia(10, fasesABP[3], "Reflexión y cierre.", "Evaluación del proceso, los aprendizajes y el impacto del proyecto.", "Círculo de reflexión.", "Bitácora final.")
                ]
            }
        ];
    }
}

// --------------------
// 5. Función Principal (Motor de Proyectos)
// --------------------
export function generarProyectoDinamico(params: ProjectParams) {
    const {
        nivel,
        grado,
        selectedCampos,
        problema,
        contexto,
        selectedCaracteristicas,
        selectedMetodologias,
    } = params;

    const tematica = detectarTematica(problema);

    const campos = selectedCampos.length > 0 ? selectedCampos : ["Saberes y Pensamiento Científico"];
    const nivelFinal = nivel || "primaria";
    const nivelKey = nivelFinal === "preescolar" || nivelFinal === "secundaria" ? nivelFinal : "primaria";
    const metodologiaActiva = (selectedMetodologias && selectedMetodologias.length > 0) ? selectedMetodologias[0] : "Aprendizaje Basado en Proyectos";

    return {
        id: Date.now().toString(),
        titulo: generarTitulo(tematica, campos.length),
        proposito: `Fortalecer aprendizajes relacionados con ${campos.join(" y ")} a través de la intervención en ${problema}.`,
        justificacion: generarJustificacion({
            problema: problema,
            campos,
            nivel: nivelFinal,
            grado,
            contexto,
            caracteristicas: selectedCaracteristicas,
        }),
        contextualizacion: data.contextosDesc[contexto] || "Contexto escolar diverso.",
        problema: problema || "Problemática detectada.",
        campos,
        metodologias: (selectedMetodologias && selectedMetodologias.length > 0) ? selectedMetodologias : ["Aprendizaje Basado en Proyectos"],
        contenidos: campos.flatMap((c) => data.contenidosPorCampo[c]?.[nivelKey] || []),
        pda: campos.flatMap((c) => data.pdaPorCampo[c]?.[nivelKey] || []),
        ejes: ["Pensamiento Crítico", "Inclusión"],
        fases: generarFases(problema, metodologiaActiva),
        estrategiaNacional: data.estrategiasNacionales[tematica] || data.estrategiasNacionales.default,
        inclusion: ["Actividades diferenciadas", "Roles rotativos"],
        productos: ["Mural", "Portafolio"],
        evaluacion: {
            formativa: "Observación técnica y dinámica de grupo",
            criterios: ["Participación", "Comprensión", "Creatividad", "Colaboración"],
        },
        fecha: new Date().toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" }),
        nivel: nivelFinal,
        grado: grado,
    };
}
