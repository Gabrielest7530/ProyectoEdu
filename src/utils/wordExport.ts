import { Document, Packer, Paragraph, HeadingLevel, TextRun } from "docx";
import { saveAs } from "file-saver";
import type { Project } from "@/lib/storage";

export async function exportProjectToWord(project: any) {
    if (!project) return;

    const children: Paragraph[] = [];

    // ===== TÍTULO =====
    children.push(
        new Paragraph({
            text: project.titulo || project.title || "Proyecto sin título",
            heading: HeadingLevel.TITLE,
            spacing: { after: 300 },
        })
    );

    // ===== INFORMACIÓN GENERAL =====
    const addInfoSection = (label: string, value: string) => {
        if (value) {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: label + ": ", bold: true }),
                        new TextRun({ text: value }),
                    ],
                    spacing: { after: 120 },
                })
            );
        }
    };

    addInfoSection("Grado", project.grado ? `${project.grado}°` : "");
    addInfoSection("Nivel", project.nivel);
    addInfoSection("Campos Formativos", project.campos?.join(", "));
    addInfoSection("Metodología", project.metodologia || (project.metodologias?.join(", ")));

    // ===== PROPÓSITO Y JUSTIFICACIÓN =====
    if (project.proposito) {
        children.push(
            new Paragraph({ text: "Propósito", heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 120 } }),
            new Paragraph({ text: project.proposito, spacing: { after: 200 } })
        );
    }

    if (project.justificacion) {
        children.push(
            new Paragraph({ text: "Justificación Pedagógica", heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 120 } }),
            new Paragraph({ text: project.justificacion, spacing: { after: 200 } })
        );
    }

    // ===== CONTENIDOS Y PDA =====
    if (project.contenidos?.length > 0) {
        children.push(
            new Paragraph({ text: "Contenidos", heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 120 } })
        );
        project.contenidos.forEach((c: string) => {
            children.push(new Paragraph({ text: c, bullet: { level: 0 } }));
        });
    }

    if (project.pda?.length > 0) {
        children.push(
            new Paragraph({ text: "PDA (Procesos de Desarrollo de Aprendizaje)", heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 120 } })
        );
        project.pda.forEach((p: string) => {
            children.push(new Paragraph({ text: p, bullet: { level: 0 } }));
        });
    }

    // ===== SECUENCIA DIDÁCTICA (FASES) =====
    if (project.fases && Array.isArray(project.fases)) {
        children.push(
            new Paragraph({
                text: "Secuencia Didáctica",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 400, after: 200 },
            })
        );

        project.fases.forEach((fase: any) => {
            children.push(
                new Paragraph({
                    text: `${fase.nombre || "Fase"} (${fase.duracion || ""})`,
                    heading: HeadingLevel.HEADING_3,
                    spacing: { before: 200, after: 120 },
                })
            );

            if (fase.actividades && Array.isArray(fase.actividades)) {
                fase.actividades.forEach((activity: string) => {
                    children.push(
                        new Paragraph({
                            text: activity,
                            bullet: { level: 0 },
                            spacing: { after: 100 },
                        })
                    );
                });
            }
        });
    }

    // ===== LIBROS DE TEXTO =====
    if (project.librosTexto?.length > 0) {
        children.push(
            new Paragraph({ text: "Vinculación con Libros de Texto", heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 120 } })
        );
        project.librosTexto.forEach((item: any) => {
            children.push(new Paragraph({
                children: [new TextRun({ text: item.campo, bold: true })],
                spacing: { before: 100 }
            }));
            item.libros.forEach((libro: string) => {
                children.push(new Paragraph({ text: libro, bullet: { level: 0 } }));
            });
        });
    }

    const doc = new Document({
        sections: [
            {
                children,
            },
        ],
    });

    const blob = await Packer.toBlob(doc);
    const fileName = (project.titulo?.replace(/\s+/g, "_") || "Proyecto") + ".docx";
    saveAs(blob, fileName);
}
