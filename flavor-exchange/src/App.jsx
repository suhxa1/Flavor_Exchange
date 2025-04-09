// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import AddEditRecipe from "./pages/AddEditRecipe";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecipeFeed from "./pages/RecipeFeed";
import Favorites from "./pages/Favorites";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/add" element={<AddEditRecipe />} />
        <Route path="/edit/:id" element={<AddEditRecipe />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipes" element={<RecipeFeed />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Optional Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
