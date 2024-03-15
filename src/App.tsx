import "./App.css";
import ButtonAppBar from "./components/navBar";
import { TodoPage } from "./pages/todoPage";

const App = () => {
  return (
    <div className="App">
      <ButtonAppBar />
      <TodoPage />
    </div>
  );
};

export default App;
