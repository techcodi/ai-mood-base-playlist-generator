import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import Callback from "./components/Callback";
import Main from "./components/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/app" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
