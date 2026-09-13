
export const NAVY = "1F4E79";

export const PLACEHOLDER = "________";

export const FILE_NAMES = {
  docx: "EIMCTA-Quotation.docx",
};

export const quoteTemplate = {
  company: {
    nameLines: [
      "Everest International Management",
      "Consultancy & Training Agency Pvt. Ltd (EIMCTA)",
    ],
    addressLines: [
      "J.P Complex 3rd Floor, Jorpati , Kathmandu , Nepal",
      "www.everestconstrain.com/ info@everestconstrain.com",
      "\u260E +977 1 5903211 , +977 9860 896 494",
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
  ],

  remarks: {
    heading: "Remarks (if any) :",
    lines: [
      "Accreditation Selected(if any) :Nepal Red Cross Society",
      "CB Selected(if any) :",
      "Legend : CB - Certificaiton Body",
      "LS : Lump Sum",
    ],
  },

  terms: {
    heading: "TERMS AND CONDITIONS",
    lines: [
      "1. Client will be billed after indicating acceptance of this quote.",
      "2. Payment Terms : 50% on signing of contract,",
      "3. 25 % Prior Mobilization For Training To Site",
      "4. 25 % Prior Issuance Of Certification",
      "5. Please fax or mail the signed price quote to the address above.",
      "6. Transportation Cost Included From / To Tumlingtar .",
      "   (Local transportation will be provided by Client )",
      "7. Lodging & Fooding provided by EIMCTA",
      "Note :  Kindly Refer to attached Details, Terms and Conditions of Training.",
    ],
  },

  acceptance: {
    heading: "Customer Acceptance (sign below & initiate with company Seal ):",
    signature: "Signature/ Date : 2024/01/16",
    signatory: "Authorised Signatory's Name : ___________________________",
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
    thanks: "\u00A9 We are Thankful to be in Your Service \u00A9",
    sealText: "Sign, Date and Seal of EIMCTA",
  },
};
