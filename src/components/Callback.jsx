import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      const codeVerifier = localStorage.getItem("spotify_code_verifier");

      fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
          grant_type: "authorization_code",
          code,
          redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
          code_verifier: codeVerifier,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token)
            localStorage.setItem("spotifyAccessToken", data.access_token);
          navigate("/app");
        })
        .catch((err) => {
          console.error("Error exchanging token:", err);
          navigate("/login");
        });
    } else {
      console.error("Authorization code not found in URL");
      navigate("/login");
    }
  }, [navigate]);

  return <div>Processing authentication...</div>;
}

export default Callback;
