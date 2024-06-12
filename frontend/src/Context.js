import React, {
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

const Context = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const theme = isDarkMode === true ? "dark" : "light";

  const toggleTheme = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default Context;
