import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import Routing from "./components/routes/Routing";

function App() {
  return (
    <div data-theme="forest" className=" w-full h-screen">
      <Navbar />
      <Routing />
    </div>
  );
}

export default App;
