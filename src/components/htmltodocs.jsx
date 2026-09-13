import { useRef } from "react";
import html2pdf from "html2pdf.js";
import logoSrc from "../assets/eimcta-logo.png";
import watermarkSrc from "../assets/watermark.png";

// npm install html2pdf.js

const NAVY = "#1F4E79";

const styles = {
  page: {
    width: 780,
    margin: "0 auto",
    fontFamily: "Calibri, Arial, sans-serif",
    color: "#000",
    fontSize: 12,
    position: "relative",
  },
  watermark: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: 0.15,
    pointerEvents: "none",
    zIndex: 0,
  },
  table: { width: "100%", borderCollapse: "collapse" },
  companyName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    color: NAVY,
    lineHeight: 1.3,
  },
  addrLine: { fontSize: 11, lineHeight: 1.6 },
  quoteTitle: {
    color: "red",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    letterSpacing: 1,
  },
  sectionBar: {
    background: NAVY,
    color: "#fff",
    fontWeight: "bold",
    padding: "4px 8px",
    fontSize: 12,
  },
  custLabel: { fontWeight: "bold", whiteSpace: "nowrap", fontSize: 11, padding: "2px 4px", verticalAlign: "top" },
  custValue: { fontSize: 11, padding: "2px 4px", verticalAlign: "top" },
  checkBox: {
    width: 16,
    height: 16,
    border: "1px solid #000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 11,
    padding: "2px 4px",
  },
  checkText: { fontSize: 10, padding: "2px 4px", verticalAlign: "middle" },
  th: { background: NAVY, color: "#fff", fontSize: 11, padding: 4, border: `1px solid ${NAVY}` },
  td: { border: "1px solid #999", fontSize: 11, padding: 4 },
  amt: { textAlign: "right" },
  ctr: { textAlign: "center" },
  remarkLine: { fontSize: 11, margin: "1px 0" },
  termsBox: { border: "1px solid #000", verticalAlign: "top", padding: 6, width: "62%" },
  totalsBox: { border: "1px solid #000", verticalAlign: "top", padding: 0 },
  termLine: { fontSize: 9.5, margin: "2px 0" },
  totalRowLabel: { fontSize: 11, padding: "3px 8px", borderBottom: "1px solid #ccc" },
  totalRowValue: { fontSize: 11, padding: "3px 8px", borderBottom: "1px solid #ccc", textAlign: "right" },
  totalFinal: {
    background: NAVY,
    color: "#fff",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 8px",
    marginTop: 2,
    fontSize: 13,
  },
  footerCell: { fontSize: 10, verticalAlign: "top" },
};

function QuoteRow({ label, value }) {
  return (
    <tr>
      <td style={{ fontWeight: "bold", whiteSpace: "nowrap", fontSize: 10, padding: "2px 4px", borderBottom: "1px solid #ccc" }}>
        {label}
      </td>
      <td style={{ fontSize: 10, padding: "2px 4px", borderBottom: "1px solid #ccc" }}>{value || "\u00A0"}</td>
    </tr>
  );
}

function InfoRow({ label, value }) {
  return (
    <tr>
      <td style={styles.custLabel}>{label}</td>
      <td style={styles.custValue}>{value || "\u00A0"}</td>
    </tr>
  );
}

function CheckRow({ text }) {
  return (
    <tr>
      <td style={styles.checkBox}>{"\u2713"}</td>
      <td style={styles.checkText}>{text}</td>
    </tr>
  );
}

function ItemRow({ desc, unit, taxed, amount }) {
  return (
    <tr>
      <td style={styles.td}>{desc}</td>
      <td style={{ ...styles.td, ...styles.ctr }}>{unit}</td>
      <td style={{ ...styles.td, ...styles.amt }}>{taxed || "\u00A0"}</td>
      <td style={{ ...styles.td, ...styles.amt }}>{amount}</td>
    </tr>
  );
}

function TotalRow({ label, value }) {
  return (
    <tr>
      <td style={styles.totalRowLabel}>{label}</td>
      <td style={styles.totalRowValue}>{value}</td>
    </tr>
  );
}

export default function Receipt() {
  const printRef = useRef(null);

  const handleDownload = () => {
    const opt = {
      margin: [10, 10, 10, 10],
      filename: "EIMCTA-Quotation.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(printRef.current).save();
  };

  return (
    <div>
      <button onClick={handleDownload} style={{ marginBottom: 16 }}>
        Generate Quotation
      </button>

      <div ref={printRef} style={styles.page}>
        {/* WATERMARK */}
        <img src={watermarkSrc} style={styles.watermark} width={400} alt="Watermark" />

        {/* HEADER */}
        <table style={{ ...styles.table, position: "relative", zIndex: 1 }}>
          <tbody>
            <tr>
              <td style={{ width: 140 }}>
                <img src={logoSrc} width={120} alt="EIMCTA" />
              </td>
              <td>
                <div style={styles.companyName}>Everest International Management</div>
                <div style={styles.companyName}>Consultancy &amp; Training Agency Pvt. Ltd (EIMCTA)</div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* ADDRESS + QUOTE BOX */}
        <table style={{ ...styles.table, marginTop: 10 }}>
          <tbody>
            <tr>
              <td style={{ verticalAlign: "top" }}>
                <div style={styles.addrLine}>J.P Complex 3rd Floor, Jorpati , Kathmandu , Nepal</div>
                <div style={styles.addrLine}>www.everestconstrain.com/ info@everestconstrain.com</div>
                <div style={styles.addrLine}>{"\u260E"} +977 1 5903211 , +977 9860 896 494</div>
                <div style={styles.addrLine}>Prepared by: Subekshya Parajuli</div>
                <div style={styles.addrLine}>Govt. Reg No : 280667-078/079</div>
              </td>
              <td style={{ width: 230, verticalAlign: "top" }}>
                <div style={styles.quoteTitle}>QUOTE</div>
                <table style={styles.table}>
                  <tbody>
                    <QuoteRow label="DATE" value="16/1/2024" />
                    <QuoteRow label="QUOTE #" value="231197807" />
                    <QuoteRow label="CUSTOMER ID" value="" />
                    <QuoteRow label="SALES PERSON ID" value="" />
                    <QuoteRow label="VALID UNTIL" value="" />
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        {/* CUSTOMER BAR */}
        <div style={{ ...styles.sectionBar, marginTop: 10 }}>CUSTOMER</div>

        <table style={{ ...styles.table, marginTop: 6 }}>
          <tbody>
            <tr>
              <td style={{ width: "62%", verticalAlign: "top" }}>
                <table style={styles.table}>
                  <tbody>
                    <InfoRow label="Name of Contact Person :" value="Ikram Mohammad" />
                    <InfoRow label="Company Name :" value="SJVN- Arun -3 Power Develepment Company Pvt. Ltd" />
                    <InfoRow label="Company Address" value="Tumlingtar, Adit-2 Solakhani & Dam Site Dovan" />
                    <InfoRow label="Telephone / Landline :" value="9852099786" />
                    <InfoRow label="Mobile No. :" value="9852099786" />
                    <InfoRow label="Customer TRN No. :" value="" />
                  </tbody>
                </table>
              </td>
              <td style={{ verticalAlign: "top" }}>
                <table style={styles.table}>
                  <tbody>
                    <CheckRow text="Verification of valid Trade License" />
                    <CheckRow text="Revalidated the Existance of Company" />
                    <CheckRow text="Verification of Activities in Trade Lic." />
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        {/* ITEMS TABLE */}
        <table style={{ ...styles.table, marginTop: 10 }}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: "55%" }}>DESCRIPTION</th>
              <th style={styles.th}>UNIT PRICE</th>
              <th style={styles.th}>TAXED</th>
              <th style={styles.th}>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <ItemRow desc="Basic First Aid Awarness Training 6 hrs- (Day 1)" unit="Lump Sum" taxed="" amount="75,000.00" />
            <ItemRow desc="Basic First Aid Awarness Training 6 hrs - ( Day 2)" unit="Lump Sum" taxed="" amount="75,000.00" />
            <ItemRow desc="Basic First Aid Awarness Training 6 hrs- ( Day 3 )" unit="Lump Sum" taxed="" amount="75,000.00" />
          </tbody>
        </table>

        {/* REMARKS */}
        <div style={{ marginTop: 6 }}>
          <div style={{ ...styles.remarkLine, fontWeight: "bold" }}>Remarks (if any) :</div>
          <div style={styles.remarkLine}>Accreditation Selected(if any) :Nepal Red Cross Society</div>
          <div style={styles.remarkLine}>CB Selected(if any) :</div>
          <div style={styles.remarkLine}>Legend : CB - Certificaiton Body</div>
          <div style={styles.remarkLine}>LS : Lump Sum</div>
        </div>

        {/* TERMS + TOTALS */}
        <table style={{ ...styles.table, marginTop: 8 }}>
          <tbody>
            <tr>
              <td style={styles.termsBox}>
                <div style={styles.sectionBar}>TERMS AND CONDITIONS</div>
                <div style={{ marginTop: 4 }}>
                  <div style={styles.termLine}>1. Client will be billed after indicating acceptance of this quote.</div>
                  <div style={styles.termLine}>2. Payment Terms : 50% on signing of contract,</div>
                  <div style={styles.termLine}>3. 25 % Prior Mobilization For Training To Site</div>
                  <div style={styles.termLine}>4. 25 % Prior Issuance Of Certification</div>
                  <div style={styles.termLine}>5. Please fax or mail the signed price quote to the address above.</div>
                  <div style={styles.termLine}>6. Transportation Cost Included From / To Tumlingtar .</div>
                  <div style={styles.termLine}>&nbsp;&nbsp;(Local transportation will be provided by Client )</div>
                  <div style={styles.termLine}>7. Lodging &amp; Fooding provided by EIMCTA</div>
                  <div style={styles.termLine}>Note :  Kindly Refer to attached Details, Terms and Conditions of Training.</div>
                </div>

                <div style={{ marginTop: 14, fontStyle: "italic", fontWeight: "bold", fontSize: 10.5 }}>
                  Customer Acceptance (sign below &amp; initiate with company Seal ):
                </div>
                <div style={{ marginTop: 14, fontSize: 10.5 }}>Signature/ Date : 2024/01/16</div>
                <div style={{ fontSize: 10.5 }}>Authorised Signatory's Name : ___________________________</div>
                <div style={{ fontSize: 9.5, marginTop: 4 }}>Customer's Company Seal</div>
              </td>
              <td style={styles.totalsBox}>
                <table style={styles.table}>
                  <tbody>
                    <TotalRow label="Subtotal" value="225,000.00" />
                    <TotalRow label="VAT %" value="13%" />
                    <TotalRow label="13% of VAT" value="29250" />
                  </tbody>
                </table>
                <div style={styles.totalFinal}>
                  <span>Total</span>
                  <span>AED&nbsp;&nbsp;254,250.00</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* FOOTER */}
        <table style={{ ...styles.table, marginTop: 10 }}>
          <tbody>
            <tr>
              <td style={styles.footerCell}>
                <div>If you have any questions about this price quote, please contact</div>
                <div>Shailendra Kumar Kharel , 9860896494</div>
                <div style={{ fontStyle: "italic", marginTop: 4 }}>{"\u00A9"} We are Thankful to be in Your Service {"\u00A9"}</div>
              </td>
              <td style={{ ...styles.ctr, width: 140 }}>
                <img src={logoSrc} width={55} alt="EIMCTA" />
                <br />
                <span style={{ fontSize: 9 }}>Sign, Date and Seal of EIMCTA</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}