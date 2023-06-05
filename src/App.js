import logo from "./logo.svg";
import "./App.css";
import DepartMent from "./components/department";

function App() {
  console.log("url", window.location.href);
  function goDepart() {
    <DepartMent />;
  }

  return (
    <nav>
      <ul>
        <li onClick={goDepart()}>Department</li>
        <li>Position</li>
        <li>VacationRequest</li>
        <li>Department</li>
      </ul>
    </nav>
  );
}

export default App;
