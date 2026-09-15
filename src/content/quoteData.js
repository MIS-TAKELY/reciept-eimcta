
export const NAVY = "1F4E79";

export const PLACEHOLDER = "________";

export const FILE_NAMES = {
  docx: "EIMCTA-Quotation.docx",
  pdf: "EIMCTA-Quotation.pdf",
};

export function formatCurrentDate(dateInput) {
  if (dateInput && String(dateInput).trim() !== "") {
    return dateInput;
  }
  const d = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export const quoteTemplate = {
  topBar: {
    coRegNo: "280667/078/079",
    vatNo: "610183126",
    date: "",
  },

  company: {
    nameLines: [
      "Everest International Management",
      "Consultancy & Training Agency Pvt. Ltd (EIMCTA)",
    ],
    addressLines: [
      "J.P Complex 3rd Floor, Jorpati , Kathmandu , Nepal",
      "www.everestconstrain.com/ info@everestconstrain.com",
      "+977 1 5903211 , +977 9860 896 494",
      "Prepared by: Subekshya Parajuli",
      "Govt. Reg No : 280667-078/079",
    ],
  },

  quote: {
    title: "QUOTE",
    date: "16/1/2024",
    number: "231197807",
    customerId: "",
    salesPersonId: "",
    validUntil: "",
  },

  customer: [
    { label: "Name of Contact Person :", value: "Ikram Mohammad" },
    {
      label: "Company Name :",
      value: "SJVN- Arun -3 Power Develepment Company Pvt. Ltd",
    },
    {
      label: "Company Address",
      value: "Tumlingtar, Adit-2 Solakhani & Dam Site Dovan",
    },
    { label: "Telephone / Landline :", value: "9852099786" },
    { label: "Mobile No. :", value: "9852099786" },
    { label: "Customer TRN No. :", value: "" },
  ],
  customerHeading: "CUSTOMER",

  verifications: [
    "Verification of valid Trade License",
    "Revalidated the Existance of Company",
    "Verification of Activities in Trade Lic.",
  ],

  itemHeaders: ["DESCRIPTION", "UNIT PRICE", "TAXED", "AMOUNT"],
  items: [
    {
      description: "Basic First Aid Awarness Training 6 hrs- (Day 1)",
      unit: "Lump Sum",
      taxed: "",
      amount: "75,000.00",
    },
    {
      description: "Basic First Aid Awarness Training 6 hrs - ( Day 2)",
      unit: "Lump Sum",
      taxed: "",
      amount: "75,000.00",
    },
    {
      description: "Basic First Aid Awarness Training 6 hrs- ( Day 3 )",
      unit: "Lump Sum",
      taxed: "",
      amount: "75,000.00",
    },
    {
      description: "Basic First Aid Awarness Training 6 hrs- ( Day 3 )",
      unit: "Lump Sum",
      taxed: "",
      amount: "75,000.00",
    },
    {
      description: "Basic First Aid Awarness Training 6 hrs- ( Day 3 )",
      unit: "Lump Sum",
      taxed: "",
      amount: "75,000.00",
    },
    {
      description: "Basic First Aid Awarness Training 6 hrs- ( Day 3 )",
      unit: "Lump Sum",
      taxed: "",
      amount: "75,000.00",
    },
  ],

  remarks: {
    heading: "Remarks (if any) :",
    accreditation: "Nepal Red Cross Society",
    cb: "",
    legend: "CB - Certificaiton Body",
    ls: "Lump Sum",
    lines: [
      "Accreditation Selected(if any) :Nepal Red Cross Society",
      "CB Selected(if any) :",
      "Legend : CB - Certificaiton Body",
      "LS : Lump Sum",
    ],
  },

  terms: {
    heading: "TERMS AND CONDITIONS",
    leftLines: [
      "1. Client will be billed after indicating acceptance of this quote.",
      "2. Payment Terms: 50% on signing of contract.",
      "3. 25% prior mobilization for training to site.",
      "4. 25% prior issuance of certification.",
    ],
    rightLines: [
      "5. Please fax or mail the signed price quote to the address above.",
      "6. Transportation cost included from/to Tumlingtar.",
      "7. Lodging & fooding provided by EIMCTA.",
      "7. Lodging & fooding provided by EIMCTA.",
    ],
    note: "Note: Kindly refer to attached Details, Terms and Conditions of Training.",
    lines: [
      "1. Client will be billed after indicating acceptance of this quote.",
      "2. Payment Terms: 50% on signing of contract.",
      "3. 25% prior mobilization for training to site.",
      "4. 25% prior issuance of certification.",
      "5. Please fax or mail the signed price quote to the address above.",
      "6. Transportation cost included from/to Tumlingtar.",
      "7. Lodging & fooding provided by EIMCTA.",
      "Note :  Kindly Refer to attached Details, Terms and Conditions of Training.",
    ],
  },

  acceptance: {
    heading: "Customer Acceptance (sign below & initiate with company Seal ):",
    signatureDate: "2024/01/16",
    signatoryName: "",
    seal: "Customer's Company Seal",
  },

  totals: [
    { label: "Subtotal", value: "225,000.00" },
    { label: "VAT %", value: "13%" },
    { label: "13% of VAT", value: "29250" },
  ],
  total: { label: "Total", value: "AED  254,250.00" },

  footer: {
    contact: "If you have any questions about this price quote, please contact",
    contactName: "Shailendra Kumar Kharel , 9860896494",
    thanks: "We are Thankful to be in Your Service ",
    sealText: "Sign/Date and Seal of EIMCTA",
  },
};
