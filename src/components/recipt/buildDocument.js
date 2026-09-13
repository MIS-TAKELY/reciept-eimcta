import { Document } from "docx";
import { quoteTemplate } from "../../content/quoteData.js";
import { createCustomerSection } from "./sections/customerSection.js";
import { createFooterSection } from "./sections/footerSection.js";
import { createItemsSection } from "./sections/itemsSection.js";
import { createTermsTotalsSection } from "./sections/termsSection.js";
import { createTopSection } from "./sections/topSection.js";
import { createWatermarkParagraph } from "./watermark.js";

export function buildReceiptDocument({
  logoData,
  watermarkData,
  data = quoteTemplate,
}) {
  return new Document({
    styles: {
      default: {
        document: {
          styles: [
            {
              id: "Normal",
              run: { font: "Calibri", size: 18 },
            },
          ],
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 400, right: 500, bottom: 400, left: 500 },
          },
        },
        children: [
          createWatermarkParagraph(watermarkData),
          ...createTopSection(logoData, data),
          ...createCustomerSection(data),
          ...createItemsSection(data),
          ...createTermsTotalsSection(data),
          ...createFooterSection(logoData, data),
        ],
      },
    ],
  });
}
