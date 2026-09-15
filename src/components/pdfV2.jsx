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

const NAVY_PRIMARY = "#1B365D"; 
const NAVY_ACCENT = "#2A4D7A";
const TEXT_DARK = "#0F172A"; 
const TEXT_MUTED = "#475569"; 
const BORDER_LIGHT = "#CBD5E1"; 
const BORDER_SUBTLE = "#E2E8F0"; 
const BG_LIGHT = "#F8FAFC"; // Slate 50
const RED_ACCENT = "#DC2626";

const styles = StyleSheet.create({
  page: {
    paddingTop: 18,
    paddingBottom: 16,
    paddingHorizontal: 24,
    fontSize: 8.5,
    fontFamily: "Helvetica",
    color: TEXT_DARK,
    backgroundColor: "#FFFFFF",
  },

  // Watermark overlaid on top of content (absolute, rendered last)
  watermark: {
    position: "absolute",
    top: "28%",
    left: "18%",
    width: 340,
    opacity: 1,
  },

  // 1. TOP METADATA BAR
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.6,
    borderBottomColor: BORDER_SUBTLE,
    paddingBottom: 4,
    marginBottom: 8,
  },
  topBarLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  topBarItem: {
    fontSize: 7.2,
    color: TEXT_MUTED,
    fontWeight: 500,
  },
  topBarDivider: {
    fontSize: 7.2,
    color: BORDER_LIGHT,
    marginHorizontal: 5,
  },
  topBarDate: {
    fontSize: 7.5,
    fontWeight: 700,
    color: NAVY_PRIMARY,
  },

  // 2. HEADER: LOGO + COMPANY TITLE
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logoWrap: {
    width: 88,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  logo: {
    width: 85,
    height: 46,
    objectFit: "contain",
  },
  companyNameWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
  },
  companyNameMain: {
    fontSize: 12.5,
    fontWeight: 700,
    color: NAVY_PRIMARY,
    textAlign: "center",
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  companyNameSub: {
    fontSize: 8.5,
    fontWeight: 600,
    color: NAVY_ACCENT,
    textAlign: "center",
  },

  // 3. ADDRESS & QUOTE BOX (2 COLUMNS)
  addrQuoteRow: {
    flexDirection: "row",
    marginBottom: 8,
    gap: 12,
  },
  addrCol: {
    flex: 1.7,
    justifyContent: "center",
  },
  addrLine: {
    fontSize: 7.4,
    color: TEXT_MUTED,
    lineHeight: 1.35,
    marginBottom: 1.5,
  },
  addrLineBold: {
    fontSize: 7.4,
    color: TEXT_DARK,
    fontWeight: 600,
    lineHeight: 1.35,
    marginBottom: 1.5,
  },
  quoteCol: {
    flex: 1.1,
    borderWidth: 0.8,
    borderColor: NAVY_PRIMARY,
    borderRadius: 3,
    overflow: "hidden",
  },
  quoteHeader: {
    backgroundColor: NAVY_PRIMARY,
    paddingVertical: 3,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quoteTitle: {
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 10,
    letterSpacing: 1,
  },
  quoteHeaderNumber: {
    color: "#E2E8F0",
    fontSize: 8,
    fontWeight: 600,
  },
  quoteTable: {
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  quoteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER_SUBTLE,
    paddingVertical: 2,
  },
  quoteRowLast: {
    borderBottomWidth: 0,
  },
  quoteLabel: {
    fontWeight: 600,
    fontSize: 7,
    color: TEXT_MUTED,
  },
  quoteValue: {
    fontSize: 7.2,
    fontWeight: 700,
    color: TEXT_DARK,
  },

  // 4. CUSTOMER & VERIFICATIONS
  sectionHeader: {
    backgroundColor: NAVY_PRIMARY,
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 8,
    letterSpacing: 0.6,
    paddingVertical: 3.5,
    paddingHorizontal: 6,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  custContainer: {
    flexDirection: "row",
    borderWidth: 0.7,
    borderColor: BORDER_LIGHT,
    borderTopWidth: 0,
    padding: 6,
    marginBottom: 8,
    gap: 8,
  },
  custCol: {
    flex: 1.6,
  },
  custLine: {
    flexDirection: "row",
    marginBottom: 2.2,
    alignItems: "flex-start",
  },
  custLabel: {
    fontWeight: 600,
    fontSize: 7.2,
    color: TEXT_MUTED,
    width: 125,
  },
  custValue: {
    fontSize: 7.4,
    fontWeight: 600,
    color: TEXT_DARK,
    flex: 1,
  },
  checkCol: {
    flex: 1,
    padding: 5,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: BORDER_SUBTLE,
    justifyContent: "center",
  },
  checkLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2.8,
  },
  checkBadge: {
    width: 11,
    height: 11,
    borderRadius: 2,
    backgroundColor: "#E2E8F0",
    borderWidth: 0.5,
    borderColor: NAVY_ACCENT,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  checkBadgeText: {
    fontSize: 7,
    fontWeight: 700,
    color: NAVY_PRIMARY,
  },
  checkText: {
    fontSize: 6.8,
    color: TEXT_DARK,
    flex: 1,
  },

  // 5. ITEMS TABLE
  table: {
    borderWidth: 0.8,
    borderColor: NAVY_PRIMARY,
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 0,
  },
  tHeadRow: {
    flexDirection: "row",
    backgroundColor: NAVY_PRIMARY,
    alignItems: "center",
    paddingVertical: 3.5,
  },
  th: {
    color: "#FFFFFF",
    fontSize: 7.5,
    fontWeight: 700,
    paddingHorizontal: 4,
    letterSpacing: 0.4,
  },
  tRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER_SUBTLE,
    paddingVertical: 3,
    minHeight: 16,
  },
  tRowEven: {},
  tRowOdd: {},
  td: {
    fontSize: 7.2,
    color: TEXT_DARK,
    paddingHorizontal: 4,
  },
  colDesc: { flex: 3.8, textAlign: "left" },
  colUnit: { flex: 1.4, textAlign: "center" },
  colTaxed: { flex: 1.1, textAlign: "center" },
  colAmount: { flex: 1.7, textAlign: "right", fontWeight: 600 },

  // 6. REMARKS + TOTALS ROW
  bottomBlock: {
    flexDirection: "row",
    borderWidth: 0.8,
    borderColor: BORDER_LIGHT,
    borderTopWidth: 0,
    marginBottom: 8,
  },
  remarksCell: {
    flex: 3.8 + 1.4, // Matches DESCRIPTION + UNIT PRICE
    padding: 5,
    borderRightWidth: 0.8,
    borderRightColor: BORDER_LIGHT,
    justifyContent: "space-between",
  },
  remarkHeading: {
    fontWeight: 700,
    fontSize: 7.2,
    color: NAVY_PRIMARY,
    marginBottom: 2,
  },
  remarkLine: {
    fontSize: 6.8,
    color: TEXT_MUTED,
    marginBottom: 1.2,
  },
  remarkBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 1,
  },
  remarkBadge: {
    backgroundColor: "#EEF2F6",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: BORDER_LIGHT,
  },
  remarkBadgeText: {
    fontSize: 6.5,
    fontWeight: 700,
    color: NAVY_PRIMARY,
  },
  totalsCell: {
    flex: 1.1 + 1.7, // Matches TAXED + AMOUNT
    padding: 0,
    justifyContent: "space-between",
  },
  totalSubRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER_SUBTLE,
  },
  totalSubLabel: {
    fontSize: 7,
    fontWeight: 600,
    color: TEXT_MUTED,
  },
  totalSubValue: {
    fontSize: 7.2,
    fontWeight: 600,
    color: TEXT_DARK,
  },
  totalFinalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: NAVY_PRIMARY,
    paddingHorizontal: 6,
    paddingVertical: 3.5,
  },
  totalFinalLabel: {
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 7.8,
    letterSpacing: 0.5,
  },
  totalFinalValue: {
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 8.2,
  },

  // 7. TERMS & CONDITIONS + EIMCTA SEAL ROW
  termsAndSealRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
    alignItems: "stretch",
  },
  termsBoxFull: {
    flex: 1,
    borderWidth: 0.8,
    borderColor: BORDER_LIGHT,
    borderRadius: 3,
    overflow: "hidden",
  },
  termsHeading: {
    backgroundColor: NAVY_PRIMARY,
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 7.5,
    letterSpacing: 0.5,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  termsBody: {
    flexDirection: "row",
    padding: 5,
    gap: 6,
  },
  termsCol: {
    flex: 1,
  },
  termItem: {
    flexDirection: "row",
    marginBottom: 2,
    alignItems: "flex-start",
  },
  termBullet: {
    fontSize: 6.5,
    fontWeight: 700,
    color: NAVY_PRIMARY,
    marginRight: 2,
  },
  termText: {
    fontSize: 6.3,
    color: TEXT_MUTED,
    lineHeight: 1.25,
    flex: 1,
  },
  termNoteBox: {
    borderTopWidth: 0.5,
    borderTopColor: BORDER_SUBTLE,
    paddingHorizontal: 6,
    paddingVertical: 2.5,
  },
  termNoteText: {
    fontSize: 6.2,
    fontStyle: "italic",
    color: TEXT_MUTED,
  },

  // Customer Acceptance
  acceptanceWrap: {
    borderTopWidth: 0.7,
    borderTopColor: BORDER_LIGHT,
    padding: 5,
  },
  acceptanceHeader: {
    fontSize: 6.5,
    fontWeight: 700,
    color: NAVY_PRIMARY,
    marginBottom: 4,
  },
  acceptanceContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  acceptanceLeft: {
    flex: 1.3,
  },
  acceptanceLine: {
    fontSize: 6.8,
    color: TEXT_DARK,
    fontWeight: 600,
    marginBottom: 2,
  },
  acceptanceRight: {
    flex: 1,
    alignItems: "center",
    borderWidth: 0.6,
    borderStyle: "dashed",
    borderColor: BORDER_LIGHT,
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
  sealPlaceholderText: {
    fontSize: 6.2,
    color: TEXT_MUTED,
    textAlign: "center",
    fontWeight: 600,
  },

  // EIMCTA Official Seal Box (Right Column)
  eimctaSealBox: {
    width: 140,
    borderWidth: 0.8,
    borderColor: BORDER_LIGHT,
    borderRadius: 3,
    padding: 6,
    alignItems: "center",
    justifyContent: "space-between",
  },
  eimctaBadgeTitle: {
    fontSize: 6.5,
    fontWeight: 700,
    color: NAVY_PRIMARY,
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  eimctaSealImg: {
    width: 110,
    height: 48,
    objectFit: "contain",
    marginVertical: 2,
  },
  eimctaSealLine: {
    width: "90%",
    borderBottomWidth: 0.8,
    borderBottomColor: NAVY_PRIMARY,
    marginBottom: 2,
  },
  eimctaSealText: {
    fontSize: 6.5,
    fontWeight: 700,
    color: NAVY_PRIMARY,
    textAlign: "center",
  },

  // 8. FOOTER: Centered Query Info & Dark Accent Bar
  footerWrap: {
    marginTop: "auto",
  },
  footerContact: {
    alignItems: "center",
    marginBottom: 4,
  },
  footerContactText: {
    fontSize: 6.8,
    color: TEXT_MUTED,
    textAlign: "center",
    lineHeight: 1.25,
  },
  footerContactHighlight: {
    fontWeight: 700,
    color: NAVY_PRIMARY,
  },
  footerBar: {
    backgroundColor: NAVY_PRIMARY,
    paddingVertical: 3.5,
    paddingHorizontal: 8,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  footerBarThanks: {
    fontSize: 7.2,
    color: "#FFFFFF",
    fontWeight: 700,
    letterSpacing: 0.4,
    textAlign: "center",
  },
});

export function QuotationDocumentV2({ data = quoteTemplate }) {
  // Top metadata
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
  const customerHeading = data?.customerHeading || "CUSTOMER INFORMATION";
  const customerFields = data?.customer || [
    { label: "Name of Contact Person :", value: "Ikram Mohammad" },
    {
      label: "Company Name :",
      value: "SJVN- Arun -3 Power Develepment Company Pvt. Ltd",
    },
    {
      label: "Company Address :",
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
  const items = data?.items || [];

  // Remarks & Totals
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

  // Terms & Conditions
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

        {/* 1. TOP METADATA BAR */}
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <Text style={styles.topBarItem}>Co. Reg. No: {coRegNo}</Text>
            <Text style={styles.topBarDivider}>|</Text>
            <Text style={styles.topBarItem}>VAT No: {vatNo}</Text>
          </View>
          <Text style={styles.topBarDate}>Date: {topDate}</Text>
        </View>

        {/* 2. HEADER ROW */}
        <View style={styles.headerRow}>
          <View style={styles.logoWrap}>
            <Image src={logoSrc} style={styles.logo} />
          </View>
          <View style={styles.companyNameWrap}>
            <Text style={styles.companyNameMain}>
              {companyNameLines[0] || "Everest International Management"}
            </Text>
            <Text style={styles.companyNameSub}>
              {companyNameLines[1] ||
                "Consultancy & Training Agency Pvt. Ltd (EIMCTA)"}
            </Text>
          </View>
        </View>

        {/* 3. ADDRESS & QUOTE BOX */}
        <View style={styles.addrQuoteRow}>
          <View style={styles.addrCol}>
            {addressLines.map((line, idx) => (
              <Text
                key={idx}
                style={
                  idx === 0 || idx === addressLines.length - 1
                    ? styles.addrLineBold
                    : styles.addrLine
                }
              >
                {line}
              </Text>
            ))}
          </View>
          <View style={styles.quoteCol}>
            <View style={styles.quoteHeader}>
              <Text style={styles.quoteTitle}>{quoteTitle}</Text>
              <Text style={styles.quoteHeaderNumber}>#{quoteNumber}</Text>
            </View>
            <View style={styles.quoteTable}>
              <View style={styles.quoteRow}>
                <Text style={styles.quoteLabel}>DATE</Text>
                <Text style={styles.quoteValue}>{quoteDate}</Text>
              </View>
              <View style={styles.quoteRow}>
                <Text style={styles.quoteLabel}>QUOTE #</Text>
                <Text style={styles.quoteValue}>{quoteNumber}</Text>
              </View>
              <View style={styles.quoteRow}>
                <Text style={styles.quoteLabel}>CUSTOMER ID</Text>
                <Text style={styles.quoteValue}>{customerId || "—"}</Text>
              </View>
              <View style={styles.quoteRow}>
                <Text style={styles.quoteLabel}>SALES PERSON</Text>
                <Text style={styles.quoteValue}>{salesPersonId || "—"}</Text>
              </View>
              <View style={[styles.quoteRow, styles.quoteRowLast]}>
                <Text style={styles.quoteLabel}>VALID UNTIL</Text>
                <Text style={styles.quoteValue}>{validUntil || "—"}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 4. CUSTOMER & VERIFICATIONS */}
        <Text style={styles.sectionHeader}>{customerHeading}</Text>
        <View style={styles.custContainer}>
          <View style={styles.custCol}>
            {customerFields.map((field, idx) => (
              <View key={idx} style={styles.custLine}>
                <Text style={styles.custLabel}>{field.label}</Text>
                <Text style={styles.custValue}>{field.value || "—"}</Text>
              </View>
            ))}
          </View>
          <View style={styles.checkCol}>
            {verifications.map((v, idx) => (
              <View key={idx} style={styles.checkLine}>
                <View style={styles.checkBadge}>
                  <Text style={styles.checkBadgeText}>✓</Text>
                </View>
                <Text style={styles.checkText}>{v}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 5. ITEMS TABLE */}
        <View style={styles.table}>
          <View style={styles.tHeadRow}>
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
            <View
              key={idx}
              style={[
                styles.tRow,
                idx % 2 === 0 ? styles.tRowEven : styles.tRowOdd,
              ]}
            >
              <Text style={[styles.td, styles.colDesc]}>
                {item.description || item.desc}
              </Text>
              <Text style={[styles.td, styles.colUnit]}>
                {item.unit || "Lump Sum"}
              </Text>
              <Text style={[styles.td, styles.colTaxed]}>
                {item.taxed || "—"}
              </Text>
              <Text style={[styles.td, styles.colAmount]}>
                {item.amount}
              </Text>
            </View>
          ))}
        </View>

        {/* 6. REMARKS + TOTALS ROW */}
        <View style={styles.bottomBlock}>
          <View style={styles.remarksCell}>
            <Text style={styles.remarkHeading}>{remarksHeading}</Text>
            <View style={styles.remarkBadgeRow}>
              <Text style={styles.remarkLine}>Accreditation Selected:</Text>
              <View style={styles.remarkBadge}>
                <Text style={styles.remarkBadgeText}>{accreditation}</Text>
              </View>
            </View>
            {cb ? (
              <Text style={styles.remarkLine}>CB Selected: {cb}</Text>
            ) : null}
            <Text style={styles.remarkLine}>Legend: {legend}</Text>
            <Text style={styles.remarkLine}>
              {ls.startsWith("LS") ? ls : `LS: ${ls}`}
            </Text>
          </View>
          <View style={styles.totalsCell}>
            {totals.map((t, idx) => (
              <View key={idx} style={styles.totalSubRow}>
                <Text style={styles.totalSubLabel}>{t.label}</Text>
                <Text style={styles.totalSubValue}>{t.value}</Text>
              </View>
            ))}
            <View style={styles.totalFinalRow}>
              <Text style={styles.totalFinalLabel}>
                {total.label || "TOTAL"}
              </Text>
              <Text style={styles.totalFinalValue}>{total.value}</Text>
            </View>
          </View>
        </View>

        {/* 7. TERMS & EIMCTA SEAL */}
        <View style={styles.termsAndSealRow}>
          {/* Left: Terms and Acceptance */}
          <View style={styles.termsBoxFull}>
            <Text style={styles.termsHeading}>{termsHeading}</Text>
            <View style={styles.termsBody}>
              <View style={styles.termsCol}>
                {leftTerms.map((line, idx) => (
                  <View key={idx} style={styles.termItem}>
                    <Text style={styles.termText}>{line}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.termsCol}>
                {rightTerms.map((line, idx) => (
                  <View key={idx} style={styles.termItem}>
                    <Text style={styles.termText}>{line}</Text>
                  </View>
                ))}
              </View>
            </View>

            {termNote ? (
              <View style={styles.termNoteBox}>
                <Text style={styles.termNoteText}>{termNote}</Text>
              </View>
            ) : null}

            {/* Customer Acceptance */}
            <View style={styles.acceptanceWrap}>
              <Text style={styles.acceptanceHeader}>{acceptanceHeading}</Text>
              <View style={styles.acceptanceContent}>
                <View style={styles.acceptanceLeft}>
                  <Text style={styles.acceptanceLine}>
                    Signature / Date: {signatureDate}
                  </Text>
                  <Text style={styles.acceptanceLine}>
                    Authorised Signatory&apos;s Name : {signatoryName || "____________________"}
                  </Text>
                </View>
                <View style={styles.acceptanceRight}>
                  <Text style={styles.sealPlaceholderText}>{sealLabel}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Right: EIMCTA Stamp & Sign */}
          <View style={styles.eimctaSealBox}>
            <Text style={styles.eimctaBadgeTitle}>OFFICIAL VERIFICATION</Text>
            <Image src={eimctaSealSignSrc} style={styles.eimctaSealImg} />
            <View style={styles.eimctaSealLine} />
            <Text style={styles.eimctaSealText}>{sealText}</Text>
          </View>
        </View>

        {/* 8. FOOTER */}
        <View style={styles.footerWrap}>
          <View style={styles.footerContact}>
            <Text style={styles.footerContactText}>{contactLine1}</Text>
            <Text style={styles.footerContactText}>
              <Text style={styles.footerContactHighlight}>{contactLine2}</Text>
            </Text>
          </View>
          <View style={styles.footerBar}>
            <Text style={styles.footerBarThanks}>
              {thanksLine}
            </Text>
          </View>
        </View>

        {/* Watermark rendered LAST so it overlays all content */}
        <Image src={watermarkSrc} style={styles.watermark} fixed />
      </Page>
    </Document>
  );
}

export default function ReceiptV2({ data = quoteTemplate }) {
  const doc = useMemo(() => <QuotationDocumentV2 data={data} />, [data]);

  const handleDownload = async () => {
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = data?.fileNames?.pdfV2 || "EIMCTA-Quotation-V2.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return <button onClick={handleDownload}>Generate Quotation in pdf (V2 Enhanced UI)</button>;
}
