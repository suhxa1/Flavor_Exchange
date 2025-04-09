import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,  // Initialize user from localStorage

  login: (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const found = storedUsers.find((u) => u.email === email && u.password === password);

    if (found) {
      localStorage.setItem("user", JSON.stringify(found)); // Store user in localStorage
      set({ user: found }); // Update Zustand store with logged-in user's data
      return true;
    }

    return false;
  },

  signup: (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (storedUsers.find((u) => u.email === email)) return false; // Prevent signing up with existing email

    const newUser = { email, password, saved: [] };
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save updated users to localStorage
    localStorage.setItem("user", JSON.stringify(newUser)); // Store the new user
    set({ user: newUser });
    return true;
  },

  updateUser: (updatedUser) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },
  

  logout: () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    set({ user: null }); // Reset Zustand user state
  },
}));
