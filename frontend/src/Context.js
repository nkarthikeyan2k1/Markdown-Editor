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
  console.log(isDarkMode, "dd");
  console.log(typeof isDarkMode, "dd");
  const theme = useRef(isDarkMode === true ? "dark" : "light");

  const toggleTheme = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  useEffect(() => {
    theme.current = isDarkMode === true ? "dark" : "light";
    console.log(theme.current);
    // const theme = document.documentElement.getAttribute("data-theme");
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    document.documentElement.setAttribute(
      "data-theme",
      theme.current
      // localStorage.getItem("darkMode") === "true" ? "dark" : "light"
    );
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default Context;
