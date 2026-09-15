import {
  AlignmentType,
  BorderStyle,
  ImageRun,
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


export function createTermsTotalsSection(data, logoData) {
  const blackBorder = {
    top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    right: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
  };

  // Total is derived automatically: Subtotal + "13% of VAT" amount.
  const totalValue = computeTotal(data.totals, data.total);

  // Build the EIMCTA seal image paragraph (only if logoData is provided)
  const eimctaSealChildren = [];
  if (logoData) {
    eimctaSealChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new ImageRun({
            data: logoData,
            transformation: { width: 90, height: 22 },
            type: "png",
          }),
        ],
      })
    );
  }
  eimctaSealChildren.push(
    new Paragraph({
      spacing: { before: 80 },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "___________________________", size: 14 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: data.footer.sealText, size: 14 })],
    }),
    // Spacer so the cell aligns to the bottom of the outer row
    new Paragraph({})
  );

  return [
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      columnWidths: [5000, 3000, 2000],
      rows: [
        new TableRow({
          children: [
            // LEFT — terms & acceptance
            new TableCell({
              width: { size: 5000, type: WidthType.DXA },
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
                      underline: {},
                      size: 16,
                    }),
                  ],
                }),
                new Table({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  rows: [
                    new TableRow({
                      children: [
                        new TableCell({
                          borders: noBorder,
                          width: { size: 60, type: WidthType.PERCENTAGE },
                          children: [
                            new Paragraph({
                              spacing: { before: 100 },
                              children: [new TextRun({ text: data.acceptance.signature, size: 14 })],
                            }),
                            new Paragraph({
                              spacing: { before: 200 },
                              children: [new TextRun({ text: data.acceptance.signatory, size: 14 })],
                            }),
                          ],
                        }),
                        new TableCell({
                          borders: noBorder,
                          width: { size: 40, type: WidthType.PERCENTAGE },
                          children: [
                            new Paragraph({
                              spacing: { before: 180 },
                              alignment: AlignmentType.CENTER,
                              children: [new TextRun({ text: "___________________________", size: 14 })],
                            }),
                            new Paragraph({
                              alignment: AlignmentType.CENTER,
                              children: [new TextRun({ text: data.acceptance.seal, size: 14 })],
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

            // MIDDLE — totals box
            new TableCell({
              width: { size: 3000, type: WidthType.DXA },
              borders: blackBorder,
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

            // RIGHT — EIMCTA Sign/Date/Seal
            new TableCell({
              width: { size: 2000, type: WidthType.DXA },
              borders: blackBorder,
              verticalAlign: "bottom",
              children: eimctaSealChildren,
            }),
          ],
        }),
      ],
    }),
  ];
}