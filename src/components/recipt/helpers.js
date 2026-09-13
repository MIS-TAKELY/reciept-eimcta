import {
  AlignmentType,
  BorderStyle,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from "docx";
import { NAVY } from "../../content/quoteData.js";

export const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };

export function headerCell(text, width) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: NAVY },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: NAVY },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: NAVY },
      left: { style: BorderStyle.SINGLE, size: 4, color: NAVY },
      right: { style: BorderStyle.SINGLE, size: 4, color: NAVY },
    },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text, bold: true, color: "FFFFFF", size: 17 }),
        ],
      }),
    ],
  });
}

export function itemRow(desc, unit, taxed, amount) {
  const border = { style: BorderStyle.SINGLE, size: 4, color: "999999" };
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 5500, type: WidthType.DXA },
        borders: { top: border, bottom: border, left: border, right: border },
        children: [
          new Paragraph({ children: [new TextRun({ text: desc, size: 16 })] }),
        ],
      }),
      new TableCell({
        width: { size: 1500, type: WidthType.DXA },
        borders: { top: border, bottom: border, left: border, right: border },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: unit, size: 15 })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 1500, type: WidthType.DXA },
        borders: { top: border, bottom: border, left: border, right: border },
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: taxed, size: 16 })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 1500, type: WidthType.DXA },
        borders: { top: border, bottom: border, left: border, right: border },
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: amount, size: 16 })],
          }),
        ],
      }),
    ],
  });
}

export function term(text) {
  return new Paragraph({
    spacing: { before: 40 },
    children: [new TextRun({ text, size: 14 })],
  });
}

export function totalRow(label, value) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 2000, type: WidthType.DXA },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
              left: noBorder,
              right: noBorder,
            },
            children: [
              new Paragraph({
                children: [new TextRun({ text: label, size: 16 })],
              }),
            ],
          }),
          new TableCell({
            width: { size: 1800, type: WidthType.DXA },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
              left: noBorder,
              right: noBorder,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [new TextRun({ text: value, size: 16 })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

export function customerInfoRow(label, value) {
  const border = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 3000, type: WidthType.DXA },
        borders: { top: border, bottom: border, left: border, right: border },
        children: [
          new Paragraph({
            spacing: { before: 20, after: 20 },
            children: [new TextRun({ text: label, bold: true, size: 16 })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 3000, type: WidthType.DXA },
        borders: { top: border, bottom: border, left: border, right: border },
        children: [
          new Paragraph({
            spacing: { before: 20, after: 20 },
            children: [new TextRun({ text: value || "", size: 16 })],
          }),
        ],
      }),
    ],
  });
}

export function verificationRow(description) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 550, type: WidthType.DXA },
        verticalAlign: VerticalAlign.CENTER,
        borders: {
          top: noBorder,
          bottom: noBorder,
          left: noBorder,
          right: noBorder,
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "\u2713", bold: true, size: 18 })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 3450, type: WidthType.DXA },
        verticalAlign: VerticalAlign.CENTER,
        borders: {
          top: noBorder,
          bottom: noBorder,
          left: noBorder,
          right: noBorder,
        },
        children: [
          new Paragraph({
            spacing: { before: 30, after: 30 },
            children: [new TextRun({ text: description, size: 14 })],
          }),
        ],
      }),
    ],
  });
}
export function computeTotal(totals, total) {
  const parse = (s) => parseFloat(String(s ?? "").replace(/[^0-9.]/g, "")) || 0;
  const subtotal = parse(totals[0]?.value);
  const vatAmount = parse(totals[2]?.value);
  const currencyMatch = String(total?.value || "").match(/^[A-Za-z]+/);
  const currency = currencyMatch ? currencyMatch[0] : "AED";

  const sum = subtotal + vatAmount;
  if (!subtotal && !vatAmount) return total?.value || `${currency}  0.00`;
  return `${currency}  ${sum.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
