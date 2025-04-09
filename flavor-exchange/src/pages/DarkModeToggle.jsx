import { useThemeContext } from "../context/ThemeContext";

const DarkModeToggle = () => {
  const { mode, toggleTheme } = useThemeContext();
  return (
    <button onClick={toggleTheme}>
      Switch to {mode === "light" ? "dark" : "light"} mode
    </button>
  );
};

export default DarkModeToggle;
