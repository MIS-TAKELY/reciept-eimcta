import {
  AlignmentType,
  BorderStyle,
  ImageRun,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from "docx";
import { NAVY, PLACEHOLDER } from "../../../content/quoteData.js";
import { noBorder } from "../helpers.js";

/**
 * SECTION 1: LOGO + COMPANY NAME (left logo, right company name lines)
 * SECTION 2: ADDRESS (left) + QUOTE box (right)
 */
export function createTopSection(logoData, data) {
  const quoteRows = [
    { label: "DATE", value: data.quote.date },
    { label: "QUOTE #", value: data.quote.number },
    { label: "CUSTOMER ID", value: data.quote.customerId || PLACEHOLDER },
    { label: "SALES PERSON ID", value: data.quote.salesPersonId || PLACEHOLDER },
    { label: "VALID UNTIL", value: data.quote.validUntil || PLACEHOLDER },
  ];

  return [
    // SECTION 1: LOGO + COMPANY NAME
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      columnWidths: [3000, 7000],
      rows: [
        new TableRow({
          borders: {
            top: noBorder,
            bottom: noBorder,
            left: noBorder,
            right: noBorder,
          },
          children: [
            new TableCell({
              width: { size: 2500, type: WidthType.DXA },
              borders: {
                top: noBorder,
                bottom: noBorder,
                left: noBorder,
                right: noBorder,
              },
              verticalAlign: VerticalAlign.CENTER,
              children: [
                new Paragraph({
                  children: [
                    new ImageRun({
                      data: logoData,
                      transformation: { width: 130, height: 70 },
                      type: "png",
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 5000, type: WidthType.DXA },
              borders: {
                top: noBorder,
                bottom: noBorder,
                left: noBorder,
                right: noBorder,
              },
              verticalAlign: VerticalAlign.CENTER,
              children: data.company.nameLines.map(
                (line) =>
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: line,
                        bold: true,
                        size: 26,
                        color: NAVY,
                      }),
                    ],
                  }),
              ),
            }),
          ],
        }),
      ],
    }),

    // SECTION 2: ADDRESS LEFT + QUOTE RIGHT
    new Paragraph({ spacing: { before: 200 } }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      columnWidths: [7000, 3000],
      rows: [
        new TableRow({
          borders: {
            top: noBorder,
            bottom: noBorder,
            left: noBorder,
            right: noBorder,
          },
          children: [
            // LEFT — company address
            new TableCell({
              width: { size: 5500, type: WidthType.DXA },
              borders: {
                top: noBorder,
                bottom: noBorder,
                left: noBorder,
                right: noBorder,
              },
              children: data.company.addressLines.map(
                (line, index) =>
                  new Paragraph({
                    ...(index === 0 ? { spacing: { before: 180 } } : {}),
                    children: [new TextRun({ text: line, size: 16 })],
                  }),
              ),
            }),

            // RIGHT — QUOTE box
            new TableCell({
              width: { size: 1000, type: WidthType.DXA },
              borders: {
                top: noBorder,
                bottom: noBorder,
                left: noBorder,
                right: noBorder,
              },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { after: 100 },
                  children: [
                    new TextRun({
                      text: data.quote.title,
                      bold: true,
                      size: 30,
                      color: "FF0000",
                    }),
                  ],
                }),
                new Table({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  alignment: AlignmentType.RIGHT,
                  columnWidths: [500, 500],
                  rows: quoteRows.map((row, index) =>
                    new TableRow({
                      borders: {
                        top: noBorder,
                        bottom:
                          index === quoteRows.length - 1
                            ? noBorder
                            : {
                                style: BorderStyle.SINGLE,
                                size: 2,
                                color: "CCCCCC",
                              },
                        left: noBorder,
                        right: noBorder,
                      },
                      children: [
                        new TableCell({
                          width: { size: 2000, type: WidthType.DXA },
                          borders: {
                            top: noBorder,
                            bottom: noBorder,
                            left: noBorder,
                            right: noBorder,
                          },
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: row.label,
                                  bold: true,
                                  size: 15,
                                }),
                              ],
                            }),
                          ],
                        }),
                        new TableCell({
                          width: { size: 2500, type: WidthType.DXA },
                          borders: {
                            top: noBorder,
                            bottom: noBorder,
                            left: noBorder,
                            right: noBorder,
                          },
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: row.value,
                                  size: 15,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ];
}