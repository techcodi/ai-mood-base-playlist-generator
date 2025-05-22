import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import Main from "./components/Main";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
