import {
  AlignmentType,
  BorderStyle,
  Document,
  HorizontalPositionAlign,
  HorizontalPositionRelativeFrom,
  ImageRun,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableBorders,
  TableCell,
  TableRow,
  TextRun,
  TextWrappingType,
  VerticalAlign,
  VerticalPositionAlign,
  VerticalPositionRelativeFrom,
  WidthType,
} from "docx";

import logoSrc from "../assets/eimcta-logo.png";
import watermarkSrc from "../assets/watermark.png";

async function loadLogo() {
  const res = await fetch(logoSrc);
  return new Uint8Array(await res.arrayBuffer());
}

async function loadWatermark() {
  const res = await fetch(watermarkSrc);
  return new Uint8Array(await res.arrayBuffer());
}

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };

function headerCell(text, width) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: "1F4E79" },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "1F4E79" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "1F4E79" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "1F4E79" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "1F4E79" },
    },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text, bold: true, color: "FFFFFF", size: 17 }),
        ],
      }),
    ],
  });
}

function itemRow(desc, unit, taxed, amount) {
  const border = { style: BorderStyle.SINGLE, size: 4, color: "999999" };
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 5500, type: WidthType.DXA },
        borders: { top: border, bottom: border, left: border, right: border },
        children: [
          new Paragraph({ children: [new TextRun({ text: desc, size: 16 })] }),
        ],
      }),
      new TableCell({
        width: { size: 1500, type: WidthType.DXA },
        borders: { top: border, bottom: border, left: border, right: border },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: unit, size: 15 })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 1500, type: WidthType.DXA },
        borders: { top: border, bottom: border, left: border, right: border },
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: taxed, size: 16 })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 1500, type: WidthType.DXA },
        borders: { top: border, bottom: border, left: border, right: border },
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: amount, size: 16 })],
          }),
        ],
      }),
    ],
  });
}


function term(text) {
  return new Paragraph({
    spacing: { before: 40 },
    children: [new TextRun({ text, size: 14 })],
  });
}

function totalRow(label, value) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 2000, type: WidthType.DXA },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
              left: noBorder,
              right: noBorder,
            },
            children: [
              new Paragraph({
                children: [new TextRun({ text: label, size: 16 })],
              }),
            ],
          }),
          new TableCell({
            width: { size: 1800, type: WidthType.DXA },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
              left: noBorder,
              right: noBorder,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [new TextRun({ text: value, size: 16 })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function customerInfoRow(label, value) {
  const border = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 3000, type: WidthType.DXA },
        borders: { top: border, bottom: border, left: border, right: border },
        children: [
          new Paragraph({
            spacing: { before: 20, after: 20 },
            children: [new TextRun({ text: label, bold: true, size: 16 })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 3000, type: WidthType.DXA },
        borders: { top: border, bottom: border, left: border, right: border },
        children: [
          new Paragraph({
            spacing: { before: 20, after: 20 },
            children: [new TextRun({ text: value || "", size: 16 })],
          }),
        ],
      }),
    ],
  });
}

function verificationRow(description) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 550, type: WidthType.DXA },
        verticalAlign: VerticalAlign.CENTER,
        borders: {
          top: noBorder,
          bottom: noBorder,
          left: noBorder,
          right: noBorder,
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "\u2713", bold: true, size: 18 })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 3450, type: WidthType.DXA },
        verticalAlign: VerticalAlign.CENTER,
        borders: {
          top: noBorder,
          bottom: noBorder,
          left: noBorder,
          right: noBorder,
        },
        children: [
          new Paragraph({
            spacing: { before: 30, after: 30 },
            children: [new TextRun({ text: description, size: 14 })],
          }),
        ],
      }),
    ],
  });
}

export default function Receipt() {
  const generateReceipt = async () => {
    const logoData = await loadLogo();
    const watermarkData = await loadWatermark();

    const doc = new Document({
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
            // ===================== WATERMARK =====================
            // A real watermark: anchored to the middle of the page, floating
            // BEHIND the document content (behindDocument), so it doesn't
            // push the layout around like a regular inline image.
            new Paragraph({
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
            }),
            // ===================== SECTION 1: LOGO + COMPANY NAME =====================
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
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: "Everest International Management",
                              bold: true,
                              size: 26,
                              color: "1F4E79",
                            }),
                          ],
                        }),
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: "Consultancy & Training Agency Pvt. Ltd (EIMCTA)",
                              bold: true,
                              size: 26,
                              color: "1F4E79",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            // ===================== SECTION 2: ADDRESS LEFT + QUOTE RIGHT =====================
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
                    new TableCell({
                      width: { size: 5500, type: WidthType.DXA },
                      borders: {
                        top: noBorder,
                        bottom: noBorder,
                        left: noBorder,
                        right: noBorder,
                      },
                      children: [
                        new Paragraph({
                          spacing: { before: 180 },
                          children: [
                            new TextRun({
                              text: "J.P Complex 3rd Floor, Jorpati , Kathmandu , Nepal",
                              size: 16,
                            }),
                          ],
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "www.everestconstrain.com/ info@everestconstrain.com",
                              size: 16,
                            }),
                          ],
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "\u260E +977 1 5903211 , +977 9860 896 494",
                              size: 16,
                            }),
                          ],
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Prepared by: Subekshya Parajuli",
                              size: 16,
                            }),
                          ],
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Govt. Reg No : 280667-078/079",
                              size: 16,
                            }),
                          ],
                        }),
                      ],
                    }),

                    // RIGHT — Quote box
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
                              text: "QUOTE",
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
                          rows: [
                            new TableRow({
                              borders: {
                                top: noBorder,
                                bottom: {
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
                                          text: "DATE",
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
                                          text: "16/1/2024",
                                          size: 15,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            new TableRow({
                              borders: {
                                top: noBorder,
                                bottom: {
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
                                          text: "QUOTE #",
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
                                          text: "231197807",
                                          size: 15,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            new TableRow({
                              borders: {
                                top: noBorder,
                                bottom: {
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
                                          text: "CUSTOMER ID",
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
                                          text: "________",
                                          size: 15,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            new TableRow({
                              borders: {
                                top: noBorder,
                                bottom: {
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
                                          text: "SALES PERSON ID",
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
                                          text: "________",
                                          size: 15,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            new TableRow({
                              borders: {
                                top: noBorder,
                                bottom: noBorder,
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
                                          text: "VALID UNTIL",
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
                                          text: "________",
                                          size: 15,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            // ===================== SECTION 3: CUSTOMER INFO + VERIFICATION CHECKS =====================
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              columnWidths: [6000, 4000],
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      columnSpan: 2,
                      width: { size: 10000, type: WidthType.DXA },
                      shading: {
                        type: ShadingType.CLEAR,
                        fill: "1F4E79",
                      },
                      borders: TableBorders.NONE,
                      children: [
                        new Paragraph({
                          spacing: { before: 60, after: 60 },
                          children: [
                            new TextRun({
                              text: "CUSTOMER",
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
                          rows: [
                            customerInfoRow(
                              "Name of Contact Person :",
                              "Ikram Mohammad",
                            ),
                            customerInfoRow(
                              "Company Name :",
                              "SJVN- Arun -3 Power Develepment Company Pvt. Ltd",
                            ),
                            customerInfoRow(
                              "Company Address",
                              "Tumlingtar, Adit-2 Solakhani & Dam Site Dovan",
                            ),
                            customerInfoRow(
                              "Telephone / Landline :",
                              "9852099786",
                            ),
                            customerInfoRow("Mobile No. :", "9852099786"),
                            customerInfoRow("Customer TRN No. :", ""),
                          ],
                        }),
                      ],
                    }),

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
                          rows: [
                            verificationRow(
                              "Verification of valid Trade License",
                            ),
                            verificationRow(
                              "Revalidated the Existance of Company",
                            ),
                            verificationRow(
                              "Verification of Activities in Trade Lic.",
                            ),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            new Paragraph({ spacing: { before: 120, after: 80 } }),

            // ===================== MAIN ITEMS TABLE =====================
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              columnWidths: [5500, 1500, 1500, 1500],
              rows: [
                new TableRow({
                  children: [
                    headerCell("DESCRIPTION", 5500),
                    headerCell("UNIT PRICE", 1500),
                    headerCell("TAXED", 1500),
                    headerCell("AMOUNT", 1500),
                  ],
                }),
                itemRow(
                  "Basic First Aid Awarness Training 6 hrs- (Day 1)",
                  "Lump Sum",
                  "",
                  "75,000.00",
                ),
                itemRow(
                  "Basic First Aid Awarness Training 6 hrs - ( Day 2)",
                  "Lump Sum",
                  "",
                  "75,000.00",
                ),
                itemRow(
                  "Basic First Aid Awarness Training 6 hrs- ( Day 3 )",
                  "Lump Sum",
                  "",
                  "75,000.00",
                ),
                new TableRow({
                  children: [
                    new TableCell({
                      columnSpan: 2,
                      width: { size: 7000, type: WidthType.DXA },
                      borders: {
                        top: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
                        bottom: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
                        left: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
                        right: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
                      },
                      children: [
                        new Paragraph({
                          spacing: { before: 60, after: 20 },
                          children: [new TextRun({ text: "Remarks (if any) :", bold: true, size: 16 })],
                        }),
                        new Paragraph({
                          spacing: { before: 20, after: 20 },
                          children: [new TextRun({ text: "Accreditation Selected(if any) :Nepal Red Cross Society", size: 16 })],
                        }),
                        new Paragraph({
                          spacing: { before: 20, after: 20 },
                          children: [new TextRun({ text: "CB Selected(if any) :", size: 16 })],
                        }),
                        new Paragraph({
                          spacing: { before: 20, after: 20 },
                          children: [new TextRun({ text: "Legend : CB - Certificaiton Body", size: 16 })],
                        }),
                        new Paragraph({
                          spacing: { before: 20, after: 20 },
                          children: [new TextRun({ text: "LS : Lump Sum", size: 16 })],
                        }),
                      ],
                    }),
                    new TableCell({
                      columnSpan: 2,
                      width: { size: 3000, type: WidthType.DXA },
                      borders: {
                        top: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
                        bottom: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
                        left: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
                        right: { style: BorderStyle.SINGLE, size: 4, color: "999999" },
                      },
                      children: [],
                    }),
                  ],
                }),
              ],
            }),

            // ===================== TERMS + ACCEPTANCE + TOTALS =====================
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              columnWidths: [6200, 3800],
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 6200, type: WidthType.DXA },
                      borders: {
                        top: {
                          style: BorderStyle.SINGLE,
                          size: 4,
                          color: "000000",
                        },
                        bottom: {
                          style: BorderStyle.SINGLE,
                          size: 4,
                          color: "000000",
                        },
                        left: {
                          style: BorderStyle.SINGLE,
                          size: 4,
                          color: "000000",
                        },
                        right: {
                          style: BorderStyle.SINGLE,
                          size: 4,
                          color: "000000",
                        },
                      },
                      children: [
                        new Paragraph({
                          shading: {
                            type: ShadingType.CLEAR,
                            fill: "1F4E79",
                          },
                          children: [
                            new TextRun({
                              text: "  TERMS AND CONDITIONS",
                              bold: true,
                              color: "FFFFFF",
                              size: 18,
                            }),
                          ],
                        }),
                        term(
                          "1. Client will be billed after indicating acceptance of this quote.",
                        ),
                        term("2. Payment Terms : 50% on signing of contract,"),
                        term("3. 25 % Prior Mobilization For Training To Site"),
                        term("4. 25 % Prior Issuance Of Certification"),
                        term(
                          "5. Please fax or mail the signed price quote to the address above.",
                        ),
                        term(
                          "6. Transportation Cost Included From / To Tumlingtar .",
                        ),
                        term(
                          "   (Local transportation will be provided by Client )",
                        ),
                        term("7. Lodging & Fooding provided by EIMCTA"),
                        term(
                          "Note :  Kindly Refer to attached Details, Terms and Conditions of Training.",
                        ),

                        new Paragraph({ spacing: { before: 100 } }),
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Customer Acceptance (sign below & initiate with company Seal ):",
                              bold: true,
                              italics: true,
                              size: 16,
                            }),
                          ],
                        }),
                        new Paragraph({
                          spacing: { before: 200 },
                          children: [
                            new TextRun("Signature/ Date : 2024/01/16"),
                          ],
                        }),
                        new Paragraph({
                          children: [
                            new TextRun(
                              "Authorised Signatory's Name : ___________________________",
                            ),
                          ],
                        }),
                        new Paragraph({
                          spacing: { before: 80 },
                          children: [
                            new TextRun({
                              text: "Customer's Company Seal",
                              size: 15,
                            }),
                          ],
                        }),
                      ],
                    }),

                    // RIGHT – Totals box
                    new TableCell({
                      width: { size: 3800, type: WidthType.DXA },
                      borders: {
                        top: {
                          style: BorderStyle.SINGLE,
                          size: 4,
                          color: "000000",
                        },
                        bottom: {
                          style: BorderStyle.SINGLE,
                          size: 4,
                          color: "000000",
                        },
                        left: {
                          style: BorderStyle.SINGLE,
                          size: 4,
                          color: "000000",
                        },
                        right: {
                          style: BorderStyle.SINGLE,
                          size: 4,
                          color: "000000",
                        },
                      },
                      children: [
                        totalRow("Subtotal", "225,000.00"),
                        totalRow("VAT %", "13%"),
                        totalRow("13% of VAT", "29250"),
                        new Table({
                          width: { size: 100, type: WidthType.PERCENTAGE },
                          rows: [
                            new TableRow({
                              children: [
                                new TableCell({
                                  shading: {
                                    type: ShadingType.CLEAR,
                                    fill: "1F4E79",
                                  },
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
                                          text: "Total",
                                          bold: true,
                                          color: "FFFFFF",
                                          size: 20,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                new TableCell({
                                  shading: {
                                    type: ShadingType.CLEAR,
                                    fill: "1F4E79",
                                  },
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
                                          text: "AED  254,250.00",
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
                      ],
                    }),
                  ],
                }),
              ],
            }),

            // ===================== FOOTER / SIGNATURE =====================
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
                            new TextRun({
                              text: "If you have any questions about this price quote, please contact",
                              size: 15,
                            }),
                          ],
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Shailendra Kumar Kharel , 9860896494",
                              size: 15,
                            }),
                          ],
                        }),
                        new Paragraph({
                          spacing: { before: 60 },
                          children: [
                            new TextRun({
                              text: "\u00A9 We are Thankful to be in Your Service \u00A9",
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
                            new TextRun({
                              text: "Sign, Date and Seal of EIMCTA",
                              size: 14,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "EIMCTA-Quotation.docx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return <button onClick={generateReceipt}>Generate Quotation</button>;
}