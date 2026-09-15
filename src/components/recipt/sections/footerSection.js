import {
  AlignmentType,
  Paragraph,
  ShadingType,
  TextRun,
} from "docx";

const FOOTER_BG = "4a5568";


export function createFooterSection(data) {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 160, after: 30 },
      children: [
        new TextRun({
          text: data.footer.contact,
          size: 15,
          color: "000000",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 100 },
      children: [
        new TextRun({
          text: data.footer.contactName,
          size: 15,
          color: "000000",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      shading: { type: ShadingType.CLEAR, fill: FOOTER_BG },
      spacing: { before: 40, after: 40 },
      children: [
        new TextRun({
          text: data.footer.thanks,
          color: "FFFFFF",
          size: 16,
          bold: true,
        }),
      ],
    }),
  ];
}