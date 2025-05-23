import { useState } from "react";
import { detectEmotion } from "../components/detectEmotion";
import { FaFaceSmile } from "react-icons/fa6";
import { TbBrandMercedes } from "react-icons/tb";
import { SlEnergy } from "react-icons/sl";
import { FaCloudRain } from "react-icons/fa";
import { RiFocus2Line } from "react-icons/ri";
import "./Home.css";

function HomePage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [emotion, setEmotion] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const moodToQuery = {
    happy: "feel good hits",
    sad: "sad songs",
    angry: "rage rap",
    neutral: "chill vibes",
    disgust: "dark ambient",
    surprise: "party hits",
    fear: "soothing music",
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setEmotion(null);
    setPlaylists([]);
  };

  const searchSpotifyPlaylists = async (query) => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (!token) {
      alert("Spotify token not found. Please log in again.");
      return [];
    }

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

    if (!response.ok) {
      throw new Error("Failed to fetch playlists from Spotify.");
    }

    const data = await response.json();
    return data.playlists?.items || [];
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
      console.error("Emotion detection or playlist fetch failed:", error);
      alert("Failed to detect emotion or fetch playlists.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-section">
      <div>
        <h2>How are you feeling today?</h2>
        <div className="hero-content">
          {preview && <img src={preview} alt="preview" width="300px" />}
          <div className="hero-uploads">
            <input type="file" accept="image/*" onChange={handleImage} />
            <div className="hero-content-right">
              <div>
                <small>Supported formats: JPG, PNG</small> <br />
                <small>Size: must not be greater than 2MB</small>
              </div>
              <button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Analyzing..." : "Analyze Mood..."}
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
            <span style={{ backgroundColor: "#118ab2" }}>
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
          <h3>Recommended Playlists for "{emotion}" mood</h3>
          <div className="playlist-grid">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="playlist-card">
                <a
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={playlist.images[0]?.url}
                    alt={playlist.name}
                    width="200px"
                  />
                  <p>{playlist.name}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
