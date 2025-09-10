// import { useState, useEffect, useRef } from "react";
// import axios from "axios";

// const CLIENT_ID = "17b84880";

// interface Track {
//   id: string;
//   name: string;
//   artist_name: string;
//   audio: string;
// }

// export default function MusicPlayer() {
//   const [search, setSearch] = useState("");
//   const [tracks, setTracks] = useState<Track[]>([]);
//   const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const audioRef = useRef<HTMLAudioElement>(new Audio());

//   // Обробка прогресу треку
//   useEffect(() => {
//     const audio = audioRef.current;
//     const updateProgress = () => {
//       setProgress((audio.currentTime / audio.duration) * 100 || 0);
//     };
//     audio.addEventListener("timeupdate", updateProgress);
//     audio.addEventListener("ended", () => setIsPlaying(false));
//     return () => {
//       audio.removeEventListener("timeupdate", updateProgress);
//       audio.removeEventListener("ended", () => setIsPlaying(false));
//     };
//   }, []);

//   const handleSearch = async () => {
//     try {
//       const res = await axios.get("https://api.jamendo.com/v3.0/tracks/", {
//         params: {
//           client_id: CLIENT_ID,
//           format: "json",
//           limit: 10,
//           search: search,
//         },
//       });

//       const results: Track[] = res.data.results.map((t: any) => ({
//         id: t.id,
//         name: t.name,
//         artist_name: t.artist_name,
//         audio: t.audio,
//       }));
//       setTracks(results);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const playTrack = (track: Track) => {
//     const audio = audioRef.current;

//     if (currentTrack?.id !== track.id) {
//       audio.src = track.audio;
//       audio.play();
//       setCurrentTrack(track);
//       setIsPlaying(true);
//     } else {
//       if (isPlaying) {
//         audio.pause();
//         setIsPlaying(false);
//       } else {
//         audio.play();
//         setIsPlaying(true);
//       }
//     }
//   };

//   const handleProgressClick = (
//     e: React.MouseEvent<HTMLDivElement, MouseEvent>
//   ) => {
//     const audio = audioRef.current;
//     const rect = e.currentTarget.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const newTime = (clickX / rect.width) * audio.duration;
//     audio.currentTime = newTime;
//   };

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Music Player</h1>

//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search tracks..."
//           className="border p-2 flex-1 rounded"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Search
//         </button>
//       </div>

//       <ul className="space-y-2">
//         {tracks.map((track) => (
//           <li key={track.id} className="border p-2 rounded flex flex-col gap-2">
//             <div className="flex justify-between items-center">
//               <span>
//                 {track.name} - {track.artist_name}
//               </span>
//               <button
//                 onClick={() => playTrack(track)}
//                 className="bg-green-500 text-white px-3 py-1 rounded"
//               >
//                 {currentTrack?.id === track.id && isPlaying ? "Pause" : "Play"}
//               </button>
//             </div>

//             {currentTrack?.id === track.id && (
//               <div
//                 className="h-2 bg-gray-300 rounded cursor-pointer"
//                 onClick={handleProgressClick}
//               >
//                 <div
//                   className="h-2 bg-green-500 rounded"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import { useEffect, useState } from "react";

interface Artist {
  name: string;
}

interface Window {
  Spotify: any;
  onSpotifyWebPlaybackSDKReady: () => void;
}

interface Album {
  images: { url: string }[];
}

interface Track {
  id: string;
  name: string;
  uri: string;
  artists: Artist[];
  album: Album;
}

export default function SpotifyTrackPlayer() {
  const [keyword, setKeyword] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [message, setMessage] = useState("");

  const clientId = import.meta.env.VITE_CLIENT_ID as string;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI as string;
  const scopes = "streaming user-read-email user-read-private";

  // Крок 1: Отримання user access token через OAuth
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", "?"));
      const access_token = params.get("access_token");
      if (access_token) setToken(access_token);
    }
  }, []);

  const authorize = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes)}`;
  };

  // Крок 2: Пошук треків
  const fetchTracks = async () => {
    if (!keyword || !token) return;
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${keyword}&type=track&limit=12`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setTracks(data.tracks.items);
      setMessage("");
    } catch {
      setMessage("Не вдалося завантажити музику");
    }
  };

  // Крок 3: Підключення Web Playback SDK
  useEffect(() => {
    if (!token) return;

    if (!window.Spotify) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Player",
        getOAuthToken: (cb: any) => cb(token),
      });

      player.addListener("ready", ({ device_id }: any) => {
        setDeviceId(device_id);
      });

      player.addListener("player_state_changed", (state: any) => {
        if (!state) return;
        setIsPaused(state.paused);
      });

      player.connect();
      setPlayer(player);
    };
  }, [token]);

  // Відтворення треку
  const playTrack = async (uri: string) => {
    if (!deviceId || !token) return;

    try {
      await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: "PUT",
          body: JSON.stringify({ uris: [uri] }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlayingTrack(uri);
    } catch (err) {
      console.error(err);
    }
  };

  const togglePlay = () => {
    if (player) player.togglePlay();
  };

  return (
    <section className="bg-gray-100 py-10 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          🎵 Spotify Player
        </h1>

        {!token && (
          <div className="text-center mb-6">
            <button
              onClick={authorize}
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Авторизуватись у Spotify
            </button>
          </div>
        )}

        {token && (
          <>
            {/* Пошук */}
            <div className="flex justify-center mb-8">
              <input
                type="text"
                placeholder="Введіть назву пісні..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchTracks()}
                className="w-2/3 md:w-1/2 p-3 border rounded-l-lg focus:outline-none"
              />
              <button
                onClick={fetchTracks}
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
                    onClick={() =>
                      playingTrack === track.uri
                        ? togglePlay()
                        : playTrack(track.uri)
                    }
                    className={`mt-4 px-4 py-2 rounded-lg text-white w-full ${
                      playingTrack === track.uri && !isPaused
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {playingTrack === track.uri && !isPaused ? "Pause" : "Play"}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
