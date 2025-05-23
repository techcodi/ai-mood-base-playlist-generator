import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/spotifyAuth";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      getToken(code)
        .then(() => navigate("/app"))
        .catch(() => navigate("/login"));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Processing login...</p>;
}

export default Callback;
