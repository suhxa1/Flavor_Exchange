// src/context/recipeStore.js
import { create } from "zustand";
import mockRecipes from "../data/mockRecipes"; // renamed to avoid conflict

const saveRecipes = (recipes) => {
  localStorage.setItem("recipes", JSON.stringify(recipes));
};

const useRecipeStore = create((set, get) => ({
  recipes: JSON.parse(localStorage.getItem("recipes")) || mockRecipes,
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  filter: {
    vegan: false,
    glutenFree: false,
  },
  setFilter: (newFilter) => set({ filter: newFilter }),

  filteredRecipes: () => {
    const { vegan, glutenFree } = get().filter;
    return get().recipes.filter((recipe) => {
      if (vegan && !recipe.tags.includes("vegan")) return false;
      if (glutenFree && !recipe.tags.includes("gluten-free")) return false;
      return true;
    });
  },

  addRecipe: (newRecipe) =>
    set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe];
      saveRecipes(updatedRecipes); // ✅ persist to localStorage
      return { recipes: updatedRecipes };
    }),

  updateRecipe: (id, updated) =>
    set((state) => {
      const updatedRecipes = state.recipes.map((r) =>
        r.id === id ? updated : r
      );
      saveRecipes(updatedRecipes); // ✅ persist updates
      return { recipes: updatedRecipes };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter((r) => r.id !== id);
      saveRecipes(updatedRecipes); // ✅ persist after deletion
      return { recipes: updatedRecipes };
    }),

    toggleFavorite: (id) => {
      const updatedFavorites = get().favorites.includes(id)
        ? get().favorites.filter((favId) => favId !== id)
        : [...get().favorites, id];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      set({ favorites: updatedFavorites });
    },

  isFavorite: (id) => get().favorites.includes(id),
}));

export { useRecipeStore };
