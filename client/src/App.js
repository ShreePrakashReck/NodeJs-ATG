import "./App.css";
import { Route, Routes } from "react-router-dom";

import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ForgotPassword from "./components/ForgetPassword";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
