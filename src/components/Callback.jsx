import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");

    if (token) {
      localStorage.setItem("spotifyAccessToken", token);
      navigate("/app");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Redirecting...</p>;
}

export default Callback;
