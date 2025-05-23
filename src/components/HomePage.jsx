import { useState, useEffect } from "react";
import { detectEmotion } from "../components/detectEmotion";
import { FaFaceSmile, FaCloudRain } from "react-icons/fa6";
import { TbBrandMercedes } from "react-icons/tb";
import { SlEnergy } from "react-icons/sl";
import { RiFocus2Line } from "react-icons/ri";
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

  const token = localStorage.getItem("spotifyAccessToken");

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

        <div className="feelings-spans">
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
          <h3>Recommended Playlists for "{emotion}" Mood</h3>
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
