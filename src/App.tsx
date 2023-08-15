import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Interview from "./pages/Interview";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview" element={<Interview />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
