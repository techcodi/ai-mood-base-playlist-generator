import { useState, useEffect } from "react";
import { detectEmotion } from "../components/detectEmotion";
import { FaFaceSmile, FaCloudRain } from "react-icons/fa6";
import { TbBrandMercedes } from "react-icons/tb";
import { SlEnergy } from "react-icons/sl";
import { RiFocus2Line } from "react-icons/ri";
import { GoPlay } from "react-icons/go";
import "./Home.css";

const moodToQuery = {
  happy: "feel good hits",
  sad: "sad songs",
  angry: "rage rap",
  neutral: "chill vibes",
  disgust: "dark ambient",
  surprise: "party hits",
  fear: "soothing music",
};

function HomePage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [emotion, setEmotion] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deviceId, setDeviceId] = useState(null);
  const token = localStorage.getItem("spotifyAccessToken");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "AI Mood Playlist Player",
        getOAuthToken: (cb) => cb(token),
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      player.connect();
    };
  }, [token]);

  const searchSpotifyPlaylists = async (query) => {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=playlist&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data.playlists?.items || [];
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setEmotion(null);
    setPlaylists([]);
  };

  const handleSubmit = async () => {
    if (!image) return alert("Please upload an image first");
    setIsLoading(true);

    try {
      const result = await detectEmotion(image);
      const detectedEmotion = result.emotion;
      setEmotion(detectedEmotion);

      const query = moodToQuery[detectedEmotion.toLowerCase()] || "chill vibes";
      const results = await searchSpotifyPlaylists(query);
      setPlaylists(results);
    } catch (error) {
      console.error("Emotion detection error:", error);
      alert("Failed to detect emotion or fetch playlist.");
    } finally {
      setIsLoading(false);
    }
  };

  const playPlaylist = async (uri) => {
    if (!deviceId)
      return alert(
        "You must be a premium spotify before you can access this feature"
      );
    try {
      await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ context_uri: uri }),
        }
      );
    } catch (err) {
      console.error("Playback error:", err);
      alert("Unable to play. Make sure Spotify is open and active.");
    }
  };

  return (
    <div className="home-section">
      <div>
        <h2>How are you feeling today?</h2>
        <div className="hero-content">
          {preview && <img src={preview} alt="Preview" width="300px" />}
          <div className="hero-uploads">
            <input type="file" accept="image/*" onChange={handleImage} />
            <div className="hero-content-right">
              <small>Supported formats: JPG, PNG</small>
              <br />
              <small>Max size: 2MB</small>
              <br />
              <button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Analyzing..." : "Analyze Mood"}
              </button>
            </div>
          </div>
        </div>

        {emotion && (
          <p>
            Detected Emotion: <strong>{emotion}</strong>
          </p>
        )}

        <div className="fellings-spans">
          <p>
            <span style={{ backgroundColor: "#ffd166" }}>
              <FaFaceSmile />
            </span>
            <small>Happy</small>
          </p>
          <p>
            <span style={{ backgroundColor: "#1d63ff" }}>
              <TbBrandMercedes />
            </span>
            <small>Calm</small>
          </p>
          <p>
            <span style={{ backgroundColor: "#EF476F" }}>
              <SlEnergy />
            </span>
            <small>Energetic</small>
          </p>
          <p>
            <span style={{ backgroundColor: "#073b4c" }}>
              <FaCloudRain />
            </span>
            <small>Melancholy</small>
          </p>
          <p>
            <span style={{ backgroundColor: "#06d6a0" }}>
              <RiFocus2Line />
            </span>
            <small>Focus</small>
          </p>
        </div>
      </div>

      {playlists.length > 0 && (
        <div>
          <h3>Recommended Playlists for "{emotion}" Mood</h3>
          <table className="playlist-grid">
            <thead>
              <tr>
                <th>Songs</th>
                <th>Title</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {playlists.map((playlist) => {
                const imageUrl = playlist?.images?.[0]?.url;
                const uri = playlist?.uri;
                if (!uri || !imageUrl) return null;

                return (
                  <>
                    {/* <div key={playlist.id} className="playlist-card">
                    <img src={imageUrl} alt={playlist.name} width="200px" />
                    <p>{playlist.name}</p>
                    <button onClick={() => playPlaylist(uri)}>Play</button>
                  </div> */}

                    <tr key={playlist.id} className="playlist-card">
                      <td>
                        <img src={imageUrl} alt={playlist.name} width="50px" />{" "}
                      </td>

                      <td>
                        <p>{playlist.name}</p>
                      </td>

                      <td>
                        <small>--</small>{" "}
                      </td>

                      <td>
                        <button onClick={() => playPlaylist(uri)}>
                          <GoPlay />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HomePage;
