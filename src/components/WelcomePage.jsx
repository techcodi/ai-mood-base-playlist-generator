import { Link } from "react-router-dom";
import "./Welcome.css";
import { redirectToSpotifyLogin } from "../utils/spotifyAuth";
function WelcomePage() {
  return (
    <div className="welcome-section">
      <div>
        <h1>Your Face, Your Feelings, Your Soundtrack</h1>
        <p>
          Turn your emotions into personalized Spotify playlists with a single.
          We analyze your mood and play the music you need — no clicks required.
          Upload a selfie. Discover playlists that resonate with how you feel.
        </p>
        <button onClick={redirectToSpotifyLogin}>Continue with Spotify</button>
      </div>
      <img src="./31772 1.png" alt="header-img" />
    </div>
  );
}

export default WelcomePage;
