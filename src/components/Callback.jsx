import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    console.log("REDIRECTED TO CALLBACK");
    console.log("HASH:", hash);

    if (!hash) {
      console.log("No hash in URL");
      return navigate("/login");
    }

    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");

    if (accessToken) {
      console.log("Access Token:", accessToken);
      localStorage.setItem("spotifyAccessToken", accessToken);
      navigate("/app");
    } else {
      console.error("Token not found in hash.");
      navigate("/login");
    }
  }, [navigate]);

  return <p>Authenticating with Spotify...</p>;
}

export default Callback;
