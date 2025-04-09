// src/pages/Favorites.jsx
import { Box, Typography, Grid, Card, CardContent, CardMedia, CardActionArea } from "@mui/material";
import { useRecipeStore } from "../context/recipeStore";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { recipes, favorites } = useRecipeStore();

  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Recipes
      </Typography>
      {favoriteRecipes.length === 0 ? (
        <Typography>No favorites yet. Start saving some delicious recipes!</Typography>
      ) : (
        <Grid container spacing={3}>
          {favoriteRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card>
                <CardActionArea component={Link} to={`/recipe/${recipe.id}`}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={recipe.image}
                    alt={recipe.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{recipe.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {recipe.cookingTime} min | {recipe.rating}★
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
