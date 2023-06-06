import React from "react";
import { Link } from "react-router-dom";
import Department from "./components/department";
export default function Navbar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
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
