// src/pages/AddEditRecipe.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Typography, Box, Stack } from "@mui/material";
import { useRecipeStore } from "../context/recipeStore";
import { useAuthStore } from "../context/authStore";
import "./AddEditRecipe.css";

const AddEditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { recipes, addRecipe, updateRecipe } = useRecipeStore();

  const editing = Boolean(id);
  const existingRecipe = recipes.find((r) => r.id === id);

  const [form, setForm] = useState({
    title: "",
    cookingTime: "",
    rating: "",
    image: "",
    ingredients: "",
    instructions: "",
    author: user?.username || "",
  });

  useEffect(() => {
    if (editing && existingRecipe) {
      setForm({
        ...existingRecipe,
        ingredients: existingRecipe.ingredients.join(", "), // Convert ingredients back to a comma-separated string
      });
    }
  }, [editing, existingRecipe]);

  if (!user) {
    return <Typography variant="h6" mt={4} align="center">Please login to {editing ? "edit" : "add"} a recipe.</Typography>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      ...form,
      ingredients: form.ingredients.split(",").map((i) => i.trim()), // Convert ingredients string to array
      id: editing ? form.id : Date.now().toString(),
    };

    if (editing) {
      updateRecipe(id, newRecipe); // Update existing recipe
    } else {
      addRecipe(newRecipe); // Add new recipe
    }

    navigate("/"); // Navigate back to Home page after submit
  };

  return (
    <Box maxWidth="600px" mx="auto" mt={6}>
      <Typography variant="h5" mb={2}>
        {editing ? "Edit Recipe" : "Add New Recipe"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <TextField
            label="Cooking Time (in mins)"
            name="cookingTime"
            type="number"
            value={form.cookingTime}
            onChange={handleChange}
            required
          />
          <TextField
            label="Rating (1-5)"
            name="rating"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            value={form.rating}
            onChange={handleChange}
            required
          />
          <TextField
            label="Image URL"
            name="image"
            value={form.image}
            onChange={handleChange}
            required
          />
          <TextField
            label="Ingredients (comma separated)"
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            required
          />
          <TextField
            label="Instructions"
            name="instructions"
            multiline
            rows={4}
            value={form.instructions}
            onChange={handleChange}
            required
          />
          <Button variant="contained" type="submit">
            {editing ? "Update Recipe" : "Add Recipe"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddEditRecipe;
