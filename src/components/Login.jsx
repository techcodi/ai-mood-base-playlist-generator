import { redirectToSpotifyLogin } from "../utils/spotifyAuth";

function Login() {
  return (
    <div>
      <h1>Login with your Spotify account</h1>
      <button onClick={redirectToSpotifyLogin}>Login with Spotify</button>
    </div>
  );
}

export default Login;
