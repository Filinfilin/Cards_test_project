import style from "./app.module.scss";
import Main from "./components/main";
import { CardsContextProvider } from "./context";

function App() {
  return (
    <CardsContextProvider>
      <div className={style.app}>
        <Main />
      </div>
    </CardsContextProvider>
  );
}

export default App;
