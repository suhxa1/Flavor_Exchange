import { Box, Card, CardMedia, CardContent, Typography, Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { useRecipeStore } from "../context/recipeStore";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  console.log(recipe);
  const recipeUrl = `https://your-website.com/recipe/${recipe.id}`;
  const { toggleFavorite, favorites } = useRecipeStore();
  const isFav = favorites.includes(recipe.id);

  return (
    <Card className="recipe-card">
      <CardMedia
        component="img"
        className="recipe-card-image"
        image={recipe.image}
        alt={recipe.title}
      />
      <CardContent className="recipe-card-content">
        <Typography variant="h6" className="recipe-title">{recipe.title}</Typography>
        <Typography variant="body2" className="recipe-time">⏱ {recipe.cookingTime} mins</Typography>
        <Typography variant="body2" className="recipe-rating">⭐ {recipe.rating}/5</Typography>

        {/* Tags */}
        {recipe.tags && (
          <Box className="recipe-tags">
            {recipe.tags.map((tag, idx) => (
              <Chip key={idx} label={tag} className="tag-chip" />
            ))}
          </Box>
        )}

        {/* Share Buttons */}
        <Box className="share-buttons">
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

        {/* Favorite Button */}
        <Button className="favorite-button" onClick={() => toggleFavorite(recipe.id)}>
          {isFav ? "★ Saved" : "☆ Save"}
        </Button>

        {/* View Details Link */}
        <Box className="view-details-link">
          <Link to={`/recipe/${recipe.id}`} className="view-details-text">View Details</Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
