import { Link } from "react-router-dom";
import { getSpotifyAuthUrl } from "../utils/spotifyAuth";

function Login() {
  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <div>
      <h1>Login with your Spotify account</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
      <Link to="/callback">Go</Link>
    </div>
  );
}

export default Login;
