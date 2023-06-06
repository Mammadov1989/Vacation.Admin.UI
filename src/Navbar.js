import React from "react";
import { Link } from "react-router-dom";
import Department from "./components/department";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  const getLogin = () => {
    navigate("/");

    cookie.remove("userId");
    // window.location.href("https://localhost:3000");
    window.location.reload(false);
  };
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={getLogin}>
              LogOut
            </Link>
          </li>
          <li>
            <Link to="/department">Department</Link>
          </li>
          <li>
            <Link to="/position">Position</Link>
          </li>
          <li>
            <Link to="/vacationRequest">VacationRequest</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
