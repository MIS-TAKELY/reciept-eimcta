import "./App.css";
import Receipt from "./components/pdf";
import ReceiptV2 from "./components/pdfV2";
import Recipt from "./components/recipt";
import { quoteTemplate } from "./content/quoteData";

function App() {
  return (
    <div style={{ display: "flex", gap: "14px", justifyContent: "center", padding: "30px", flexWrap: "wrap" }}>
      <Recipt data={quoteTemplate} />

      <Receipt data={quoteTemplate} />

      <ReceiptV2 data={quoteTemplate} />
    </div>
  );
}

export default App;
