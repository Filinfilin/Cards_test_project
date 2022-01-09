import "./App.css";
import { Main } from "./components";
import { CardContextProvider } from "./context";

function App() {
  return (
    <CardContextProvider>
      <div className="App">
        <Main />
      </div>
    </CardContextProvider>
  );
}

export default App;
