import { Checkbox, FormControlLabel, Box, Typography, Stack, Grid } from "@mui/material";
import { useRecipeStore } from "../context/recipeStore";
import RecipeCard from "../components/RecipeCard"; // Assuming RecipeCard is in components folder

const RecipeFeed = () => {
  const { recipes, setFilter, filter } = useRecipeStore();
  
  // Filter the recipes based on the filter state
  const filteredRecipes = recipes.filter((recipe) => {
    if (filter.vegan && !recipe.tags.includes("vegan")) return false;
    if (filter.glutenFree && !recipe.tags.includes("gluten-free")) return false;
    return true;
  });

  const handleFilterChange = (event) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Recipe Feed
      </Typography>
      <Stack direction="row" spacing={2} mb={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={filter.vegan}
              onChange={handleFilterChange}
              name="vegan"
            />
          }
          label="Vegan"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filter.glutenFree}
              onChange={handleFilterChange}
              name="glutenFree"
            />
          }
          label="Gluten-Free"
        />
      </Stack>

      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <RecipeCard recipe={recipe} /> {/* Assuming RecipeCard is a component */}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecipeFeed;
