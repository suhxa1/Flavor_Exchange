import { AppBar,Toolbar,Typography,Button,IconButton,Tooltip,Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useAuthStore } from "../context/authStore";
import { useThemeContext } from "../context/ThemeContext";
import { useEffect } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeContext();

  useEffect(() => {
    console.log("User state in Navbar:", user);
  }, [user]);

  const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);

const handleProfileClick = (e) => setAnchorEl(e.currentTarget);
const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static" className="appbar"
    sx={{
      background: "linear-gradient(90deg,rgb(115, 157, 117),rgb(99, 148, 77))", // Green gradient
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      borderBottom: "3px solidrgb(12, 23, 13)", // Green border
    }}>
      <Toolbar className="toolbar">
        {/* Left - Logo */}
        <Typography className="logo" >
          Flavor Exchange
        </Typography>

        {/* Center - Navigation links */}
        <Box className="nav-links">
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
          AboutUs
          </Button>
          <Button color="inherit" component={Link} to="/contact">
          ContactUs
          </Button>
          {user && user.email && (
            <>
              <Button color="inherit" component={Link} to="/add">
                Add Recipe
              </Button>
              <Button color="inherit" component={Link} to="/favorites">
                Favorites
              </Button>
            </>
          )}
        </Box>

        {/* Right - Auth buttons / Theme Toggle / Profile */}
        <Box className="right-section">
          <Tooltip title="Toggle theme">
            <IconButton color="inherit" onClick={toggleTheme}>
              {mode === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Tooltip>

          {user && user.email ? (
            <>
              <Tooltip title="Profile">
              <IconButton onClick={handleProfileClick}>
  <Avatar src={user.profilePic || ""} alt={user.name || "Profile"} />
</IconButton>

<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
  <MenuItem onClick={() => { handleClose(); navigate("/profile"); }}>
    Edit Profile
  </MenuItem>
  <MenuItem onClick={() => { handleClose(); handleLogout(); }}>
    Logout
  </MenuItem>
</Menu>

              </Tooltip>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
