import "./App.css";
import { SwipToryContextProvider } from "./contexts/SwipToryContext";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <SwipToryContextProvider>
        <Home />
      </SwipToryContextProvider>
    </>
  );
}

export default App;
