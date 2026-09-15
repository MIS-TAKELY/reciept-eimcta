import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import { useMemo } from "react";

import logoSrc from "../assets/eimcta-logo.png";
import watermarkSrc from "../assets/watermark.png";
import eimctaSealSignSrc from "../assets/eimcta-seal-signature.png";
import {
  quoteTemplate,
  formatCurrentDate,
  FILE_NAMES,
} from "../content/quoteData.js";


const NAVY = "#1F4E79";

const styles = StyleSheet.create({
  page: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 24,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#000",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  topBarText: {
    fontSize: 7.5,
    color: "#333",
  },

  watermark: {
    position: "absolute",
    top: "38%",
    left: "28%",
    width: 260,
    opacity: 1
  },

  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  logo: { width: 90, height: 50 },
  companyNameWrap: { flex: 1, alignItems: "center" },
  companyName: {
    fontSize: 13,
    fontWeight: 700,
    color: NAVY,
    textAlign: "center",
  },

  addrQuoteRow: { flexDirection: "row", marginBottom: 8 },
  addrCol: { flex: 1.8 },
  addrLine: { fontSize: 8, marginBottom: 2 },
  quoteCol: { flex: 1, alignItems: "flex-end" },
  quoteTitle: {
    color: "#FF0000",
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 4,
  },
  quoteTable: { width: "100%" },
  quoteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingVertical: 2,
  },
  quoteLabel: { fontWeight: 700, fontSize: 7.5 },
  quoteValue: { fontSize: 7.5 },

  sectionBar: {
    backgroundColor: NAVY,
    color: "#fff",
    fontWeight: 700,
    fontSize: 9,
    padding: 4,
    marginBottom: 6,
  },

  custRow: { flexDirection: "row", marginBottom: 8 },
  custCol: { flex: 1.6 },
  custLine: { flexDirection: "row", marginBottom: 2 },
  custLabel: { fontWeight: 700, fontSize: 8, width: 130 },
  custValue: { fontSize: 8, flex: 1 },
  checkCol: { flex: 1 },
  checkLine: { flexDirection: "row", alignItems: "center", marginBottom: 3 },
  checkBox: {
    width: 12,
    height: 12,
    borderWidth: 0.7,
    borderColor: "#000",
    textAlign: "center",
    fontSize: 8,
    marginRight: 4,
  },
  checkText: { fontSize: 7.5 },

  table: { width: "100%" },
  tRow: { flexDirection: "row" },
  th: {
    backgroundColor: NAVY,
    color: "#fff",
    fontSize: 8,
    fontWeight: 700,
    padding: 4,
    borderWidth: 0.5,
    borderColor: NAVY,
  },
  td: { fontSize: 8, padding: 4, borderWidth: 0.5, borderColor: "#999" },
  colDesc: { width: "55%" },
  colTermsAndCondition: { width: "60%" },
  colUnit: { width: "15%", textAlign: "center" },
  colTaxed: { width: "15%", textAlign: "right" },
  colAmount: { width: "15%", textAlign: "right" },


  bottomBlock: {
    flexDirection: "row",
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderColor: "#999",
    marginBottom: 8,
  },
  remarksCell: {
    width: "70%",
    padding: 6,
    borderRightWidth: 0.5,
    borderRightColor: "#999",
  },
  remarkLine: { fontSize: 8, marginBottom: 1 },
  remarkLineBold: { fontSize: 8, marginBottom: 1, fontWeight: 700 },
  totalsCell: { width: "30%", flexDirection: "column" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  totalFinal: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: NAVY,
    color: "#fff",
    fontWeight: 700,
    fontSize: 10,
    padding: 5,
  },

  termsAndSealRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  termsBoxFull: {
    width: "70%",
  },
  termsHeading: {
    backgroundColor: NAVY,
    color: "#fff",
    fontWeight: 700,
    fontSize: 9,
    padding: 4,
    marginBottom: 0,
  },
  termsContainer: {
    borderWidth: 0.8,
    borderTopWidth: 0,
    borderColor: "#000",
  },
  termsBody: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 4,
  },
  termsCol: {
    width: "50%",
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  termCell: {
    fontSize: 7.5,
    marginBottom: 2,
    lineHeight: 1.3,
  },
  termNote: {
    fontSize: 7.5,
    paddingHorizontal: 4,
    paddingBottom: 4,
    paddingTop: 2,
    lineHeight: 1.3,
  },

  acceptanceHeadingRow: {
    borderTopWidth: 0.8,
    borderTopColor: "#000",
    borderBottomWidth: 0.8,
    borderBottomColor: "#000",
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  acceptanceHeading: {
    fontSize: 7.5,
    fontWeight: 700,
    fontStyle: "italic",
    textDecoration: "underline",
  },

  acceptanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 6,
    paddingTop: 4,
    paddingBottom: 6,
  },

  acceptanceLeft: {
    flexDirection: "column",
  },

  acceptanceLabelLeft: {
    fontSize: 7.5,
    color: "#333",
    lineHeight: 1.4,
  },

  acceptanceGap: {
    marginTop: 14,
  },

  acceptanceRight: {
    alignItems: "center",
  },

  sealLine: {
    borderTopWidth: 0.8,
    borderTopColor: "#000",
    width: 140,
    marginBottom: 3,
  },

  sealText: {
    fontSize: 7.5,
    color: "#333",
    textAlign: "center",
  },

  eimctaSealBox: {
    width: "28%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  eimctaSealImg: {
    width: 120,
    height: 26,
    marginBottom: 4,
  },
  eimctaSealLine: {
    borderTopWidth: 0.8,
    borderTopColor: "#000",
    width: "100%",
    marginBottom: 3,
  },
  eimctaSealText: {
    fontSize: 7.5,
    color: "#000",
    textAlign: "center",
  },
  footerContact: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 5,
  },
  footerContactText: {
    fontSize: 7.5,
    color: "#000",
    textAlign: "center",
    lineHeight: 1.3,
  },
  footerBar: {
    backgroundColor: "#1F4E79",
    paddingVertical: 3.5,
    paddingHorizontal: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  footerBarThanks: {
    fontSize: 8,
    color: "#fff",
    textAlign: "center",
    fontWeight: 700,
  },
});

function QuoteMeta({ label, value }) {
  return (
    <View style={styles.quoteRow}>
      <Text style={styles.quoteLabel}>{label}</Text>
      <Text style={styles.quoteValue}>{value || " "}</Text>
    </View>
  );
}

function InfoLine({ label, value }) {
  return (
    <View style={styles.custLine}>
      <Text style={styles.custLabel}>{label}</Text>
      <Text style={styles.custValue}>{value || " "}</Text>
    </View>
  );
}

function CheckLine({ text }) {
  return (
    <View style={styles.checkLine}>
      <Text style={styles.checkBox}>X</Text>
      <Text style={styles.checkText}>{text}</Text>
    </View>
  );
}

function ItemRow({ desc, unit, taxed, amount }) {
  return (
    <View style={styles.tRow}>
      <Text style={[styles.td, styles.colDesc]}>{desc}</Text>
      <Text style={[styles.td, styles.colUnit]}>{unit}</Text>
      <Text style={[styles.td, styles.colTaxed]}>{taxed || " "}</Text>
      <Text style={[styles.td, styles.colAmount]}>{amount}</Text>
    </View>
  );
}

function TotalRow({ label, value }) {
  return (
    <View style={styles.totalRow}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}

export function QuotationDocument({ data = quoteTemplate }) {
  // Top bar
  const topDate = formatCurrentDate(data?.topBar?.date || data?.quote?.topDate);
  const coRegNo =
    data?.topBar?.coRegNo || data?.company?.coRegNo || "280667/078/079";
  const vatNo = data?.topBar?.vatNo || data?.company?.vatNo || "610183126";

  // Company Name & Address
  const companyNameLines = data?.company?.nameLines || [
    "Everest International Management",
    "Consultancy & Training Agency Pvt. Ltd (EIMCTA)",
  ];
  const addressLines = data?.company?.addressLines || [
    "J.P Complex 3rd Floor, Jorpati , Kathmandu , Nepal",
    "www.everestconstrain.com/ info@everestconstrain.com",
    "+977 1 5903211 , +977 9860 896 494",
    "Prepared by: Subekshya Parajuli",
    "Govt. Reg No : 280667-078/079",
  ];

  // Quote Metadata
  const quoteTitle = data?.quote?.title || "QUOTE";
  const quoteDate = data?.quote?.date || "16/1/2024";
  const quoteNumber = data?.quote?.number || "231197807";
  const customerId = data?.quote?.customerId || "";
  const salesPersonId = data?.quote?.salesPersonId || "";
  const validUntil = data?.quote?.validUntil || "";

  // Customer & Verifications
  const customerHeading = data?.customerHeading || "CUSTOMER";
  const customerFields = data?.customer || [
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
  ];
  const verifications = data?.verifications || [
    "Verification of valid Trade License",
    "Revalidated the Existance of Company",
    "Verification of Activities in Trade Lic.",
  ];

  // Items
  const itemHeaders = data?.itemHeaders || [
    "DESCRIPTION",
    "UNIT PRICE",
    "TAXED",
    "AMOUNT",
  ];
  const items = data?.items || [
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
  ];

  const remarksHeading = data?.remarks?.heading || "Remarks (if any) :";
  const accreditation =
    data?.remarks?.accreditation || "Nepal Red Cross Society";
  const cb = data?.remarks?.cb || "";
  const legend = data?.remarks?.legend || "CB - Certificaiton Body";
  const ls = data?.remarks?.ls || "Lump Sum";

  const totals = data?.totals || [
    { label: "Subtotal", value: "225,000.00" },
    { label: "VAT %", value: "13%" },
    { label: "13% of VAT", value: "29250" },
  ];
  const total = data?.total || { label: "Total", value: "AED 254,250.00" };

  const termsHeading = data?.terms?.heading || "TERMS AND CONDITIONS";
  let leftTerms = data?.terms?.leftLines;
  let rightTerms = data?.terms?.rightLines;
  if (!leftTerms || !rightTerms) {
    const rawLines =
      data?.terms?.lines && data.terms.lines.length > 0
        ? data.terms.lines.filter((l) => !l.startsWith("Note"))
        : [
            "1. Client will be billed after indicating acceptance of this quote.",
            "2. Payment Terms: 50% on signing of contract.",
            "3. 25% prior mobilization for training to site.",
            "4. 25% prior issuance of certification.",
            "5. Please fax or mail the signed price quote to the address above.",
            "6. Transportation cost included from/to Tumlingtar.",
            "7. Lodging & fooding provided by EIMCTA.",
          ];
    const mid = Math.ceil(rawLines.length / 2);
    leftTerms = leftTerms || rawLines.slice(0, mid);
    rightTerms = rightTerms || rawLines.slice(mid);
  }
  const termNote =
    data?.terms?.note ||
    "Note: Kindly refer to attached Details, Terms and Conditions of Training.";

  // Customer Acceptance
  const acceptanceHeading =
    data?.acceptance?.heading ||
    "Customer Acceptance (sign below & initiate with company Seal):";
  const signatureDate =
    data?.acceptance?.signatureDate ||
    data?.acceptance?.date ||
    "2024/01/16";
  const signatoryName =
    data?.acceptance?.signatoryName ||
    data?.acceptance?.signatory ||
    "";
  const sealLabel = data?.acceptance?.seal || "Customer's Company Seal";

  // Footer & EIMCTA Seal
  const sealText = data?.footer?.sealText || "Sign/Date and Seal of EIMCTA";
  const contactLine1 =
    data?.footer?.contact ||
    "If you have any questions about this price quote, please contact";
  const contactLine2 =
    data?.footer?.contactName || "Shailendra Kumar Kharel , 9860896494";
  const thanksLine =
    data?.footer?.thanks || "We are Thankful to be in Your Service";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark - fixed makes it repeat on every page, behind the content */}
        <Image src={watermarkSrc} style={styles.watermark} fixed />

        {/* TOP REGISTRATION & DATE BAR */}
        <View style={styles.topBar}>
          <Text style={styles.topBarText}>
            Co. Reg. No: {coRegNo} | VAT No: {vatNo}
          </Text>
          <Text style={styles.topBarText}>Date: {topDate}</Text>
        </View>

        {/* HEADER */}
        <View style={styles.headerRow}>
          <Image src={logoSrc} style={styles.logo} />
          <View style={styles.companyNameWrap}>
            {companyNameLines.map((line, idx) => (
              <Text key={idx} style={styles.companyName}>
                {line}
              </Text>
            ))}
          </View>
        </View>

        {/* ADDRESS + QUOTE BOX */}
        <View style={styles.addrQuoteRow}>
          <View style={styles.addrCol}>
            {addressLines.map((line, idx) => (
              <Text key={idx} style={styles.addrLine}>
                {line}
              </Text>
            ))}
          </View>
          <View style={styles.quoteCol}>
            <Text style={styles.quoteTitle}>{quoteTitle}</Text>
            <View style={styles.quoteTable}>
              <QuoteMeta label="DATE" value={quoteDate} />
              <QuoteMeta label="QUOTE #" value={quoteNumber} />
              <QuoteMeta label="CUSTOMER ID" value={customerId} />
              <QuoteMeta label="SALES PERSON ID" value={salesPersonId} />
              <QuoteMeta label="VALID UNTIL" value={validUntil} />
            </View>
          </View>
        </View>

        {/* CUSTOMER */}
        <Text style={styles.sectionBar}>{customerHeading}</Text>
        <View style={styles.custRow}>
          <View style={styles.custCol}>
            {customerFields.map((field, idx) => (
              <InfoLine key={idx} label={field.label} value={field.value} />
            ))}
          </View>
          <View style={styles.checkCol}>
            {verifications.map((v, idx) => (
              <CheckLine key={idx} text={v} />
            ))}
          </View>
        </View>

        {/* ITEMS TABLE */}
        <View style={styles.table}>
          <View style={styles.tRow}>
            <Text style={[styles.th, styles.colDesc]}>
              {itemHeaders[0] || "DESCRIPTION"}
            </Text>
            <Text style={[styles.th, styles.colUnit]}>
              {itemHeaders[1] || "UNIT PRICE"}
            </Text>
            <Text style={[styles.th, styles.colTaxed]}>
              {itemHeaders[2] || "TAXED"}
            </Text>
            <Text style={[styles.th, styles.colAmount]}>
              {itemHeaders[3] || "AMOUNT"}
            </Text>
          </View>
          {items.map((item, idx) => (
            <ItemRow
              key={idx}
              desc={item.description || item.desc}
              unit={item.unit}
              taxed={item.taxed}
              amount={item.amount}
            />
          ))}
        </View>

        <View style={styles.bottomBlock}>
          <View style={styles.remarksCell}>
            <Text style={styles.remarkLineBold}>{remarksHeading}</Text>
            <Text style={styles.remarkLine}>
              Accreditation Selected(if any) :{accreditation}
            </Text>
            <Text style={styles.remarkLine}>CB Selected(if any) :{cb}</Text>
            <Text style={styles.remarkLine}>Legend : {legend}</Text>
            <Text style={styles.remarkLine}>
              {ls.startsWith("LS") ? ls : `LS : ${ls}`}
            </Text>
          </View>
          <View style={styles.totalsCell}>
            {totals.map((t, idx) => (
              <TotalRow key={idx} label={t.label} value={t.value} />
            ))}
            <View style={styles.totalFinal}>
              <Text>{total.label || "Total"}</Text>
              <Text>{total.value}</Text>
            </View>
          </View>
        </View>

        {/* TERMS + EIMCTA SEAL side by side */}
        <View style={styles.termsAndSealRow}>

          {/* LEFT: Terms and Conditions + Customer Acceptance */}
          <View style={styles.termsBoxFull}>
            <Text style={styles.termsHeading}>{termsHeading}</Text>

            <View style={styles.termsContainer}>
              <View style={styles.termsBody}>
                <View style={styles.termsCol}>
                  {leftTerms.map((line, idx) => (
                    <Text key={idx} style={styles.termCell}>
                      {line}
                    </Text>
                  ))}
                </View>

                <View style={styles.termsCol}>
                  {rightTerms.map((line, idx) => (
                    <Text key={idx} style={styles.termCell}>
                      {line}
                    </Text>
                  ))}
                </View>
              </View>

              {termNote ? (
                <Text style={styles.termNote}>{termNote}</Text>
              ) : null}

              <View style={styles.acceptanceHeadingRow}>
                <Text style={styles.acceptanceHeading}>
                  {acceptanceHeading}
                </Text>
              </View>

              <View style={styles.acceptanceRow}>
                <View style={styles.acceptanceLeft}>
                  <Text style={styles.acceptanceLabelLeft}>
                    Signature / Date: {signatureDate}
                  </Text>
                  <Text
                    style={[styles.acceptanceLabelLeft, styles.acceptanceGap]}
                  >
                    Authorised Signatory&apos;s Name : {signatoryName}
                  </Text>
                </View>

                <View style={styles.acceptanceRight}>
                  <View style={styles.sealLine} />
                  <Text style={styles.sealText}>{sealLabel}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* RIGHT: EIMCTA Sign/Date/Seal */}
          <View style={styles.eimctaSealBox}>
            <Image src={eimctaSealSignSrc} style={styles.eimctaSealImg} />
            <View style={styles.eimctaSealLine} />
            <Text style={styles.eimctaSealText}>{sealText}</Text>
          </View>

        </View>

        {/* FOOTER */}
        <View style={styles.footerContact}>
          <Text style={styles.footerContactText}>{contactLine1}</Text>
          <Text style={styles.footerContactText}>{contactLine2}</Text>
        </View>

        <View style={styles.footerBar}>
          <Text style={styles.footerBarThanks}>{thanksLine}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default function Receipt({ data = quoteTemplate }) {
  const doc = useMemo(() => <QuotationDocument data={data} />, [data]);

  const handleDownload = async () => {
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = data?.fileNames?.pdf || FILE_NAMES?.pdf || "EIMCTA-Quotation.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return <button onClick={handleDownload}>Generate Quotation in pdf</button>;
}
