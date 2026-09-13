import {
  AlignmentType,
  BorderStyle,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { NAVY } from "../../../content/quoteData.js";
import { computeTotal, noBorder, term, totalRow } from "../helpers.js";

/**
 * TERMS AND CONDITIONS (left) + ACCEPTANCE + TOTALS box (right)
 */
export function createTermsTotalsSection(data) {
  const blackBorder = {
    top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    right: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
  };

  // Total is derived automatically: Subtotal + "13% of VAT" amount.
  const totalValue = computeTotal(data.totals, data.total);

  return [
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      columnWidths: [6200, 3800],
      rows: [
        new TableRow({
          children: [
            // LEFT — terms & acceptance
            new TableCell({
              width: { size: 6200, type: WidthType.DXA },
              borders: blackBorder,
              children: [
                new Paragraph({
                  shading: { type: ShadingType.CLEAR, fill: NAVY },
                  children: [
                    new TextRun({
                      text: `  ${data.terms.heading}`,
                      bold: true,
                      color: "FFFFFF",
                      size: 18,
                    }),
                  ],
                }),
                ...data.terms.lines.map((line) => term(line)),
                new Paragraph({ spacing: { before: 100 } }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: data.acceptance.heading,
                      bold: true,
                      italics: true,
                      size: 16,
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: { before: 200 },
                  children: [new TextRun(data.acceptance.signature)],
                }),
                new Paragraph({
                  children: [new TextRun(data.acceptance.signatory)],
                }),
                new Paragraph({
                  spacing: { before: 80 },
                  children: [new TextRun({ text: data.acceptance.seal, size: 15 })],
                }),
              ],
            }),

            // RIGHT — totals box
            new TableCell({
              width: { size: 3800, type: WidthType.DXA },
              borders: blackBorder,
              // Word requires a trailing paragraph after nested tables in a cell.
              children: [
                ...data.totals.map((row) => totalRow(row.label, row.value)),
                new Table({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  rows: [
                    new TableRow({
                      children: [
                        new TableCell({
                          shading: { type: ShadingType.CLEAR, fill: NAVY },
                          borders: {
                            top: noBorder,
                            bottom: noBorder,
                            left: noBorder,
                            right: noBorder,
                          },
                          children: [
                            new Paragraph({
                              alignment: AlignmentType.CENTER,
                              children: [
                                new TextRun({
                                  text: data.total.label,
                                  bold: true,
                                  color: "FFFFFF",
                                  size: 20,
                                }),
                              ],
                            }),
                          ],
                        }),
                        new TableCell({
                          shading: { type: ShadingType.CLEAR, fill: NAVY },
                          borders: {
                            top: noBorder,
                            bottom: noBorder,
                            left: noBorder,
                            right: noBorder,
                          },
                          children: [
                            new Paragraph({
                              alignment: AlignmentType.RIGHT,
                              children: [
                                new TextRun({
                                  text: totalValue,
                                  bold: true,
                                  color: "FFFFFF",
                                  size: 20,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new Paragraph({}),
              ],
            }),
          ],
        }),
      ],
    }),
  ];
}