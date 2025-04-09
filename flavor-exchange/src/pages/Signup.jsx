import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useAuthStore } from "../context/authStore";
import { useNavigate, Link } from "react-router-dom";
import "../styles/AuthForm.css";

const Signup = () => {
  const { signup } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const signedUp = signup(form.email, form.password);
    if (signedUp) {
      navigate("/login");  // Redirect to login page after successful signup
    } else {
      console.log("Signup failed, email might already exist.");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
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
          Sign Up
        </Button>
      </form>
      <div className="auth-link">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};

export default Signup;
