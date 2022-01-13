import "./App.css";
import Main from "./components";
import { CardsContextProvider } from "./context";

function App() {
  return (
    <CardsContextProvider>
      <div className="App">
        <Main />
      </div>
    </CardsContextProvider>
  );
}

export default App;
