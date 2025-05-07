import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreateProfile from "./pages/Createprofile/CreateProfile";
import Opportunity from "./pages/opportunity/Opportunity";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* protected routes */}
      <Route path="/createprofile" element={<CreateProfile />} />
      <Route path="/opportunities" element={<Opportunity />} />
    </Routes>
  );
}

export default App;
