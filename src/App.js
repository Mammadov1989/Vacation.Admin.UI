import logo from "./logo.svg";
import "./App.css";
import DepartMent from "./components/department";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";
import Department from "./components/department";
import Navbar from "./Navbar";
import Position from "./components/position";
import VacationRequest from "./components/vacationRequest";
import Login from "./components/login";
import cookie from "js-cookie";
function App() {
  let userId = cookie.get("userId");

  return (
    <BrowserRouter>
      {userId ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/department" element={<Department />} />
            <Route path="/position" element={<Position />} />
            <Route path="/vacationRequest" element={<VacationRequest />} />
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
}

export default App;
