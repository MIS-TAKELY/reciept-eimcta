import {
  Paragraph,
  ShadingType,
  Table,
  TableBorders,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { NAVY } from "../../../content/quoteData.js";
import { customerInfoRow, noBorder, verificationRow } from "../helpers.js";

/**
 * SECTION 3: CUSTOMER INFO + VERIFICATION CHECKS
 */
export function createCustomerSection(data) {
  return [
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      columnWidths: [6000, 4000],
      rows: [
        // CUSTOMER bar
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 2,
              width: { size: 10000, type: WidthType.DXA },
              shading: { type: ShadingType.CLEAR, fill: NAVY },
              borders: TableBorders.NONE,
              children: [
                new Paragraph({
                  spacing: { before: 60, after: 60 },
                  children: [
                    new TextRun({
                      text: data.customerHeading,
                      bold: true,
                      color: "FFFFFF",
                      size: 18,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            // LEFT — customer details
            new TableCell({
              width: { size: 6000, type: WidthType.DXA },
              borders: {
                top: noBorder,
                bottom: noBorder,
                left: noBorder,
                right: noBorder,
              },
              children: [
                new Table({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  columnWidths: [3000, 3000],
                  borders: TableBorders.NONE,
                  rows: data.customer.map((row) =>
                    customerInfoRow(row.label, row.value),
                  ),
                }),
              ],
            }),

            // RIGHT — verification checks
            new TableCell({
              width: { size: 4000, type: WidthType.DXA },
              borders: {
                top: noBorder,
                bottom: noBorder,
                left: noBorder,
                right: noBorder,
              },
              children: [
                new Table({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  columnWidths: [550, 3450],
                  borders: TableBorders.NONE,
                  rows: data.verifications.map((item) => verificationRow(item)),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ];
}