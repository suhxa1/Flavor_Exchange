// src/pages/ContactUs.jsx
import "./AboutContact.css";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted form:", form);
    alert("Thanks for contacting us! 🌟");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Container className="about-contact-container">
      <Typography variant="h3" className="about-heading">
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit} className="contact-form">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <Button type="submit" variant="contained" className="submit-button">
          Send Message
        </Button>
      </form>
    </Container>
  );
};

export default ContactUs;
