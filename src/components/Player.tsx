import { useEffect, useState } from "react";

interface Artist {
  name: string;
}

interface Album {
  images: { url: string }[];
}

interface Track {
  id: string;
  name: string;
  preview_url: string | null;
  artists: Artist[];
  album: Album;
}

export default function Player() {
  const [keyword, setKeyword] = useState<string>("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [message, setMessage] = useState<string>("");

  const clientId = import.meta.env.VITE_CLIENT_ID as string;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET as string;

  // Отримання токена
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
        });
        const data = await res.json();
        setToken(data.access_token);
      } catch {
        setMessage("Не вдалося завантажити токен");
      }
    };
    fetchToken();
  }, [clientId, clientSecret]);

  // Пошук треків
  const fetchMusicData = async () => {
    if (!keyword || !token) return;
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${keyword}&type=track&limit=12`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setTracks(data.tracks.items);
      setMessage("");
    } catch {
      setMessage("Не вдалося завантажити музику");
    }
  };

  // Play/Pause preview
  const handlePlay = (url: string | null) => {
    if (!url) return;
    if (playingUrl === url) {
      audio?.pause();
      setPlayingUrl(null);
    } else {
      audio?.pause();
      const newAudio = new Audio(url);
      newAudio.play();
      setAudio(newAudio);
      setPlayingUrl(url);
    }
  };

  return (
    <section className="bg-gray-100 py-10 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          🎵 Music Preview
        </h1>

        {/* Пошук */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Введіть назву пісні..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchMusicData()}
            className="w-2/3 md:w-1/2 p-3 border rounded-l-lg focus:outline-none"
          />
          <button
            onClick={fetchMusicData}
            className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700"
          >
            Пошук
          </button>
        </div>

        {message && (
          <p className="text-center text-red-500 font-medium">{message}</p>
        )}

        {/* Результати */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center p-4"
            >
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-4 text-center">
                {track.name}
              </h2>
              <p className="text-gray-600 text-sm text-center">
                {track.artists.map((artist) => artist.name).join(", ")}
              </p>
              <button
                onClick={() => handlePlay(track.preview_url)}
                disabled={!track.preview_url}
                className={`mt-4 px-4 py-2 rounded-lg text-white w-full ${
                  track.preview_url
                    ? playingUrl === track.preview_url
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {playingUrl === track.preview_url ? "Pause" : "Play"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
