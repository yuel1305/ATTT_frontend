import "./App.css";
import Homepage from "./Components/Homepage/Homepage";
import Login from "./Components/Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Register from "./Components/Register/Register";
import HomepageAfterLogin from "./Components/HomePageAfterLogin/HomePageAfterLogin";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/Homepage" element={<HomepageAfterLogin />} />

            <Route path="/signup" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
