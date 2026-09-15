import "./App.css";
import Receipt from "./components/pdf";
import Recipt from "./components/recipt";
import { quoteTemplate } from "./content/quoteData";

function App() {
  return (
    <div>
      <Recipt data={quoteTemplate} />

      <Receipt data={quoteTemplate} />
    </div>
  );
}

export default App;
