import Header from "./Header";
import HomePage from "./HomePage";
import { useState, useEffect } from "react";
function Main() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);
  return (
    <div>
      <Header setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <HomePage isDarkMode={isDarkMode} />
    </div>
  );
}

export default Main;
