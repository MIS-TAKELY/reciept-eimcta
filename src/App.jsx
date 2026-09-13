import "./App.css";
import Recipt from "./components/recipt";
import { quoteTemplate } from "./content/quoteData";

function App() {
  return (
    <div>
      {/* Quote content is injected as a prop — swap in any data object. */}
      <Recipt data={quoteTemplate} />
      {/* <Receipt/> */}
    </div>
  );
}

export default App;
