// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { TextField, Button, Avatar } from "@mui/material";
import { useAuthStore } from "../context/authStore";
import "./Profile.css";

const Profile = () => {
  const { user, updateUser } = useAuthStore(); // Add updateUser to your store
  const [form, setForm] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setForm((prev) => ({ ...prev, profilePic: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateUser(form); // Save to localStorage and store
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-content">
        <Avatar src={form.profilePic} alt="Profile" sx={{ width: 100, height: 100 }} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <TextField label="Name" name="name" value={form.name || ""} onChange={handleChange} fullWidth />
        <TextField label="Email" name="email" value={form.email || ""} disabled fullWidth />
        <TextField label="Bio" name="bio" value={form.bio || ""} onChange={handleChange} fullWidth multiline rows={2} />
        <Button variant="contained" onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default Profile;
