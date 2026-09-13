import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    BorderStyle,
    AlignmentType,
    ImageRun,
    Table,
    TableRow,
    TableCell,
    WidthType,
    VerticalAlign,
    ShadingType,
    LevelFormat,
    HorizontalPositionAlign,
    HorizontalPositionRelativeFrom,
    HeightRule,
    VerticalPositionRelativeFrom,
    VerticalPositionAlign,
    TextWrappingType,
    Header,
    Footer,
    PageNumber,
    PageBreak,
    UnderlineType
} from "docx";

import logo from '../../assets/logo.png';
import iso from '../../assets/iso.png';
import watermark from '../../assets/iso.png';

// ═══════════════════════════════════════════════════════════════════════════
//  STATIC DOCUMENT CONSTANTS
// ══════════════════════

/**
 * Fixed reference number printed in the metadata bar. The two sales fields
 * beside it are intentionally left as ruled blank lines to be completed by
 * hand on the printed copy, so they have no static default.
 */
const STATIC_REF_NO = "EIMCTA/SLA/2026/0142";

const renderAnnexureIcon = (icon, props = {}) => {
    if (icon) return icon;

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path d="M7 3.75h6l5 5v11.5A1.75 1.75 0 0 1 16.25 22h-9.5A1.75 1.75 0 0 1 5 20.25v-14A1.75 1.75 0 0 1 6.75 4.5z" />
            <path d="M13 3.75V9h5" />
            <path d="M8.5 13h7M8.5 16.5h7" />
        </svg>
    );
};

const ANNEXES_DETAILS = [
    {
        title: "Annexure - 01: Service Details",
        desc: "Comprehensive scope of work, technical specifications, resource allocation, and milestone deliverables.",
        icon: null
    },
    {
        title: "Annexure - 02: Terms, Conditions & Definitions",
        desc: "Governing legal framework, client responsibilities, validity, and dispute resolution.",
        icon: null
    }
];

const PAYMENT_TERMS = [
    "50% of Grand Total on Signing of Contract",
    "30% on Submission of Documents",
    "10% Prior Booking of Training",
    "10% on Prior Audit and Certification",
];

const NOTES = [
    "Once agreed and signed, please revert scanned copy of this document to +977 9741766637 (WhatsApp) or info@eimcta.com.np to proceed further.",
    "Kindly read, understand, agree and sign off Annexure-01 and Annexure-02 before signing this SLA/Contract.",
    "Transportation, food/hotel outside Kathmandu Valley & Koshi Province shall be borne by the CLIENT only.",
    "If travel time from EIMCTA HQ in KTM to Client Location exceeds 2 hrs., it is chargeable @ NPR 2,000.00/hr.",
];

const TERMS_AND_CONDITIONS = [
    { title: "Agreement Activation", text: "The Service Level Agreement (SLA) is officially established and becomes effective immediately upon the signing of this contract or the formal approval of this Service Quote by both parties." },
    { title: "Compliance & Right of Revocation", text: "The First Party (Everest International Management Consultancy and Training Agency Pvt. Ltd. | www.eimcta.com.np | 01-5903-211) strictly prohibits the provision of services to illegal establishments, enterprises, or organizations. In the event that fraudulent information, false documentation, or illegal activities by the Second Party (the Client) are detected, the First Party reserves the right to immediately terminate all services and revoke any associated certifications or credentials." },
    { title: "Logistics & Accommodation", text: "The Client is responsible for arranging and covering all costs associated with airfare, local transportation, accommodation, and meals for the consultant(s) or auditor(s) during all site visits." },
    { title: "Out-of-Scope Services", text: "Any additional services or repetition of previously completed services that fall outside the original scope of this agreement will be billed to the Client separately." },
    { title: "Travel Time Surcharge", text: "Travel time for the consultant or auditor exceeding two (2) hours per trip will be subject to an additional charge of Rs. 2,000 per hour." },
    { title: "Taxes", text: "All quoted service fees are exclusive of the applicable 13% Value Added Tax (VAT), which shall be borne by the Client." },
    { title: "Contract Termination", text: "Should the Client wish to terminate this contract prior to the completion of services, a written notice must be submitted to the First Party via email at eimcta.md@gmail.com at least sixty (60) days in advance. Upon early termination, the Client is obligated to settle all outstanding balances and service charges incurred up to the date of termination." },
    { title: "Validity", text: "This proposal and its commercial terms remain valid for a period of thirty (30) days from the date of issuance." },
];

const NDA_TERMS = [
    { title: "Definition of Confidential Information", text: "\"Confidential Information\" refers to all non-public information exchanged between the First Party and the Second Party (the Client). This includes, but is not limited to, proprietary management frameworks, training materials, audit checklists, quality management documentation, financial records, strategic plans, and operational data." },
    { title: "Mutual Obligation of Secrecy", text: "Both parties agree to maintain strict confidentiality regarding all information shared during the execution of the services. Neither party shall disclose, publish, or share any Confidential Information with third parties without the prior, explicit written consent of the other party." },
    { title: "Protection of Intellectual Property (First Party)", text: "All consultancy frameworks, educational strategies, templates, software systems, and customized documentation provided by the First Party remain its exclusive intellectual property. The Client agrees to use these materials solely for internal operational purposes and is strictly prohibited from reproducing, distributing, reselling, or commercially exploiting them." },
    { title: "Protection of Client Data (Second Party)", text: "The First Party guarantees that any internal records, business processes, or operational practices observed or accessed during gap analysis, implementation support, or auditing will remain strictly confidential and will be used exclusively for the purpose of fulfilling the contracted services." },
    { title: "Secure Handling & Deletion of Digital Assets", text: "Upon the completion, expiration, or termination of this contract, the First Party agrees to securely transfer, return, or permanently delete all digital assets, client-specific ERP/software data, and electronic databases belonging to the Client, except where retention is strictly required by law or accreditation bodies. Similarly, the Client agrees to permanently delete or return any proprietary digital tools, templates, or software access provided by the First Party." },
    { title: "Exceptions to Confidentiality", text: "The obligations of non-disclosure shall not apply to information that: (a) is or becomes publicly available through no fault of the receiving party; (b) was already known to the receiving party prior to disclosure; or (c) is required to be disclosed by law, court order, or regulatory authority." },
    { title: "Survival of Terms", text: "The obligations regarding confidentiality and non-disclosure shall survive the expiration, cancellation, or early termination of this contract and shall remain in full force and effect for a period of three (3) years following the termination date." },
    { title: "Breach of Confidentiality", text: "In the event of an unauthorized disclosure or breach of these terms by either party, the affected party reserves the right to immediately terminate the service agreement and pursue any applicable legal remedies for damages incurred." },
];

const additionalCosts = [
    "Full Time EOMS Officer (Vice Principal)",
    "Data Entry Operator (DEO) one/250 Learners",
    "Printables Flex, Board, Press Items (2000/Section or Class room)",
    "Time for Educators to evaluate CW/HW and Unitwise Test",
    "Cost for Monthly Appraisal Prizes: 1st Prize, 2nd Prize and 3rd Prize with Certification and Rolling Trophy",
    "Book Free Friday (Unit Based Exhibition & Integrated Classes)",
    "Month-end School off for Monthly Review Meeting",
    "Early Child (Play Group) Curriculum for Emotional Development - with separate facility to take rest, take food, Indoor Activity Space, Outdoor Facility Space"
];

// ═══════════════════════════════════════════════════════════════════════════
//  DESIGN TOKENS & STYLING
//
//  THEME — Navy / Teal / Sage
//  ─────────────────────────
//  A deep ink-navy structure carrying a muted sage-teal accent, set on cool
//  neutral paper (pale mint / blue-grey). Same "Ink & Champagne" structural
//  rules as before — the accent family has simply moved from warm gold to
//  cool sage-teal to match the brand palette used across EIMCTA documents.
//
//  Three rules keep it feeling composed rather than decorated:
//
//    1. Navy carries structure, sage-teal carries attention. The accent never
//       fills a large area except as its faintest wash — it appears as thin
//       rules, bullets, checkboxes and small ink.
//    2. Rules are hairlines. Accent bars sit at 0.75–1.5pt; table gridlines
//       at 0.25pt. Weight comes from tone, not thickness.
//    3. Capitals are tracked and small. Wide letter-spacing at a modest point
//       size reads as considered; large tight capitals read as loud.
//
//  Every colour is a mid-to-dark ink or a near-white paper tone, so the whole
//  document survives greyscale printing and photocopying — which matters, as
//  these are printed and signed by hand.
// ═══════════════════════════════════════════════════════════════════════════

const FONT = "Roboto";

/**
 * Serif face used for the document title only — a serif display line over a
 * sans body is what carries most of the "luxury" read here. Georgia ships with
 * Word on both Windows and macOS, so it is safe to specify.
 * To revert to an all-sans document, set this to FONT.
 */
const DISPLAY_FONT = "Georgia";

/** Usable text width: page 11906 twip − left 864 − right 864. */
const CONTENT_WIDTH = 10178;

const themeColors = {
    darkestNavy: "#0C1F2B",        // Headings, emphasis text, darkest banner fills
    deepNavyBlue: "#1A4355",       // Secondary banners, borders
    royalNavy: "#3B4C56",          // Field labels, secondary text (slate gray)
    slateNavy: "#A7B8B5",          // Table borders and rules (light sage-gray)
    secondarySlateNavy: "#D3DFDD", // Table borders and rules (light sage-gray, lighter)
    nearBlack: "#0A1014",          // Default body text
    paleGoldIvory: "#E8EEF1",      // Section header bars, table shading, callout boxes
    paleIvory: "#F2F5F7",          // Section header bars, table shading, callout boxes
    paleGoldWash: "#F0F4F3",       // Section header bars, table shading, callout boxes
    richGold: "#5C7873",           // Section-header accent bars, bullet squares (muted sage-teal)
    mutedGold: "#1A4355",          // Secondary accent / emphasis (deep teal-blue)
    white: "#FFFFFF"
};

const C = {
    // ── Structure: deep navy family ─────────────────────────────────────
    ink: themeColors.darkestNavy,
    inkSoft: themeColors.deepNavyBlue,
    inkMuted: themeColors.royalNavy,
    body: themeColors.nearBlack,

    // ── Accent: royal gold family ─────────────────────────────────────
    gold: themeColors.richGold,
    goldDeep: themeColors.mutedGold,
    goldLight: themeColors.paleGoldIvory,
    goldWash: themeColors.paleGoldWash,

    // ── Paper: warm ivory neutrals ─────────────────────────────────────────────
    ivory: themeColors.paleIvory,
    panel: themeColors.paleGoldIvory,
    hairline: themeColors.slateNavy,
    rule: themeColors.secondarySlateNavy,
    white: themeColors.white,
};

const NO_BORDER = {
    top: { style: BorderStyle.NONE, size: 0, color: "auto" },
    bottom: { style: BorderStyle.NONE, size: 0, color: "auto" },
    left: { style: BorderStyle.NONE, size: 0, color: "auto" },
    right: { style: BorderStyle.NONE, size: 0, color: "auto" },
    insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "auto" },
    insideVertical: { style: BorderStyle.NONE, size: 0, color: "auto" },
};

const OFF = { style: BorderStyle.NONE, size: 0, color: "auto" };

/**
 * Border `size` is in EIGHTHS of a point: 2 = 0.25pt, 4 = 0.5pt, 8 = 1pt.
 * Gridlines are deliberately at the finest weight Word will still print
 * reliably, and tinted sand rather than grey so they recede into the paper.
 */
const TABLE_BORDERS = {
    top: { style: BorderStyle.SINGLE, size: 4, color: C.hairline },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: C.hairline },
    left: { style: BorderStyle.SINGLE, size: 4, color: C.hairline },
    right: { style: BorderStyle.SINGLE, size: 4, color: C.hairline },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: C.hairline },
    insideVertical: { style: BorderStyle.SINGLE, size: 2, color: C.hairline },
};

/**
 * Cell-level variant of TABLE_BORDERS. A TableCell accepts only the four
 * edges — insideHorizontal / insideVertical are table-level keys and are
 * silently dropped, so they are omitted here rather than deleted later.
 */
const CELL_BORDERS = {
    top: { style: BorderStyle.SINGLE, size: 2, color: C.hairline },
    bottom: { style: BorderStyle.SINGLE, size: 2, color: C.hairline },
    left: { style: BorderStyle.SINGLE, size: 2, color: C.hairline },
    right: { style: BorderStyle.SINGLE, size: 2, color: C.hairline },
};

// ═══════════════════════════════════════════════════════════════════════════
//  IMAGE HELPERS
// ═══════════════════════════════════════════════════════════════════════════

async function getImageBytes(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to load image: ${url}`);
        return await res.arrayBuffer();
    } catch (e) {
        console.warn(e);
        return null;
    }
}

async function createWatermarkBytes(imageUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            // Lowered from 0.10: the watermark should register as a texture in
            // the paper, never as a shape competing with the ruled tables.
            ctx.globalAlpha = 0.06;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(async (blob) => {
                if (blob) resolve(await blob.arrayBuffer());
                else reject(new Error("Failed to convert canvas to Blob"));
            }, "image/png");
        };
        img.onerror = () => reject(new Error(`Failed to load image for canvas: ${imageUrl}`));
        img.src = imageUrl;
    });
}

// ═══════════════════════════════════════════════════════════════════════════
//  PRIMITIVES & COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

const tr = (text, opts = {}) => new TextRun({
    text,
    font: FONT,
    bold: opts.bold || false,
    size: opts.size || 20,
    color: opts.color || C.body,
    ...opts,
});

/**
 * Default line height opened from 360 to 380 twips. At 10pt body copy that is
 * a shade over 1.5 — the single cheapest change available for making dense
 * contractual prose feel unhurried.
 */
const p = (text, opts = {}) => new Paragraph({
    alignment: opts.alignment || AlignmentType.LEFT,
    spacing: opts.spacing || { after: 140, line: 380 },
    shading: opts.shading,
    // `border` is the correct Paragraph key in docx; `borders` is kept for
    // backwards compatibility with existing call sites.
    border: opts.border || opts.borders,
    indent: opts.indent,
    numbering: opts.numbering,
    keepNext: opts.keepNext,
    children: opts.children || (text ? [tr(text, opts)] : []),
});

/**
 * A true hairline spacer paragraph. Note that `run: { size: 2 }` on a
 * Paragraph is silently ignored by docx — the size must live on an actual
 * TextRun, otherwise the "thin" rule paragraph occupies a full text line and
 * the title block loses its tight sandwich.
 */
const hairlineRule = (border) => new Paragraph({
    spacing: { before: 0, after: 0, line: 20 },
    border,
    children: [new TextRun({ text: "", size: 2, font: FONT })],
});

const cell = ({ children, width, margins, bg, borders, vAlign, span }) => {
    const safeBorders = borders ? { ...borders } : { ...NO_BORDER };
    delete safeBorders.insideHorizontal;
    delete safeBorders.insideVertical;

    return new TableCell({
        children,
        width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
        columnSpan: span || 1,
        margins: margins || { top: 110, bottom: 110, left: 130, right: 130 },
        shading: bg ? { fill: bg, type: ShadingType.CLEAR, color: "auto" } : undefined,
        borders: safeBorders,
        verticalAlign: vAlign || VerticalAlign.CENTER,
    });
};

const divider = () =>
    new Paragraph({
        spacing: { before: 140, after: 200 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.gold } },
    });

const spacer = (after = 200) => p("", { spacing: { after } });

/**
 * Label / value pair inside the client details grid. The label is set in muted
 * navy-grey and the value in full navy ink, so the eye can skim values down
 * the column without the labels competing.
 */
const docInfoP = (label, value) => p("", {
    spacing: { after: 80, line: 340 },
    children: [
        tr(`${label}: `, { color: C.inkMuted, size: 18 }),
        tr(value || "N/A", { bold: true, color: C.ink })
    ]
});

/**
 * Section heading — parchment band with a thin gold rule down its leading
 * edge. Previously a 2pt royal-blue bar on cool grey; the bar is now 1.5pt
 * gold and the capitals are smaller but widely tracked, which reads as a
 * considered heading rather than a warning strip.
 */
const sectionHeading = (title) => new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: NO_BORDER,
    rows: [
        new TableRow({
            cantSplit: true,
            children: [
                cell({
                    bg: C.panel,
                    borders: {
                        ...NO_BORDER,
                        left: { style: BorderStyle.SINGLE, size: 22, color: C.ink },
                        bottom: { style: BorderStyle.SINGLE, size: 0, color: C.hairline },
                    },
                    margins: { top: 100, bottom: 100, left: 160, right: 150 },
                    children: [
                        p(title.toUpperCase(), {
                            bold: true,
                            size: 19,
                            color: C.ink,
                            characterSpacing: 16,
                            spacing: { after: 0, line: 280 },
                        })
                    ]
                })
            ]
        })
    ]
});

const listItem = (text, bulletReference) => p(text, {
    spacing: { after: 130, line: 380 },
    numbering: { reference: bulletReference, level: 0 },
    color: C.ink,
    size: 20
});

/**
 * Numbered clause paragraph for the Terms & Conditions / Non-Disclosure
 * pages — a bold navy title lead-in ("1. Agreement Activation:") followed by
 * the clause body in regular ink, justified like the preamble text. Uses the
 * same decimal numbering reference for both lists so their numbering resets
 * cleanly between the two section headings.
 */
const clauseItem = (title, text, numberingReference = "numbered-clause") => new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 160, line: 380 },
    numbering: { reference: numberingReference, level: 0 },
    children: [
        tr(`${title}: `, { bold: true, color: C.ink, size: 20 }),
        tr(text, { color: C.body, size: 20 }),
    ],
});

/**
 * Notes / advisory block. The 3pt amber edge became a 1.5pt gold edge over the
 * faintest gold wash — still unmistakably the "read this" panel, without the
 * highlighter-pen quality of the previous amber fill.
 */
const suggestionBlock = (title, points) => new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
        top: { style: BorderStyle.SINGLE, size: 2, color: C.hairline },
        bottom: { style: BorderStyle.SINGLE, size: 2, color: C.hairline },
        left: { style: BorderStyle.SINGLE, size: 22, color: C.ink },
        right: { style: BorderStyle.NONE, size: 0, color: "auto" },
    },
    rows: [
        new TableRow({
            children: [
                cell({
                    bg: C.goldWash,
                    margins: { top: 170, bottom: 170, left: 180, right: 150 },
                    borders: {
                        ...NO_BORDER,
                        left: { style: BorderStyle.SINGLE, size: 22, color: C.ink },
                        top: { style: BorderStyle.SINGLE, size: 2, color: C.hairline },
                        bottom: { style: BorderStyle.SINGLE, size: 2, color: C.hairline },
                    },
                    children: [
                        p(title.toUpperCase(), {
                            bold: true,
                            size: 17,
                            color: C.goldDeep,
                            characterSpacing: 16,
                            spacing: { after: 140, line: 260 },
                        }),
                        ...points.map((pt, index) => p(pt, {
                            spacing: { after: 110, line: 380 },
                            numbering: { reference: "bullet-accent", level: 0 },
                            color: C.body,
                            size: 18,
                            bold: index === 1,
                        }))
                    ]
                })
            ]
        })
    ]
});

/** Empty checkbox in gold with its label in navy ink. */
const checkItem = (label, opts = {}) => p("", {
    spacing: { after: opts.after ?? 110, line: 370 },
    children: [
        tr("☐  ", { bold: true, size: 20, color: C.ink }),
        tr(label, { bold: true, size: 20, color: C.ink }),
    ],
});

// ═══════════════════════════════════════════════════════════════════════════
//  DOCUMENT TITLE — "SERVICE LEVEL AGREEMENT" masthead
//
//  Five stacked paragraphs form one engraved-looking block:
//
//      ────────────────────────────────  gold hairline
//      ════════════════════════════════  navy rule
//        S E R V I C E   L E V E L …     serif, widely tracked
//      ════════════════════════════════  navy rule
//      ────────────────────────────────  gold hairline
//              subtitle in tracked italic
//
//  The serif face and the wide tracking do the work; the rules are thin so the
//  block reads as engraving rather than as a boxed banner.
// ═══════════════════════════════════════════════════════════════════════════

const documentTitleBlock = (title, subtitle) => ([
    hairlineRule({ bottom: { style: BorderStyle.SINGLE, size: 4, color: C.ink, space: 1 } }),
    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 130, after: 130 },
        border: {
            top: { style: BorderStyle.SINGLE, size: 8, color: C.ink, space: 10 },
            bottom: { style: BorderStyle.SINGLE, size: 8, color: C.ink, space: 10 },
        },
        children: [
            new TextRun({
                text: title,
                bold: true,
                size: 32,
                color: C.ink,
                font: DISPLAY_FONT,
                characterSpacing: 56,
            }),
        ],
    }),
    hairlineRule({ top: { style: BorderStyle.SINGLE, size: 4, color: C.gold, space: 1 } }),
    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 0 },
        children: [
            new TextRun({
                text: subtitle,
                italics: true,
                size: 17,
                color: C.inkMuted,
                font: FONT,
                characterSpacing: 20,
            }),
        ],
    }),
]);

// ═══════════════════════════════════════════════════════════════════════════
//  METADATA BAR — Ref. No. / Sales Representative / Sales Contact
//
//  Design: a single three-up strip closed by a navy rule above and a gold
//  hairline below, split by sand dividers.
//
//    • Ref. No.              → STATIC value. Given a gold edge, gold wash and
//                              bronze ink so the eye lands on it first; it is
//                              the document's identity.
//    • Sales Representative  → ruled blank line for hand completion
//    • Sales Contact         → ruled blank line for hand completion
//
//  The blank fields are drawn with a paragraph bottom border rather than a run
//  of underscore characters, so each line prints as one clean, evenly
//  weighted rule that always spans the full column.
//
//  All three cells now sit on near-identical warm paper (parchment vs. gold
//  wash), so the strip reads as one continuous band. The old version mixed a
//  cool grey against a saturated amber and split visually down the middle.
// ═══════════════════════════════════════════════════════════════════════════

const metadataBar = (data) => {
    const RULE_TOP = { style: BorderStyle.SINGLE, size: 8, color: C.ink };
    const RULE_BASE = { style: BorderStyle.SINGLE, size: 6, color: C.gold };
    const HAIR = { style: BorderStyle.SINGLE, size: 2, color: C.hairline };

    // Tiny, widely-tracked caps — reads as a field label, not as content.
    const metaLabel = (label, color) => new Paragraph({
        spacing: { after: 80, line: 200 },
        children: [
            new TextRun({
                text: label.toUpperCase(),
                font: FONT,
                size: 13,
                bold: true,
                color: color || C.inkMuted,
                characterSpacing: 20,
            }),
        ],
    });

    // Underlined value slot. Renders the value when one exists, otherwise an
    // empty ruled line of the same height — so filled and blank columns stay
    // perfectly aligned.
    const metaValue = (value, opts) => {
        const filled = value !== undefined && value !== null && String(value).trim() !== "";
        return new Paragraph({
            spacing: { before: 30, after: 0, line: 280 },
            border: {
                bottom: { style: BorderStyle.SINGLE, size: 6, color: opts.ruleColor || C.rule, space: 2 },
            },
            children: [
                new TextRun({
                    text: filled ? String(value) : " ",
                    font: FONT,
                    size: opts.size || 20,
                    bold: true,
                    color: opts.color || C.ink,
                    characterSpacing: opts.characterSpacing || 0,
                }),
            ],
        });
    };

    const metaCell = (label, value, opts = {}) => cell({
        width: opts.width,
        bg: opts.bg || C.panel,
        margins: { top: 140, bottom: 140, left: 170, right: 150 },
        borders: {
            top: RULE_TOP,
            bottom: RULE_BASE,
            left: opts.accent ? { style: BorderStyle.SINGLE, size: 10, color: opts.accent } : OFF,
            right: opts.last ? OFF : HAIR,
        },
        vAlign: VerticalAlign.CENTER,
        children: [
            metaLabel(label, opts.labelColor),
            metaValue(value, opts),
        ],
    });

    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        // Twips, proportional to 36 / 32 / 32 of the usable text width.
        columnWidths: [3664, 3257, 3257],
        borders: {
            top: RULE_TOP,
            bottom: RULE_BASE,
            left: OFF,
            right: OFF,
            insideHorizontal: OFF,
            insideVertical: HAIR,
        },
        rows: [
            new TableRow({
                cantSplit: true,
                children: [
                    metaCell("Ref. No.", data.refNumber, {
                        width: 36,
                        bg: C.goldWash,
                        accent: C.gold,
                        labelColor: C.goldDeep,
                        color: C.ink,
                        ruleColor: C.gold,
                        size: 21,
                        characterSpacing: 8,
                    }),
                    metaCell("Sales Representative", data.salesRep, { width: 32 }),
                    metaCell("Sales Contact", data.salesContact, { width: 32, last: true }),
                ],
            }),
        ],
    });
};

// ═══════════════════════════════════════════════════════════════════════════
//  SERVICE SELECTION CARD — "CONSULTANCY FOR CERTIFICATION"
//
//  Structure (one single Table, five rows — not four stacked tables):
//
//    Row 1  ┃ ☐ CONSULTANCY FOR CERTIFICATION      (navy banner, span 2)
//    Row 2  ┃ CERTIFICATION STANDARDS              (parchment band, span 2)
//    Row 3  ┃ ISO ____ / GMP / HACCP  │  OHS / EIA / IATF 16949...
//    Row 4  ┃ OTHER PROFESSIONAL SERVICES          (parchment band, span 2)
//    Row 5  ┃ 4 service checkboxes    │  3 service checkboxes
//
//  Collapsing this into one table is what makes the block hold together:
//  stacked tables leave hairline seams between them in Word, their outer
//  frames never line up to the pixel, and each one can break away onto a
//  different page. One table with cantSplit rows behaves as a single unit.
//
//  Theme note: the single navy banner is the only large dark fill on page one.
//  It anchors the card, and the gold trim beneath it is a 0.5pt line rather
//  than the previous amber-filled sub-banners.
// ═══════════════════════════════════════════════════════════════════════════

const serviceSelectionCard = () => {
    const FRAME = { style: BorderStyle.SINGLE, size: 6, color: C.ink };
    const TRIM = { style: BorderStyle.SINGLE, size: 4, color: C.gold };
    const INNER = { style: BorderStyle.SINGLE, size: 2, color: C.hairline };

    // Full-width band spanning both columns (banners and sub-headers).
    const bandCell = (children, { bg, top, bottom, margins }) => new TableCell({
        columnSpan: 2,
        shading: { fill: bg, type: ShadingType.CLEAR, color: "auto" },
        borders: { top, bottom, left: FRAME, right: FRAME },
        verticalAlign: VerticalAlign.CENTER,
        margins: margins || { top: 110, bottom: 110, left: 170, right: 150 },
        children,
    });

    // One half of a checkbox grid row. `side` picks which edge carries the
    // outer frame and which carries the inner divider.
    const gridCell = (children, side, bottom) => new TableCell({
        width: { size: 50, type: WidthType.PERCENTAGE },
        shading: { fill: C.white, type: ShadingType.CLEAR, color: "auto" },
        borders: {
            top: OFF,
            bottom: bottom || OFF,
            left: side === "left" ? FRAME : INNER,
            right: side === "left" ? INNER : FRAME,
        },
        verticalAlign: VerticalAlign.TOP,
        margins: { top: 160, bottom: 160, left: side === "left" ? 210 : 180, right: 150 },
        children,
    });

    const bandLabel = (text) => new Paragraph({
        spacing: { after: 0, line: 260 },
        children: [
            new TextRun({ text, bold: true, size: 16, color: C.goldDeep, font: FONT, characterSpacing: 24 }),
        ],
    });

    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [CONTENT_WIDTH / 2, CONTENT_WIDTH / 2],
        borders: {
            top: FRAME,
            bottom: FRAME,
            left: FRAME,
            right: FRAME,
            insideHorizontal: INNER,
            insideVertical: INNER,
        },
        rows: [
            // ── Row 1: primary service banner ────────────────────────────
            new TableRow({
                cantSplit: true,
                children: [
                    bandCell([
                        new Paragraph({
                            spacing: { after: 0, line: 300 },
                            children: [
                                tr("☐   ", { bold: true, size: 24, color: C.goldLight }),
                                tr("CONSULTANCY FOR CERTIFICATION", { bold: true, size: 20, color: C.white, characterSpacing: 26 }),
                            ],
                        }),
                    ], {
                        bg: C.ink,
                        top: FRAME,
                        bottom: TRIM,
                        margins: { top: 150, bottom: 150, left: 170, right: 150 },
                    }),
                ],
            }),

            // ── Row 2: standards band ────────────────────────────────────
            new TableRow({
                cantSplit: true,
                children: [
                    bandCell([bandLabel("CERTIFICATION STANDARDS")], {
                        bg: C.panel,
                        top: TRIM,
                        bottom: INNER,
                        margins: { top: 100, bottom: 100, left: 170, right: 150 },
                    }),
                ],
            }),

            // ── Row 3: standards checkbox grid ───────────────────────────
            new TableRow({
                cantSplit: true,
                children: [
                    gridCell([
                        p("", {
                            spacing: { after: 110, line: 370 },
                            children: [
                                tr("☐  ISO  ", { bold: true, size: 20, color: C.ink }),
                                // Gold, not sand: this is a line the client
                                // writes on, so it has to survive a photocopy.
                                // Sand (#C9BFA9) measures 1.8:1 on white and
                                // disappears; gold holds at 3.3:1.
                                tr("____________________", {
                                    size: 20,
                                    bold: true,
                                    color: C.ink,
                                    underline: { type: UnderlineType.SINGLE, color: C.ink },
                                }),
                            ],
                        }),
                        checkItem("GMP"),
                        checkItem("HACCP", { after: 0 }),
                    ], "left"),
                    gridCell([
                        checkItem("OHS"),
                        checkItem("EIA"),
                        checkItem("IATF 16949...", { after: 0 }),
                    ], "right"),
                ],
            }),

            // ── Row 4: other services band ───────────────────────────────
            new TableRow({
                cantSplit: true,
                children: [
                    bandCell([bandLabel("OTHER PROFESSIONAL SERVICES")], {
                        bg: C.panel,
                        top: INNER,
                        bottom: INNER,
                        margins: { top: 100, bottom: 100, left: 170, right: 150 },
                    }),
                ],
            }),

            // ── Row 5: other services checkbox grid ──────────────────────
            new TableRow({
                cantSplit: true,
                children: [
                    gridCell([
                        checkItem("Management Systems Audit"),
                        checkItem("Corporate Training"),
                        checkItem("Gap Analysis"),
                        checkItem("Second Party / Compliance Audit", { after: 0 }),
                    ], "left", FRAME),
                    gridCell([
                        checkItem("Customer Survey"),
                        checkItem("Due Diligence"),
                        checkItem("Third Party / Compliance / Certification Audit", { after: 0 }),
                    ], "right", FRAME),
                ],
            }),
        ],
    });
};

// ═══════════════════════════════════════════════════════════════════════════
//  APPROVAL / SIGNATURE SECTION
//
//  The "APPROVAL SECTION (AUTHORISED SIGNATORY ONLY)" bar is a normal first
//  row — deliberately NOT marked `tableHeader`, because a header row is what
//  Word repeats at the top of every page the table spills onto. Combined with
//  `cantSplit` on every row (no row is ever torn in half) and a hard page
//  break before the section, the bar is printed exactly once.
//
//  Theme note: the two parties are distinguished by BANNER, not by flooding
//  every field cell with colour — navy banner over parchment fields for
//  EIMCTA, gold banner over gold wash for the client. Field labels sit on the
//  faintest possible tint so a pen mark stays legible over them.
// ═══════════════════════════════════════════════════════════════════════════

function createSignatureSection(clientName = "[Client Organization Name]", clientContact = "+977-__________") {
    const partyFieldCell = (text, theme) => new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        shading: { fill: theme.fieldBg, type: ShadingType.CLEAR, color: C.ink },
        borders: CELL_BORDERS,
        margins: { top: 130, bottom: 130, left: 150, right: 110 },
        children: [
            new Paragraph({
                spacing: { after: 0, line: 300 },
                children: [new TextRun({ text: text.toUpperCase(), bold: true, color: theme.ink, size: 16, font: FONT, characterSpacing: 14 })],
            }),
        ],
    });

    const partyValueCell = (children) => new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        borders: CELL_BORDERS,
        margins: { top: 110, bottom: 110, left: 150, right: 110 },
        children,
    });

    const partyBanner = (theme) => new TableRow({
        cantSplit: true,
        children: [
            new TableCell({
                columnSpan: 2,
                shading: { fill: theme.bannerBg, type: ShadingType.CLEAR, color: "auto" },
                borders: CELL_BORDERS,
                verticalAlign: VerticalAlign.CENTER,
                margins: { top: 130, bottom: 130, left: 110, right: 110 },
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 0, line: 280 },
                        children: [new TextRun({ text: theme.title.toUpperCase(), bold: true, color: theme.bannerText, size: 17, font: FONT, characterSpacing: 20 })],
                    }),
                ],
            }),
        ],
    });

    const partyBlock = (theme, authName, authNameSub, contact, dateText, dateColor) => [
        partyBanner(theme),
        new TableRow({
            cantSplit: true,
            children: [
                partyFieldCell("Authorized Name *", theme),
                partyValueCell(authNameSub ? [
                    new Paragraph({ spacing: { after: 40, line: 300 }, children: [tr(authName, { bold: true, color: C.ink })] }),
                    new Paragraph({ spacing: { after: 0, line: 280 }, children: [tr(authNameSub, { size: 16, color: C.inkMuted, italics: true })] })
                ] : [
                    new Paragraph({ spacing: { after: 0, line: 300 }, children: [tr(authName, { bold: true, color: C.ink })] })
                ]),
            ]
        }),
        new TableRow({
            cantSplit: true,
            children: [
                partyFieldCell("Contact Number *", theme),
                partyValueCell([new Paragraph({ spacing: { after: 0, line: 300 }, children: [tr(contact)] })]),
            ]
        }),
        new TableRow({
            cantSplit: true,
            height: { value: 800, rule: HeightRule.ATLEAST },
            children: [
                partyFieldCell("Authorized Signature *", theme),
                partyValueCell([new Paragraph({ text: "" })]),
            ]
        }),
        new TableRow({
            cantSplit: true,
            children: [
                partyFieldCell("Date (DD/MM/YY) *", theme),
                partyValueCell([new Paragraph({ spacing: { after: 0, line: 300 }, children: [tr(dateText, { color: dateColor })] })]),
            ]
        }),
        new TableRow({
            cantSplit: true,
            height: { value: 1400, rule: HeightRule.ATLEAST },
            children: [
                partyFieldCell("Company Seal *", theme),
                partyValueCell([new Paragraph({ text: "" })]),
            ]
        }),
    ];

    const providerTheme = {
        title: "First Party (Service Provider - EIMCTA)",
        bannerBg: C.ink,
        bannerText: C.white,
        fieldBg: C.panel,
        fieldInk: C.ink,
    };
    // Navy ink on the gold band, NOT white. White on this gold measures only
    // 3.3:1 — under the 4.5:1 needed at 8.5pt bold, and worse than the amber
    // banner it replaced. Navy on gold gives 5.2:1 and survives photocopying.
    const clientTheme = {
        title: "Second Party (Client Organization)",
        bannerBg: C.ink,
        bannerText: C.white,
        fieldBg: C.panel,
        fieldInk: C.ink,
    };

    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        // Twips, proportional to 26 / 74 of the usable text width.
        columnWidths: [2646, 7532],
        borders: TABLE_BORDERS,
        rows: [
            // ── Section bar — printed ONCE. No `tableHeader: true` here, or
            //    Word would reprint it at the top of every continuation page.
            new TableRow({
                cantSplit: true,
                children: [
                    new TableCell({
                        columnSpan: 2,
                        shading: { fill: C.ink, type: ShadingType.CLEAR, color: "auto" },
                        borders: CELL_BORDERS,
                        verticalAlign: VerticalAlign.CENTER,
                        margins: { top: 140, bottom: 140, left: 110, right: 110 },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: { after: 0, line: 300 },
                                children: [new TextRun({ text: "APPROVAL SECTION (AUTHORISED SIGNATORY ONLY)", bold: true, color: C.white, size: 18, font: FONT, characterSpacing: 28 })],
                            }),
                        ],
                    }),
                ],
            }),
            // ── Row group 1: First Party (Service Provider - EIMCTA) — navy
            ...partyBlock(providerTheme, "Shailendra Kumar Kharel", "(Chairman & Managing Director)", "+977-9800000000 / +977-9741766637", "29 / 07 / 2026", C.body),
            // ── Row group 2: Second Party (Client Organization) — gold
            ...partyBlock(clientTheme, clientName, null, clientContact, "        /        / 2026", C.inkMuted),
        ]
    });
}

// ═══════════════════════════════════════════════════════════════════════════
//  DOCUMENT GENERATOR
// ═══════════════════════════════════════════════════════════════════════════

export async function BuildSlaDocx(dynamicClientData = null, dynamicPricingData = null) {
    const formatAmount = (num) => {
        const val = Number(num);
        if (isNaN(val)) return "NPR 0.00";
        return "NPR " + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const numberToWords = (n) => {
        if (n === 0) return 'Zero';
        const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        const convert = (num) => {
            if (num < 20) return a[num];
            if (num < 100) return b[Math.floor(num / 10)] + (num % 10 !== 0 ? '-' + a[num % 10] : '');
            if (num < 1000) return a[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + convert(num % 100) : '');
            if (num < 1000000) return convert(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 !== 0 ? ' ' + convert(num % 1000) : '');
            return convert(Math.floor(num / 1000000)) + ' Million' + (num % 1000000 !== 0 ? ' ' + convert(num % 1000000) : '');
        };

        const [integerPart, decimalPart] = Number(n).toFixed(2).split('.');
        let result = convert(parseInt(integerPart, 10));
        if (parseInt(decimalPart, 10) > 0) result += ` and ${decimalPart}/100`;
        else result += " and 00/100";
        return result + ' Only.';
    };

    const basePrice = Number(dynamicClientData?.basePrice || 1500000);
    const discountApplied = Number(dynamicClientData?.discountApplied || 0);

    const postDiscountBase = basePrice * (1 - (discountApplied / 100));
    const phase1Amount = postDiscountBase * 0.40;
    const phase2Amount = postDiscountBase * 0.35;
    const phase3Amount = postDiscountBase * 0.25;

    const subTotal = phase1Amount + phase2Amount + phase3Amount;
    const discountAmount = basePrice - subTotal;
    const totalAfterDiscount = subTotal;
    const vatAmount = totalAfterDiscount * 0.13;
    const grandTotal = totalAfterDiscount + vatAmount;

    const [logoBytes, isoOriginalBytes, watermarkBytes] = await Promise.all([
        getImageBytes(logo),
        getImageBytes(iso),
        createWatermarkBytes(watermark),
    ]);

    const companyData = {
        nameMain: "EVEREST INTERNATIONAL MANAGEMENT CONSULTANCY & TRAINING AGENCY",
        nameSub: "(EIMCTA) PVT. LTD.",
        address: "Head Office: Kageshwori Manohara-05, Kathmandu, Nepal",
        branchOffice: "Branch Office: Biratnagar Line, Itahari, Koshi Province, Nepal",
        email: "info@eimcta.com.np",
        phone: "+977-9800000000",
        registrationNo: "280667/078/079",
        vatNo: "610183126"
    };

    // Merge rather than replace: previously `dynamicClientData || { ...defaults }`
    // discarded every default the moment any dynamic data was supplied, which
    // left refNumber / date undefined. Field-by-field fallback keeps the static
    // values reliable while still honouring anything explicitly passed in.
    const dyn = dynamicClientData || {};
    const row = dynamicPricingData?.[0] || {};

    const clientData = {
        clientName: dyn.clientName || row.organizationName || "[Client Organization Name]",
        contactPerson: dyn.contactPerson || row.contactPersonName || "[Contact Person]",
        contactNo: dyn.contactNo || row.contactPersonNumber || "[Phone]",
        address: dyn.address || row.address || "[Client Address, Nepal]",
        companyRegNo: dyn.companyRegNo || row.registrationNumber || "[Reg. Number]",
        branchLocations: dyn.branchLocations || row.branchLocations || "[Branch Locations]",
        email: dyn.email || row.email || "[Email Address]",
        employees: dyn.employees || row.totalEmp_learners || "[No. of Employees]",
        scope: dyn.scope || row.scope || "[Product/Services/Operations]",

        // ── Metadata bar ────────────────────────────────────────────────
        refNumber: dyn.refNumber || STATIC_REF_NO,   // static, always printed
        salesRep: dyn.salesRep || "Ranjan kharel",                // blank ruled line
        salesContact: dyn.salesContact || "9816864389",        // blank ruled line

        date: dyn.date || "July 29, 2026",
    };

    // ── Cost table helpers ──────────────────────────────────────────────
    // Rows alternate white / warm ivory instead of white / pale blue: a tint
    // this close to the paper stripes the table for readability without
    // banding it into visible blue blocks.
    const costHeadCell = (text, align = AlignmentType.CENTER) => new TableCell({
        shading: { fill: C.ink, type: ShadingType.CLEAR, color: "auto" },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 120, bottom: 120, left: 110, right: 110 },
        children: [p(text.toUpperCase(), {
            bold: true, color: C.white, size: 16, characterSpacing: 14,
            alignment: align, spacing: { after: 0, line: 260 },
        })],
    });

    const costCell = (children, bg) => new TableCell({
        shading: { fill: bg, type: ShadingType.CLEAR, color: "auto" },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        children,
    });

    /** Right-aligned totals label spanning the five descriptive columns. */
    const totalsLabelCell = (text, bg, opts = {}) => new TableCell({
        columnSpan: 5,
        shading: { fill: bg, type: ShadingType.CLEAR, color: "auto" },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 110, bottom: 110, left: 120, right: 140 },
        children: [p(opts.caps ? text.toUpperCase() : text, {
            bold: true,
            color: opts.color || C.ink,
            size: opts.size || 19,
            characterSpacing: opts.characterSpacing || 0,
            alignment: AlignmentType.RIGHT,
            spacing: { after: 0, line: 280 },
        })],
    });

    const totalsValueCell = (text, bg, opts = {}) => new TableCell({
        shading: { fill: bg, type: ShadingType.CLEAR, color: "auto" },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 110, bottom: 110, left: 120, right: 140 },
        children: [p(text, {
            bold: opts.bold !== false,
            color: opts.color || C.ink,
            size: opts.size || 19,
            alignment: AlignmentType.RIGHT,
            spacing: { after: 0, line: 280 },
        })],
    });

    const doc = new Document({
        creator: "EIMCTA Document Engine",
        title: "Service Level Agreement (SLA) - EIMCTA",

        numbering: {
            config: [
                {
                    // Renamed from "bullet-amber" — the accent is no longer amber.
                    reference: "bullet-accent",
                    levels: [{
                        level: 0, format: LevelFormat.BULLET, text: "▪", alignment: AlignmentType.LEFT,
                        style: { paragraph: { indent: { left: 440, hanging: 250 } }, run: { color: C.gold, size: 20, font: FONT } },
                    }],
                },
                {
                    // Decimal numbering used for the Terms & Conditions clause
                    // list on the closing page.
                    reference: "numbered-clause",
                    levels: [{
                        level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
                        style: { paragraph: { indent: { left: 440, hanging: 300 } }, run: { color: C.ink, bold: true, size: 20, font: FONT } },
                    }],
                },
                {
                    // Separate reference (identical styling) for the
                    // Non-Disclosure clause list, so its numbering restarts
                    // at 1 instead of continuing on from the Terms list.
                    reference: "numbered-clause-2",
                    levels: [{
                        level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
                        style: { paragraph: { indent: { left: 440, hanging: 300 } }, run: { color: C.ink, bold: true, size: 20, font: FONT } },
                    }],
                },
            ],
        },

        styles: {
            default: {
                document: { run: { font: FONT, size: 20, color: C.body } },
            },
        },
        sections: [{
            properties: {
                page: {
                    size: { width: 11906, height: 16838 },
                    margin: { top: 720, right: 864, bottom: 864, left: 864 },
                },
            },

            headers: {
                default: new Header({
                    children: [
                        new Paragraph({
                            children: [
                                new ImageRun({
                                    type: "png",
                                    data: new Uint8Array(watermarkBytes),
                                    transformation: { width: 550, height: 550 },
                                    floating: {
                                        zIndex: 0, behindDocument: true, wrap: { type: TextWrappingType.NONE },
                                        horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, align: HorizontalPositionAlign.CENTER },
                                        verticalPosition: { relative: VerticalPositionRelativeFrom.PAGE, align: VerticalPositionAlign.CENTER },
                                    },
                                }),
                            ],
                        }),
                    ],
                }),
            },

            footers: {
                default: new Footer({
                    children: [
                        // Hairline rule closing off the page before the
                        // footnote — same weight/colour family as the gold
                        // hairline used under the masthead title block.
                        hairlineRule({ top: { style: BorderStyle.SINGLE, size: 4, color: C.rule, space: 4 } }),
                        new Table({
                            width: { size: 100, type: WidthType.PERCENTAGE },
                            borders: NO_BORDER,
                            columnWidths: [6790, 3388],
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            width: { size: 67, type: WidthType.PERCENTAGE },
                                            borders: NO_BORDER,
                                            verticalAlign: VerticalAlign.CENTER,
                                            children: [
                                                new Paragraph({
                                                    spacing: { before: 60, after: 0, line: 240 },
                                                    children: [
                                                        new TextRun({
                                                            text: "EVEREST INTERNATIONAL MANAGEMENT CONSULTANCY TRAINING & AGENCY PVT. LTD.",
                                                            font: FONT, size: 14, bold: true, color: C.inkMuted, characterSpacing: 6,
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        new TableCell({
                                            width: { size: 33, type: WidthType.PERCENTAGE },
                                            borders: NO_BORDER,
                                            verticalAlign: VerticalAlign.CENTER,
                                            children: [
                                                new Paragraph({
                                                    alignment: AlignmentType.RIGHT,
                                                    spacing: { before: 60, after: 0, line: 240 },
                                                    children: [
                                                        new TextRun({ text: `${clientData.date}`, font: FONT, size: 14, bold: true, color: C.inkMuted, characterSpacing: 6 }),
                                                        new TextRun({ text: "   |   Page ", font: FONT, size: 14, color: C.inkMuted, characterSpacing: 6 }),
                                                        new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 14, bold: true, color: C.inkMuted }),
                                                        new TextRun({ text: " of ", font: FONT, size: 14, color: C.inkMuted }),
                                                        new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 14, bold: true, color: C.inkMuted }),
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
            },

            children: [
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: NO_BORDER,
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({ borders: NO_BORDER, verticalAlign: VerticalAlign.CENTER, children: [p(`Co. Reg. No: ${companyData.registrationNo} | VAT No: ${companyData.vatNo}`, { bold: true, size: 16, color: C.inkMuted, characterSpacing: 6, spacing: { after: 0 } })] }),
                                new TableCell({ borders: NO_BORDER, verticalAlign: VerticalAlign.CENTER, children: [p(`Date: ${clientData.date}`, { alignment: AlignmentType.RIGHT, size: 16, bold: true, color: C.inkMuted, characterSpacing: 6, spacing: { after: 0 } })] })
                            ]
                        })
                    ]
                }),

                p("", {
                    children: [
                        new ImageRun({
                            type: "png", data: new Uint8Array(isoOriginalBytes), transformation: { width: 183, height: 183 },
                            floating: { zIndex: 10, behindDocument: false, wrap: { type: TextWrappingType.SQUARE }, horizontalPosition: { relative: HorizontalPositionRelativeFrom.MARGIN, align: HorizontalPositionAlign.RIGHT, offset: 9000000 }, verticalPosition: { relative: VerticalPositionRelativeFrom.PARAGRAPH, offset: 0 } },
                        }),
                    ]
                }),

                p("", { spacing: { after: 80, before: 100 }, children: [new ImageRun({ type: "png", data: new Uint8Array(logoBytes), transformation: { width: 140, height: 82 } })] }),

                p(companyData.nameMain, { bold: true, size: 24, color: C.ink, characterSpacing: 6, spacing: { before: 20, after: 20, line: 300 } }),
                p(companyData.nameSub, { size: 19, color: C.gold, bold: true, characterSpacing: 10, spacing: { after: 60 } }),
                p(companyData.address, { size: 19, color: C.inkMuted, spacing: { after: 40, line: 300 } }),
                p(companyData.branchOffice, { size: 19, color: C.inkMuted, spacing: { after: 40, line: 300 } }),
                p(`Email: ${companyData.email}  |  Contact: ${companyData.phone}`, { size: 19, color: C.inkMuted, spacing: { after: 40, line: 300 } }),

                spacer(80),

                // ── DOCUMENT TITLE ("SERVICE LEVEL AGREEMENT" masthead) ───
                ...documentTitleBlock("SERVICE LEVEL AGREEMENT", "Professional Consultancy, Certification & Compliance Services"),

                spacer(180),

                // ── TOP METADATA BLOCK (REF. NO. / SALES REPRESENTATIVE / SALES CONTACT) ──
                metadataBar(clientData),

                spacer(200),

                // ── CLIENT & SERVICE INFORMATION ─────────────────────────
                sectionHeading("Client & Operational Details"),
                spacer(100),
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    columnWidths: [CONTENT_WIDTH / 2, CONTENT_WIDTH / 2],
                    borders: TABLE_BORDERS,
                    rows: [
                        new TableRow({ cantSplit: true, children: [cell({ width: 50, bg: C.white, children: [docInfoP("Organization Name", clientData.clientName)] }), cell({ width: 50, bg: C.white, children: [docInfoP("Address", clientData.address)] })] }),
                        new TableRow({ cantSplit: true, children: [cell({ width: 50, bg: C.ivory, children: [docInfoP("Co. Registration No", clientData.companyRegNo)] }), cell({ width: 50, bg: C.ivory, children: [docInfoP("Branch Location(s)", clientData.branchLocations)] })] }),
                        new TableRow({ cantSplit: true, children: [cell({ width: 50, bg: C.white, children: [docInfoP("Contact Person", clientData.contactPerson)] }), cell({ width: 50, bg: C.white, children: [docInfoP("Phone / Email", `${clientData.contactNo} | ${clientData.email}`)] })] }),
                        new TableRow({ cantSplit: true, children: [cell({ width: 50, bg: C.ivory, children: [docInfoP("No. of Employees", clientData.employees)] }), cell({ width: 50, bg: C.ivory, children: [docInfoP("Operational Scope", clientData.scope)] })] }),
                    ],
                }),

                spacer(160),

                // ── SUBJECT: PROFESSIONAL SERVICE(S) PROPOSAL FOR ──────────
                sectionHeading("Subject: Professional Service(s) Proposal For"),
                spacer(120),

                // ═══ Service Selection Card — ONE unified table ═══════════
                serviceSelectionCard(),

                spacer(180),

                sectionHeading("Preamble & Operational Terms"),
                spacer(100),
                p("This SLA is submitted on enquiry of the client or its representative(s). After signing this SLA document, and after receiving initial payment from the second party (the client) only, the first party (the service provider) will start progressing the agreed services. Hence, the first party shall not be liable for service hampered or delayed due to illegal, incorrect, or delay in providing information to the service provider (the first party). It's considered that the attached Annexures 1 and 2, as critical parts of this SLA, are fully read, understood, and agreed by both parties before signing off these documents.", { spacing: { after: 220, line: 380 }, alignment: AlignmentType.JUSTIFIED }),

                // ── SERVICE DETAILS / COST TABLE ─────────────────────────
                sectionHeading("Service Details / Cost Table"),
                spacer(120),
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: TABLE_BORDERS,
                    rows: [
                        new TableRow({
                            tableHeader: true,
                            cantSplit: true,
                            children: [
                                costHeadCell("SN"),
                                costHeadCell("Description of Services", AlignmentType.LEFT),
                                costHeadCell("Deliverables"),
                                costHeadCell("Timeline"),
                                costHeadCell("Quality Benchmark"),
                                costHeadCell("Total Cost (NPR)", AlignmentType.RIGHT),
                            ],
                        }),

                        // Phase 1
                        new TableRow({
                            cantSplit: true,
                            children: [
                                costCell([p("1", { alignment: AlignmentType.CENTER, color: C.inkMuted, spacing: { after: 0 } })], C.white),
                                costCell([p("Phase 1: Gap Analysis, System Design & Documentation", { bold: true, color: C.ink, spacing: { after: 0, line: 360 } })], C.white),
                                costCell([p("Gap Report, QMS Manual, & SOPs", { alignment: AlignmentType.CENTER, size: 19, spacing: { after: 0, line: 360 } })], C.white),
                                costCell([p("Month 1: Weeks 1 to 4 (Baseline & Drafting)", { alignment: AlignmentType.CENTER, size: 19, spacing: { after: 0, line: 360 } })], C.white),
                                costCell([p("ISO / National Compliance Standard", { alignment: AlignmentType.CENTER, size: 19, spacing: { after: 0, line: 360 } })], C.white),
                                costCell([p(formatAmount(phase1Amount), { alignment: AlignmentType.RIGHT, color: C.ink, spacing: { after: 0 } })], C.white),
                            ],
                        }),

                        // Phase 2
                        new TableRow({
                            cantSplit: true,
                            children: [
                                costCell([p("2", { alignment: AlignmentType.CENTER, color: C.inkMuted, spacing: { after: 0 } })], C.ivory),
                                costCell([p("Phase 2: Capacity Building, Training & Rollout Support", { bold: true, color: C.ink, spacing: { after: 0, line: 360 } })], C.ivory),
                                costCell([p("Staff Training Sessions, Workshops, & Implementation", { alignment: AlignmentType.CENTER, size: 19, spacing: { after: 0, line: 360 } })], C.ivory),
                                costCell([p("Month 2: Weeks 5 to 8 (Training & Execution)", { alignment: AlignmentType.CENTER, size: 19, spacing: { after: 0, line: 360 } })], C.ivory),
                                costCell([p("KUAHA & Active Learning Models", { alignment: AlignmentType.CENTER, size: 19, spacing: { after: 0, line: 360 } })], C.ivory),
                                costCell([p(formatAmount(phase2Amount), { alignment: AlignmentType.RIGHT, color: C.ink, spacing: { after: 0 } })], C.ivory),
                            ],
                        }),

                        // Phase 3
                        new TableRow({
                            cantSplit: true,
                            children: [
                                costCell([p("3", { alignment: AlignmentType.CENTER, color: C.inkMuted, spacing: { after: 0 } })], C.white),
                                costCell([p("Phase 3: Internal Audit, Review & Certification Support", { bold: true, color: C.ink, spacing: { after: 0, line: 360 } })], C.white),
                                costCell([p("Internal Audit Report, CAP, & Certification Liaison", { alignment: AlignmentType.CENTER, size: 19, spacing: { after: 0, line: 360 } })], C.white),
                                costCell([p("Month 3: Weeks 9 to 12 (Audit & Closure)", { alignment: AlignmentType.CENTER, size: 19, spacing: { after: 0, line: 360 } })], C.white),
                                costCell([p("ISO 9001 / 21001 / OHS Standards", { alignment: AlignmentType.CENTER, size: 19, spacing: { after: 0, line: 360 } })], C.white),
                                costCell([p(formatAmount(phase3Amount), { alignment: AlignmentType.RIGHT, color: C.ink, spacing: { after: 0 } })], C.white),
                            ],
                        }),

                        // Subtotal
                        new TableRow({
                            cantSplit: true,
                            children: [
                                totalsLabelCell("Subtotal / Total Cost", C.panel, { color: C.ink, size: 17, caps: true, characterSpacing: 12 }),
                                totalsValueCell(formatAmount(subTotal), C.panel),
                            ]
                        }),

                        // Discount
                        new TableRow({
                            cantSplit: true,
                            children: [
                                totalsLabelCell(`Less: Discount ${discountApplied > 0 ? '(' + discountApplied + '%)' : ''}`, C.white, { color: C.ink, size: 17, caps: true, characterSpacing: 12 }),
                                totalsValueCell(discountApplied > 0 ? formatAmount(discountAmount) : "—", C.white, { bold: false, color: C.body }),
                            ]
                        }),

                        // Taxable Amount
                        new TableRow({
                            cantSplit: true,
                            children: [
                                totalsLabelCell("Taxable Amount", C.ivory, { color: C.ink, size: 17, caps: true, characterSpacing: 12 }),
                                totalsValueCell(formatAmount(totalAfterDiscount), C.ivory),
                            ]
                        }),

                        // VAT
                        new TableRow({
                            cantSplit: true,
                            children: [
                                totalsLabelCell("VAT 13%", C.white, { color: C.ink, size: 17, caps: true, characterSpacing: 12 }),
                                totalsValueCell(formatAmount(vatAmount), C.white, { bold: false, color: C.body }),
                            ]
                        }),

                        // ── Grand Total — the one figure that must be found
                        //    instantly. Set on ink navy with the amount in pale
                        //    gold: unmissable, and it stays unmissable in
                        //    greyscale because the contrast is tonal.
                        new TableRow({
                            cantSplit: true,
                            children: [
                                totalsLabelCell("Grand Total Investment (NPR)", C.ink, { color: C.white, size: 18, caps: true, characterSpacing: 16 }),
                                totalsValueCell(formatAmount(grandTotal), C.ink, { color: C.goldLight, size: 21 }),
                            ]
                        }),

                        // Words
                        new TableRow({
                            cantSplit: true,
                            children: [
                                new TableCell({
                                    columnSpan: 6,
                                    shading: { fill: C.goldWash, type: ShadingType.CLEAR, color: "auto" },
                                    verticalAlign: VerticalAlign.CENTER,
                                    margins: { top: 130, bottom: 130, left: 140, right: 140 },
                                    children: [
                                        new Paragraph({
                                            spacing: { after: 0, line: 360 },
                                            children: [
                                                new TextRun({ text: "Amount in Words: ", bold: true, size: 18, color: C.ink, font: FONT, characterSpacing: 8 }),
                                                new TextRun({ text: "Nepalese Rupees ", bold: true, size: 19, color: C.ink, font: FONT }),
                                                new TextRun({ text: numberToWords(grandTotal), bold: true, italics: true, size: 19, color: C.ink, font: FONT })
                                            ]
                                        })
                                    ],
                                })
                            ]
                        }),
                    ],
                }),

                // ── PAYMENT TERMS & SCHEDULE ─────────────────────────────
                spacer(200),
                sectionHeading("Payment Terms & Schedule"),
                spacer(100),
                ...PAYMENT_TERMS.map((term) => listItem(term, "bullet-accent")),
                spacer(180),

                // ── ATTACHED / INCLUDED ANNEXURES ───────────────────────
                sectionHeading("Attached / Included Annexures"),
                spacer(120),
                ...ANNEXES_DETAILS.flatMap((annex) => [
                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: {
                            ...NO_BORDER,
                            left: { style: BorderStyle.SINGLE, size:22, color: C.ink },
                            top: { style: BorderStyle.SINGLE, size: 2, color: C.hairline },
                            bottom: { style: BorderStyle.SINGLE, size: 2, color: C.hairline },
                        },
                        rows: [
                            new TableRow({
                                cantSplit: true,
                                children: [
                                    cell({
                                        bg: C.ivory,
                                        margins: { top: 140, bottom: 140, left: 160, right: 150 },
                                        children: [
                                            p(annex.title, { bold: true, size: 19, color: C.ink, characterSpacing: 6, spacing: { after: 50, line: 320 } }),
                                            p(annex.desc, { size: 18, color: C.ink, spacing: { after: 0, line: 320 } })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    spacer(90)
                ]),

                spacer(80),
                suggestionBlock("Operational Notes", NOTES),
                spacer(140),

                // ── ADDITIONAL REQUIREMENTS ──────────────────────────────
                sectionHeading("Note to the Clients: Additional Operational Considerations"),
                spacer(100),
                ...additionalCosts.map(item => listItem(item, "bullet-accent")),

                // ── SIGNATURE SECTION ────────────────────────────────────
                //  Hard page break: the approval block always begins on a
                //  clean page and fits entirely within it, so the section bar
                //  can never be reprinted as a continuation header.
                new Paragraph({ spacing: { after: 0 }, children: [new PageBreak()] }),
                sectionHeading("Authorization & Contract Sign-Off"),
                spacer(140),
                createSignatureSection(clientData.clientName, clientData.contactNo),

                // ── TERMS & CONDITIONS ────────────────────────────────────
                //  Own page, same masthead/heading/hairline system as the
                //  rest of the document — a fresh page break so the clause
                //  list always opens cleanly at its own top margin.
                new Paragraph({ spacing: { after: 0 }, children: [new PageBreak()] }),
                sectionHeading("Terms & Conditions"),
                spacer(140),
                ...TERMS_AND_CONDITIONS.map((clause) => clauseItem(clause.title, clause.text, "numbered-clause")),

                // ── NON-DISCLOSURE AND CONFIDENTIALITY TERMS ─────────────
                spacer(200),
                sectionHeading("Non-Disclosure and Confidentiality Terms"),
                spacer(140),
                ...NDA_TERMS.map((clause) => clauseItem(clause.title, clause.text, "numbered-clause-2")),

                p("")
            ],
        }],
    });

    return await Packer.toBlob(doc);
}