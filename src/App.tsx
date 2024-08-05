import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
function App() {
  return (
    <div>
      <h1 className="text-red-600 text-5xl">Hello world!</h1>
      <FontAwesomeIcon icon={faHouse} />
    </div>
  );
}

export default App;
