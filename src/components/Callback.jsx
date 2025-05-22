import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substring(1); // remove "#"
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      // Store token in localStorage
      localStorage.setItem("spotifyAccessToken", accessToken);

      // Redirect to your main app page
      navigate("/app");
    } else {
      // Token missing or error
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Link to="/app">Go to app</Link>
    </div>
  );
}

export default Callback;
