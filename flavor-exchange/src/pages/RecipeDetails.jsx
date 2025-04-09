import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, Button, Stack, Chip } from "@mui/material";
import { useRecipeStore } from "../context/recipeStore";
import { useAuthStore } from "../context/authStore";
import { useEffect, useState } from "react";
import TimerModal from "../components/TimerModal";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import mockRecipes from "../data/mockRecipes"; 
import "./RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { deleteRecipe, toggleFavorite, isFavorite } = useRecipeStore();

  const [recipe, setRecipe] = useState(null);
  const [showTimer, setShowTimer] = useState(false);
  
  useEffect(() => {
    const found = mockRecipes.find((r) => r.id === Number(id)); // Convert id to a number for comparison
    if (found) setRecipe(found);
  }, [id]);

  if (!recipe) {
    return <Typography align="center" mt={4}>Recipe not found.</Typography>;
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(id);
      navigate("/");
    }
  };

  const isOwner = user?.username === recipe.author;

  const recipeUrl = `https://your-website.com/recipe/${recipe.id}`;

  return (
    <Box maxWidth="800px" mx="auto" mt={4} p={2}>
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "10px" }}
      />
      <Typography variant="h4" mt={2}>{recipe.title}</Typography>
      <Typography color="text.secondary">By {recipe.author}</Typography>
      <Stack direction="row" spacing={2} mt={2}>
        <Chip label={`Cooking Time: ${recipe.cookingTime} min`} />
        <Chip label={`Rating: ${recipe.rating}/5`} />
      </Stack>

      <Box mt={4}>
        <Typography variant="h6">Ingredients:</Typography>
        <ul>
         {recipe.ingredients.map((item, idx) => (
           <li key={idx}>
             {item}{" "}
             {recipe.substitutions && recipe.substitutions[item] && (
               <span style={{ fontSize: "0.9rem", color: "gray" }}>
                  (Substitute: {recipe.substitutions[item]})
               </span>
           )}
         </li>
       ))}
     </ul>
   </Box>

      <Box mt={2}>
        <Typography variant="h6">Instructions:</Typography>
        <Typography>{recipe.instructions}</Typography>
      </Box>

      <Stack direction="row" spacing={2} mt={4}>
        <Button
          variant={isFavorite(id) ? "contained" : "outlined"}
          color="secondary"
          onClick={() => toggleFavorite(id)}
        >
          {isFavorite(id) ? "Unsave" : "Save to Favorites"}
        </Button>

        {isOwner && (
          <>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/edit/${id}`)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        )}

        {/* ⏲️ Start Timer Button */}
        <Button
          variant="outlined"
          color="success"
          onClick={() => setShowTimer(true)}
        >
          Start Timer
        </Button>
      </Stack>

      {/* ⏳ Timer Modal */}
      <TimerModal
        open={showTimer}
        handleClose={() => setShowTimer(false)}
        minutes={recipe.cookingTime}
      />

      <Box mt={4}>
        <Typography variant="h6">Share this recipe:</Typography>
        <Box>
          <FacebookShareButton url={recipeUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={recipeUrl}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton url={recipeUrl}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </Box>
      </Box>
    </Box>
  );
};

export default RecipeDetails;
