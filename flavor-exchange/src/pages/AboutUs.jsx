// src/pages/AboutUs.jsx
import "./AboutContact.css";
import { Typography, Container } from "@mui/material";

const AboutUs = () => {
  return (
    <Container className="about-contact-container">
      <Typography variant="h3" className="about-heading">
        About Flavor Exchange
      </Typography>
      <Typography variant="body1" className="about-text">
        Flavor Exchange is a vibrant recipe-sharing platform built to connect food lovers, home cooks,
        and creative chefs from all around the world. ✨🍽️
      </Typography>
      <Typography variant="body1" className="about-text">
        Whether you're here to share your grandma’s secret curry, discover vegan delights,
        or find easy 15-minute dinner ideas, Flavor Exchange is your kitchen companion!
      </Typography>
      <Typography variant="body1" className="about-text">
        Created with ❤️ by a passionate front-end developer (that’s YOU!), this platform
        blends taste and technology using modern tools like React, Zustand, and Material UI.
      </Typography>
    </Container>
  );
};

export default AboutUs;
