import { Packer } from "docx";
import { FILE_NAMES, quoteTemplate } from "../../content/quoteData.js";
import { loadLogo, loadWatermark } from "./assets.js";
import { buildReceiptDocument } from "./buildDocument.js";

export default function Receipt({ data = quoteTemplate }) {
  const generateReceipt = async () => {
    const logoData = await loadLogo();
    const watermarkData = await loadWatermark();

    const doc = buildReceiptDocument({ logoData, watermarkData, data });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = FILE_NAMES.docx;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={generateReceipt}>Generate Quotation in docx</button>
    </div>
  );
}
