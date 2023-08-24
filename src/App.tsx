import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Interviews from "./pages/Interviews";
import Interview from "./pages/Interview";
import { Login, Signup } from "./pages/SignupLogin";
import Students from "./pages/Students";
import Student from "./pages/Student";
import Approve from "./pages/Approve";
import Results from "./pages/Results";
import { getFromLocalStorage } from "./utils/getFromLocalStorage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interviews/:id" element={<Interview />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/students" element={<Students />} />
        <Route path="/login" element={<Login />} />
        <Route path="/interviews" element={<Interviews />} />
        <Route path="/students/:id" element={<Student />} />
        <Route path="/approve" element={<Approve />} />
        <Route path="/result" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
