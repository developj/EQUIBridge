import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* protected routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/opportunities" element={<Dashboard />} />

      <Route path="/Resources" element={<Dashboard />} />
      
    </Routes>
  );
}

export default App;
