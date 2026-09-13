import {
  AlignmentType,
  ImageRun,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { noBorder } from "../helpers.js";

/**
 * FOOTER / SIGNATURE (contact left, sign/seal right)
 */
export function createFooterSection(logoData, data) {
  return [
    new Paragraph({ spacing: { before: 200 } }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      columnWidths: [5000, 5000],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: {
                top: noBorder,
                bottom: noBorder,
                left: noBorder,
                right: noBorder,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: data.footer.contact, size: 15 }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({ text: data.footer.contactName, size: 15 }),
                  ],
                }),
                new Paragraph({
                  spacing: { before: 60 },
                  children: [
                    new TextRun({
                      text: data.footer.thanks,
                      italics: true,
                      size: 15,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
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
                    new ImageRun({
                      data: logoData,
                      transformation: { width: 70, height: 55 },
                      type: "png",
                    }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({ text: data.footer.sealText, size: 14 }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ];
}