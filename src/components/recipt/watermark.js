import {
  HorizontalPositionAlign,
  HorizontalPositionRelativeFrom,
  ImageRun,
  Paragraph,
  TextWrappingType,
  VerticalPositionAlign,
  VerticalPositionRelativeFrom,
} from "docx";
export function createWatermarkParagraph(watermarkData) {
  return new Paragraph({
    children: [
      new ImageRun({
        data: watermarkData,
        transformation: { width: 400, height: 400 },
        type: "png",
        floating: {
          horizontalPosition: {
            relative: HorizontalPositionRelativeFrom.PAGE,
            align: HorizontalPositionAlign.CENTER,
          },
          verticalPosition: {
            relative: VerticalPositionRelativeFrom.PAGE,
            align: VerticalPositionAlign.CENTER,
          },
          behindDocument: true,
          allowOverlap: true,
          lockAnchor: false,
          wrap: { type: TextWrappingType.NONE },
        },
        altText: {
          title: "Watermark",
          description: "EIMCTA Watermark",
        },
      }),
    ],
  });
}
