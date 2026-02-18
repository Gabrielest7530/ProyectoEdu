// Base de conocimientos pedagógicos de ProyectaEdu
// Este archivo contiene los textos y sugerencias que la "IA" utiliza para construir los proyectos.

export const titulosPorProblematica: Record<string, string[]> = {
  contaminacion: ["Guardianes del Medio Ambiente", "Mi Comunidad Limpia y Saludable", "Eco-Detectives: Cuidando Nuestro Entorno"],
  agua: ["Agua para Todos: Cuidemos Nuestro Recurso Vital", "Defensores del Agua en Mi Comunidad", "El Ciclo del Agua y Nuestra Responsabilidad"],
  alimentacion: ["Alimentarnos Bien, Vivir Mejor", "Huerto Escolar: De la Tierra a la Mesa", "Nutrición Comunitaria Saludable"],
  violencia: ["Convivencia en Armonía: Construyendo Paz", "Cultura de Paz en Mi Escuela", "Tejiendo Lazos de Respeto y Empatía"],
  salud: ["Salud Comunitara: Prevenir es Vivir", "Promotores de Salud en Mi Comunidad", "Bienestar para Todos"],
  cultura: ["Rescatando Nuestras Raíces Culturales", "Patrimonio Vivo de Mi Comunidad", "Identidad y Tradición: Nuestras Historias"],
  tecnologia: ["Ciudadanos Digitales Responsables", "Conectados con Propósito", "Tecnología al Servicio de Mi Comunidad"],
  default: ["Transformando Nuestra Comunidad Juntos", "Proyecto Comunitario Integrador", "Aprendiendo con Mi Comunidad"],
};

export const contenidosPorCampo: Record<string, Record<string, string[]>> = {
  Lenguajes: {
    preescolar: ["Expresión oral mediante narrativas comunitarias", "Exploración de textos y cuentos tradicionales", "Creación de mensajes con dibujos y grafías"],
    primaria: ["Producción de textos informativos y narrativos sobre la problemática", "Comprensión lectora de textos relacionados con el contexto comunitario", "Comunicación oral: exposición de ideas y argumentación", "Uso del lenguaje para documentar experiencias y saberes"],
    secundaria: ["Análisis crítico de textos argumentativos", "Producción de reportajes y crónicas comunitarias", "Expresión artística y literaria como herramienta de transformación"],
  },
  "Saberes y Pensamiento Científico": {
    preescolar: ["Exploración del mundo natural a través de los sentidos", "Observación de fenómenos naturales del entorno", "Clasificación de elementos naturales"],
    primaria: ["Investigación científica de fenómenos del entorno comunitario", "Recolección y análisis de datos sobre la problemática", "Relación causa-efecto en situaciones del contexto", "Propuesta de soluciones basadas en evidencia"],
    secundaria: ["Método científico aplicado a problemáticas comunitarias", "Análisis estadístico de datos del entorno", "Desarrollo de prototipos y soluciones tecnológicas"],
  },
  "Ética, Naturaleza y Sociedades": {
    preescolar: ["Reconocimiento de la diversidad en la comunidad", "Normas de convivencia y cuidado del entorno", "Historias y tradiciones de mi familia"],
    primaria: ["Análisis de la problemática desde una perspectiva ética y comunitaria", "Derechos y responsabilidades ciudadanas", "Interculturalidad y respeto a la diversidad", "Historia y memoria colectiva de la comunidad"],
    secundaria: ["Pensamiento crítico sobre problemáticas sociales", "Participación ciudadana y organización comunitaria", "Análisis histórico y geográfico del contexto"],
  },
  "De lo Humano y lo Comunitario": {
    preescolar: ["Reconocimiento de emociones propias y de los demás", "Trabajo colaborativo en actividades grupales", "Cuidado de sí mismo y de los otros"],
    primaria: ["Trabajo colaborativo y organización comunitaria", "Desarrollo socioemocional y empatía", "Identidad personal y sentido de pertenencia", "Participación democrática y toma de decisiones colectivas"],
    secundaria: ["Proyecto de vida y compromiso social", "Liderazgo juvenil y participación comunitaria", "Bienestar emocional y resiliencia"],
  },
};

export const pdaPorCampo: Record<string, Record<string, string[]>> = {
  // ... (He truncado aquí por espacio en el pensamiento, pero incluiré todos los datos en el archivo real)
  Lenguajes: {
    preescolar: ["Expresa ideas y emociones a través del lenguaje oral", "Explora textos diversos y reconoce algunas características", "Produce trazos y grafías con intención comunicativa"],
    primaria: ["Produce textos coherentes relacionados con su contexto comunitario", "Comprende y analiza información de diversas fuentes", "Expone ideas con claridad y argumenta sus puntos de vista", "Utiliza el lenguaje como herramienta de transformación social"],
    secundaria: ["Analiza críticamente discursos y textos de su entorno", "Produce textos argumentativos con fundamento", "Comunica ideas complejas de forma clara y efectiva"],
  },
  "Saberes y Pensamiento Científico": {
    preescolar: ["Observa y describe características de elementos naturales", "Formula preguntas sobre lo que le rodea", "Propone explicaciones sobre fenómenos que observa"],
    primaria: ["Identifica y describe fenómenos naturales de su entorno", "Plantea preguntas y diseña procedimientos para investigar", "Registra y organiza datos de sus observaciones", "Propone acciones fundamentadas para resolver problemáticas"],
    secundaria: ["Aplica el método científico en investigaciones del contexto", "Interpreta datos y formula conclusiones fundamentadas", "Diseña soluciones innovadoras a problemas comunitarios"],
  },
  "Ética, Naturaleza y Sociedades": {
    preescolar: ["Reconoce que las personas tienen diferentes formas de vivir", "Participa en actividades que favorecen la convivencia", "Identifica costumbres y tradiciones de su comunidad"],
    primaria: ["Reconoce la importancia de la participación ciudadana responsable", "Valora la diversidad cultural y natural de su comunidad", "Analiza críticamente situaciones de su contexto social", "Propone soluciones éticas a problemas comunitarios"],
    secundaria: ["Ejerce su ciudadanía de manera informada y responsable", "Analiza problemáticas sociales desde múltiples perspectivas", "Promueve acciones de justicia social en su entorno"],
  },
  "De lo Humano y lo Comunitario": {
    preescolar: ["Identifica sus emociones y las de los demás", "Colabora con otros en actividades compartidas", "Practica hábitos de cuidado personal y del entorno"],
    primaria: ["Trabaja colaborativamente respetando las ideas de los demás", "Desarrolla empatía y solidaridad hacia su comunidad", "Participa en la toma de decisiones de manera democrática", "Fortalece su identidad y sentido de pertenencia comunitaria"],
    secundaria: ["Ejerce liderazgo positivo en su comunidad", "Construye relaciones basadas en el respeto y la empatía", "Diseña proyectos de impacto social con sentido ético"],
  },
};

export const contextosDesc: Record<string, string> = {
  Urbano: "La escuela se encuentra en una zona urbana donde los estudiantes tienen acceso a diversos servicios pero enfrentan retos propios de la vida en la ciudad.",
  Rural: "La escuela se ubica en una comunidad rural donde la relación con la tierra y las tradiciones es fundamental para la vida cotidiana de las familias.",
  Indígena: "La escuela pertenece a una comunidad indígena con una rica cosmovisión, lengua originaria y saberes ancestrales que deben ser valorados y preservados en el proceso educativo.",
  Marginado: "La escuela se localiza en una zona con altos índices de marginación, donde es esencial que la educación responda a las necesidades más urgentes de la comunidad.",
  Migrante: "La escuela atiende a una población con alta movilidad migratoria, lo que requiere estrategias flexibles y sensibles a la diversidad de experiencias de los estudiantes.",
  Multigrado: "La escuela es multigrado, lo que representa una oportunidad para el aprendizaje colaborativo entre estudiantes de diferentes edades y niveles de desarrollo.",
};

export const estrategiasNacionales: Record<string, string> = {
  contaminacion: "Estrategia Nacional de Educación Ambiental para la Sustentabilidad — Vinculando el cuidado del medio ambiente con la formación ciudadana responsable",
  agua: "Estrategia Nacional para el Cuidado del Agua — Promoviendo la conciencia hídrica desde la escuela y la comunidad",
  alimentacion: "Estrategia Nacional de Alimentación Saludable — Fomentando hábitos nutritivos y soberanía alimentaria desde la escuela",
  violencia: "Estrategia Nacional de Convivencia Escolar — Construyendo ambientes de paz, respeto y diálogo en la comunidad educativa",
  salud: "Estrategia Nacional de Salud Pública — Formando promotores de salud comunitaria desde la escuela",
  cultura: "Estrategia Nacional de Lectura y Cultura — Rescatando y valorando la diversidad cultural y lingüística de México",
  tecnologia: "Estrategia Nacional de Educación Digital — Desarrollando ciudadanía digital responsable y creativa",
  default: "Estrategia Nacional vinculada con la formación integral de ciudadanos críticos, participativos y comprometidos con su comunidad",
};
