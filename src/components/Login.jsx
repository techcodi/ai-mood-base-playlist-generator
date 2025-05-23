import { redirectToSpotifyLogin } from "../utils/spotifyAuth";

function Login() {
  return (
    <div>
      <h1>Login with Spotify</h1>
      <button onClick={redirectToSpotifyLogin}>Login</button>
    </div>
  );
}

export default Login;
