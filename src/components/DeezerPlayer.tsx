import React, { useState } from "react";

interface Track {
  id: number;
  title: string;
  artist: { name: string };
  album: { cover_medium: string };
  preview: string;
}

const DeezerPlayer: React.FC = () => {
  const [search, setSearch] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);

  const handleSearch = async () => {
    if (!search) return;

    try {
      const res = await fetch(
        `http://localhost:3001/api/search?q=${encodeURIComponent(search)}`
      );
      const data = await res.json();
      setTracks(data.data);
    } catch (err) {
      console.error("Error fetching tracks:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Deezer Music Player</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Введіть назву пісні або артиста"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Пошук
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="border rounded p-2 flex flex-col items-center shadow hover:shadow-lg transition"
          >
            <img
              src={track.album.cover_medium}
              alt={track.title}
              className="mb-2 rounded"
            />
            <h2 className="font-semibold mb-1 text-center">{track.title}</h2>
            <p className="text-sm mb-2 text-center">{track.artist.name}</p>
            <audio controls src={track.preview} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeezerPlayer;
