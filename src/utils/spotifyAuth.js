const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const REDIRECT_URI =
  "https://ai-mood-base-playlist-generator.vercel.app/callback";

const SCOPES = [
  "user-read-private",
  "user-read-email",
  "streaming",
  "playlist-modify-private",
  "playlist-modify-public",
];

export const getSpotifyAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "token", // THIS is for Implicit Grant
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(" "),
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};
