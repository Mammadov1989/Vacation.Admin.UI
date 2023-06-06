import logo from "./logo.svg";
import "./App.css";
import DepartMent from "./components/department";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Department from "./components/department";
import Navbar from "./Navbar";
import position from "./components/position";
import Position from "./components/position";
import VacationRequest from "./components/vacationRequest";
// import { useRoutes } from "hookrouter";
function App() {
  let { id } = useParams();
  console.log("soso", id);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/department" element={<Department />} />
        <Route path="/position" element={<Position />} />
        <Route path="/vacationRequest" element={<VacationRequest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
