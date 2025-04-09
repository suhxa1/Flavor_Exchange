// Sample mock data for recipes
import spaghetti from "../assets/recipes/SpaghettiCarbonara.jpg";
import buddhaBowl from "../assets/recipes/VeganBuddhaBowl.jpg";
import tikkaMasala from "../assets/recipes/ChickenTikkaMasala.jpg";
import avocadoToast from "../assets/recipes/AvocadoToast.jpg";
import pancakes from "../assets/recipes/ClassicPancakes.jpg";
import beefStirFry from "../assets/recipes/BeefStirFry.jpg";
import greekSalad from "../assets/recipes/GreekSalad.jpg";
import mangoSmoothie from "../assets/recipes/MangoSmoothie.jpg";
import greenJuice from "../assets/recipes/GreenDetoxJuice.jpg";


const mockRecipes = [
    // 🍛 Main Course
    {
      id: 1,
      title: "Spaghetti Carbonara",
      category: "Main Course",
      tags: ["italian", "quick", "gluten-free"],
      ingredients: ["spaghetti", "eggs", "cheese", "bacon"],
      instructions: "Boil spaghetti. Cook bacon. Mix all together with eggs and cheese.",
      image: spaghetti,
      author: "Chef John",
      cookingTime: 20,
      rating: 4.5,
    },
    {
      id: 2,
      title: "Vegan Buddha Bowl",
      category: "Main Course",
      tags: ["vegan", "gluten-free", "healthy"],
      ingredients: ["quinoa", "chickpeas", "avocado", "veggies"],
      instructions: "Assemble all ingredients in a bowl. Drizzle with tahini.",
      image: buddhaBowl,
      author: "Chef Jane",
      cookingTime: 15,
      rating: 4.0,
    },
    {
      id: 3,
      title: "Chicken Tikka Masala",
      category: "Main Course",
      tags: ["indian", "spicy", "dinner"],
      ingredients: ["chicken", "yogurt", "tomato sauce", "spices"],
      instructions: "Marinate chicken. Cook in sauce until thick and creamy.",
      image: tikkaMasala,
      author: "Chef Arjun",
      cookingTime: 40,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Beef Stir Fry",
      category: "Main Course",
      tags: ["asian", "high-protein", "dinner"],
      ingredients: ["beef", "soy sauce", "veggies", "garlic", "ginger"],
      instructions: "Sauté beef and veggies in sauce. Serve with rice.",
      image: beefStirFry,
      author: "Chef Lee",
      cookingTime: 25,
      rating: 4.6,
    },
  
    // 🍳 Breakfast
    {
      id: 5,
      title: "Avocado Toast",
      category: "Breakfast",
      tags: ["breakfast", "quick", "vegetarian"],
      ingredients: ["bread", "avocado", "salt", "pepper", "lemon"],
      instructions: "Toast bread. Mash avocado with lemon and seasoning. Spread and serve.",
      image: avocadoToast,
      author: "Chef Mia",
      cookingTime: 10,
      rating: 4.2,
    },
    {
      id: 6,
      title: "Classic Pancakes",
      category: "Breakfast",
      tags: ["breakfast", "sweet", "kids-friendly"],
      ingredients: ["flour", "milk", "eggs", "sugar", "baking powder"],
      instructions: "Mix ingredients. Cook on griddle until golden.",
      image: pancakes,
      author: "Chef Emma",
      cookingTime: 15,
      rating: 4.8,
    },
  
    // 🥗 Salads
    {
      id: 7,
      title: "Greek Salad",
      category: "Salad",
      tags: ["salad", "healthy", "mediterranean"],
      ingredients: ["cucumber", "tomatoes", "feta", "olives", "olive oil"],
      instructions: "Chop ingredients and toss with olive oil and seasoning.",
      image: greekSalad,
      author: "Chef Nikos",
      cookingTime: 10,
      rating: 4.3,
    },
  
    // 🥤 Beverages
    {
      id: 8,
      title: "Mango Smoothie",
      category: "Beverages",
      tags: ["juice", "refreshing", "summer"],
      ingredients: ["mango", "yogurt", "milk", "honey"],
      instructions: "Blend all ingredients until smooth. Serve chilled.",
      image: mangoSmoothie,
      author: "Chef Priya",
      cookingTime: 5,
      rating: 4.9,
    },
    {
      id: 9,
      title: "Green Detox Juice",
      category: "Beverages",
      tags: ["juice", "healthy", "green"],
      ingredients: ["spinach", "apple", "lemon", "cucumber", "ginger"],
      instructions: "Juice all ingredients and enjoy fresh.",
      image: greenJuice,
      author: "Chef Zoe",
      cookingTime: 7,
      rating: 4.6,
    },
  
  
];

// Save recipes to localStorage (or you can use another saving method)
export const saveRecipes = (recipes) => {
  localStorage.setItem("mockRecipes", JSON.stringify(recipes));
};

// Default export of the mockRecipes array
export default mockRecipes;
