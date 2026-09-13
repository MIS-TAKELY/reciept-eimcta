import {
  BorderStyle,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { headerCell, itemRow } from "../helpers.js";

/**
 * MAIN ITEMS TABLE + REMARKS row
 */
export function createItemsSection(data) {
  const columnWidths = [5500, 1500, 1500, 1500];
  const border = { style: BorderStyle.SINGLE, size: 4, color: "999999" };

  return [
    new Paragraph({ spacing: { before: 120, after: 80 } }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      columnWidths,
      rows: [
        new TableRow({
          children: data.itemHeaders.map((heading, index) =>
            headerCell(heading, columnWidths[index]),
          ),
        }),
        ...data.items.map((item) =>
          itemRow(item.description, item.unit, item.taxed, item.amount),
        ),
        // Remarks row
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 2,
              width: { size: 7000, type: WidthType.DXA },
              borders: {
                top: border,
                bottom: border,
                left: border,
                right: border,
              },
              children: [
                new Paragraph({
                  spacing: { before: 60, after: 20 },
                  children: [
                    new TextRun({
                      text: data.remarks.heading,
                      bold: true,
                      size: 16,
                    }),
                  ],
                }),
                ...data.remarks.lines.map(
                  (line) =>
                    new Paragraph({
                      spacing: { before: 20, after: 20 },
                      children: [new TextRun({ text: line, size: 16 })],
                    }),
                ),
              ],
            }),
            new TableCell({
              columnSpan: 2,
              width: { size: 3000, type: WidthType.DXA },
              borders: {
                top: border,
                bottom: border,
                left: border,
                right: border,
              },
              children: [new Paragraph({})],
            }),
          ],
        }),
      ],
    }),
  ];
}