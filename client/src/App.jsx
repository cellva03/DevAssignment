import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import UpdateUser from "./pages/Dashboard/UpdateUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/login" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/:id" element={<UpdateUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
