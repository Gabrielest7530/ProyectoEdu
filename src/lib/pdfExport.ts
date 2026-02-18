import jsPDF from "jspdf";

const MARGIN = 20;
const PAGE_W = 210;
const CONTENT_W = PAGE_W - MARGIN * 2;
const LINE_H = 6;
const SECTION_GAP = 10;

const COLORS = {
  primary: [37, 99, 235] as [number, number, number],
  dark: [30, 30, 30] as [number, number, number],
  muted: [100, 100, 100] as [number, number, number],
  light: [245, 245, 245] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  accent: [16, 185, 129] as [number, number, number],
};

function checkPage(doc: jsPDF, y: number, needed = 20): number {
  if (y + needed > 280) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

function addSectionTitle(doc: jsPDF, y: number, title: string): number {
  y = checkPage(doc, y, 20);
  doc.setFillColor(...COLORS.primary);
  doc.roundedRect(MARGIN, y, CONTENT_W, 9, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.white);
  doc.text(title.toUpperCase(), MARGIN + 4, y + 6.5);
  doc.setTextColor(...COLORS.dark);
  return y + 14;
}

function addParagraph(doc: jsPDF, y: number, text: string): number {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.muted);
  const lines = doc.splitTextToSize(text, CONTENT_W - 4);
  for (const line of lines) {
    y = checkPage(doc, y);
    doc.text(line, MARGIN + 2, y);
    y += LINE_H - 1;
  }
  return y + 2;
}

function addBulletList(doc: jsPDF, y: number, items: string[]): number {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.muted);
  for (const item of items) {
    const lines = doc.splitTextToSize(item, CONTENT_W - 10);
    y = checkPage(doc, y, lines.length * (LINE_H - 1) + 2);
    doc.setFillColor(...COLORS.primary);
    doc.circle(MARGIN + 4, y - 1.5, 1.2, "F");
    for (let k = 0; k < lines.length; k++) {
      doc.text(lines[k], MARGIN + 8, y);
      y += LINE_H - 1;
    }
    y += 1;
  }
  return y;
}

function addNumberedList(doc: jsPDF, y: number, items: string[]): number {
  doc.setFontSize(9.5);
  for (let i = 0; i < items.length; i++) {
    const lines = doc.splitTextToSize(items[i], CONTENT_W - 14);
    y = checkPage(doc, y, lines.length * (LINE_H - 1) + 2);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...COLORS.primary);
    doc.text(`${i + 1}.`, MARGIN + 3, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...COLORS.muted);
    for (let k = 0; k < lines.length; k++) {
      doc.text(lines[k], MARGIN + 10, y);
      y += LINE_H - 1;
    }
    y += 1;
  }
  return y;
}

function addSubtitle(doc: jsPDF, y: number, text: string): number {
  y = checkPage(doc, y, 12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.dark);
  doc.text(text, MARGIN + 2, y);
  return y + 6;
}

export function exportProjectToPDF(project: any) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  // ── Header ──
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, PAGE_W, 45, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(200, 220, 255);
  doc.text("PROYECTO DIDÁCTICO · NEM", MARGIN, 14);
  doc.setFontSize(16);
  doc.setTextColor(...COLORS.white);
  const titleLines = doc.splitTextToSize(project.titulo, CONTENT_W);
  for (const line of titleLines) {
    doc.text(line, MARGIN, y + 8);
    y += 7;
  }
  // Campos formativos badges
  doc.setFontSize(8);
  doc.setTextColor(200, 220, 255);
  doc.text(project.campos.join("  •  "), MARGIN, 40);
  y = 52;

  // ── Propósito ──
  if (project.proposito) {
    y = addSectionTitle(doc, y, "Propósito del Proyecto");
    y = addParagraph(doc, y, project.proposito);
    y += SECTION_GAP - 4;
  }

  // ── Justificación ──
  y = addSectionTitle(doc, y, "Justificación Pedagógica");
  y = addParagraph(doc, y, project.justificacion);
  y += SECTION_GAP - 4;

  // ── Contextualización ──
  y = addSectionTitle(doc, y, "Contextualización");
  y = addParagraph(doc, y, project.contextualizacion);
  y += SECTION_GAP - 4;

  // ── Problema ──
  y = addSectionTitle(doc, y, "Planteamiento del Problema");
  y = addParagraph(doc, y, project.problema);
  y += SECTION_GAP - 4;

  // ── Contenidos ──
  y = addSectionTitle(doc, y, "Contenidos Seleccionados");
  y = addBulletList(doc, y, project.contenidos);
  y += SECTION_GAP - 4;

  // ── PDA ──
  y = addSectionTitle(doc, y, "Procesos de Desarrollo de Aprendizaje");
  y = addBulletList(doc, y, project.pda);
  y += SECTION_GAP - 4;

  // ── Ejes Articuladores ──
  y = addSectionTitle(doc, y, "Ejes Articuladores");
  y = checkPage(doc, y, 10);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.muted);
  doc.text(project.ejes.join("  •  "), MARGIN + 2, y);
  y += SECTION_GAP;

  // ── Metodologías ──
  if (project.metodologias?.length) {
    y = addSectionTitle(doc, y, "Metodologías Activas (NEM)");
    y = addBulletList(doc, y, project.metodologias);
    y += SECTION_GAP - 4;
  }

  // ── Secuencia Didáctica ──
  y = addSectionTitle(doc, y, "Secuencia de Actividades (2 Semanas)");
  for (const fase of project.fases) {
    y = addSubtitle(doc, y, `${fase.nombre}  —  ${fase.duracion}`);
    y = addNumberedList(doc, y, fase.actividades);
    y += 4;
  }

  // ── Libros de Texto ──
  if (project.librosTexto?.length) {
    y = addSectionTitle(doc, y, "Libros de Texto Gratuitos Sugeridos");
    for (const item of project.librosTexto) {
      y = addSubtitle(doc, y, item.campo);
      y = addBulletList(doc, y, item.libros);
      y += 2;
    }
    y += SECTION_GAP - 6;
  }

  // ── Estrategia Nacional ──
  y = addSectionTitle(doc, y, "Estrategia Nacional SEP");
  y = addParagraph(doc, y, project.estrategiaNacional);
  y += SECTION_GAP - 4;

  // ── Inclusión ──
  y = addSectionTitle(doc, y, "Inclusión y Diversidad");
  y = addBulletList(doc, y, project.inclusion);
  y += SECTION_GAP - 4;

  // ── Evaluación ──
  y = addSectionTitle(doc, y, "Evaluación");
  y = addSubtitle(doc, y, "Productos Finales");
  y = addBulletList(doc, y, project.productos);
  y += 2;
  y = addSubtitle(doc, y, "Evaluación Formativa");
  y = addParagraph(doc, y, project.evaluacion.formativa);
  y += 2;
  y = addSubtitle(doc, y, "Criterios de Evaluación");
  y = addBulletList(doc, y, project.evaluacion.criterios);

  // ── Footer on all pages ──
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.muted);
    doc.text(`Página ${i} de ${totalPages}`, PAGE_W / 2, 292, { align: "center" });
    doc.text("Generado con ProyectaNEM", MARGIN, 292);
  }

  const safeName = project.titulo.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ ]/g, "").substring(0, 50).trim().replace(/ /g, "_");
  doc.save(`${safeName}.pdf`);
}
