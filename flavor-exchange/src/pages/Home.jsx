// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { useRecipeStore } from "../context/recipeStore";
import RecipeCard from "../components/RecipeCard";
import mockRecipes from "../data/mockRecipes"; // Adjust if needed
import './Home.css'; // Import the CSS file

const Home = () => {
  const { recipes, setRecipes } = useRecipeStore(); // Assuming setRecipes is available to update the store
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    category: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("recipes");
    if (stored) {
      setRecipes(JSON.parse(stored)); // Initialize with stored recipes
    } else {
      localStorage.setItem("recipes", JSON.stringify(mockRecipes));
      setRecipes(mockRecipes); // Fallback to mock data
    }
  }, [setRecipes]);

  const filteredRecipes = recipes?.filter((r) => {
    const matchesQuery =
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(query.toLowerCase())
      );

    const matchesCategory = selectedCategory
      ? r.category === selectedCategory
      : true;

    return matchesQuery && matchesCategory;
  });

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddRecipe = (e) => {
    e.preventDefault();

    const newRecipeData = {
      id: new Date().getTime(), // Generate a unique ID using timestamp
      ...newRecipe,
      ingredients: newRecipe.ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()), // Handle ingredients as array
    };

    const updatedRecipes = [...recipes, newRecipeData]; // Add new recipe to state

    setRecipes(updatedRecipes); // Update global state

    localStorage.setItem("recipes", JSON.stringify(updatedRecipes)); // Save to localStorage

    // Reset form fields after adding the recipe
    setNewRecipe({
      title: "",
      ingredients: "",
      category: "",
    });
    setSelectedCategory(""); // Reset category after submission
  };

  return (
    <div className="container">
      {/* Category Filter Dropdown */}
      <select
        onChange={handleCategoryChange}
        value={selectedCategory}
        className="select"
      >
        <option value="">All Categories</option>
        <option value="Main Course">Main Course</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Salad">Salad</option>
        <option value="Beverages">Beverages</option>
      </select>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by title or ingredients..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input"
      />

      {/* Add Recipe Form */}
      <form onSubmit={handleAddRecipe} className="form">
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={newRecipe.title}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={newRecipe.ingredients}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <select
          name="category"
          value={newRecipe.category}
          onChange={handleInputChange}
          required
          className="select-field"
        >
          <option value="">Select Category</option>
          <option value="Main Course">Main Course</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Salad">Salad</option>
          <option value="Beverages">Beverages</option>
        </select>
        <button type="submit" className="submit-button">Add Recipe</button>
      </form>

      {/* Recipe Display */}
      <div className="grid">
        {filteredRecipes?.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p className="no-recipes">No recipes found for this category or query.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
