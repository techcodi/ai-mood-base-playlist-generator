import { Link } from "react-router-dom";
import "./Welcome.css";
import { redirectToSpotifyLogin } from "../utils/spotifyAuth";
function WelcomePage() {
  return (
    <div className="welcome-section">
      <div>
        <h1>Get ready for the new era of AI</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          accusantium voluptas enim dignissimos fugiat ipsa, vero ut autem.
          Earum voluptate enim labore nam inventore cumque. Accusamus et velit
          optio error?
        </p>
        <button onClick={redirectToSpotifyLogin}>Continue with Spotify</button>
      </div>
      <img src="./31772 1.png" alt="header-img" />
    </div>
  );
}

export default WelcomePage;
