import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/authentication/login";
import Register from "../pages/authentication/register";
import Dashboard from "../pages/dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
