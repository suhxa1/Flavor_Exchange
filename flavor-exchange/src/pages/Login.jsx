import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useAuthStore } from "../context/authStore";
import { useNavigate, Link } from "react-router-dom";
import "../styles/AuthForm.css";

const Login = () => {
  const { login } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedIn = login(form.email, form.password);
    if (loggedIn) {
      console.log("User logged in: ", JSON.parse(localStorage.getItem("user")));
      navigate("/");  // Navigate after successful login
    } else {
      console.log("Login failed!");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button type="submit" variant="contained" className="auth-button">
          Login
        </Button>
      </form>
      <div className="auth-link">
        Don’t have an account? <Link to="/signup">Sign up here</Link>
      </div>
    </div>
  );
};

export default Login;
