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
import {
  NAVY,
  PLACEHOLDER,
  formatCurrentDate,
} from "../../../content/quoteData.js";
import { noBorder } from "../helpers.js";


export function createTopSection(logoData, data) {
  const topDate = formatCurrentDate(data?.topBar?.date || data?.quote?.topDate);
  const coRegNo =
    data?.topBar?.coRegNo || data?.company?.coRegNo || "280667/078/079";
  const vatNo = data?.topBar?.vatNo || data?.company?.vatNo || "610183126";

  const quoteRows = [
    { label: "DATE", value: data.quote.date },
    { label: "QUOTE #", value: data.quote.number },
    { label: "CUSTOMER ID", value: data.quote.customerId || PLACEHOLDER },
    { label: "SALES PERSON ID", value: data.quote.salesPersonId || PLACEHOLDER },
    { label: "VALID UNTIL", value: data.quote.validUntil || PLACEHOLDER },
  ];

  return [
    // TOP BAR: Co. Reg. No / VAT No (left) + Date (right)
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      columnWidths: [6500, 3500],
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
              width: { size: 6500, type: WidthType.DXA },
              borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
              children: [
                new Paragraph({
                  spacing: { before: 0, after: 60 },
                  children: [
                    new TextRun({
                      text: `Co. Reg. No: ${coRegNo} | VAT No: ${vatNo}`,
                      size: 15,
                      color: "333333",
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 3500, type: WidthType.DXA },
              borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  spacing: { before: 0, after: 60 },
                  children: [
                    new TextRun({
                      text: `Date: ${topDate}`,
                      size: 15,
                      color: "333333",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

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
      columnWidths: [5800, 4200],
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
              width: { size: 5800, type: WidthType.DXA },
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
              width: { size: 4200, type: WidthType.DXA },
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
                  width: { size: 4200, type: WidthType.DXA },
                  alignment: AlignmentType.RIGHT,
                  columnWidths: [2200, 2000],
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
                          width: { size: 2200, type: WidthType.DXA },
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
                new Paragraph({}),
              ],
            }),
          ],
        }),
      ],
    }),
  ];
}