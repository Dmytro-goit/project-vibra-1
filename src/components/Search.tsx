import { useState, useEffect } from "react";

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  release_date: string;
  external_urls: { spotify: string };
}

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState<Album[]>([]); // 🔹 додаємо тип

  // Отримання токена
  useEffect(() => {
    const authParams = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    };

    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  // Пошук альбомів по артисту
  async function search() {
    if (!searchInput) return;

    const artistParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    const artistID = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchInput
      )}&type=artist&limit=1`,
      artistParams
    )
      .then((result) => result.json())
      .then((data) => data.artists.items[0]?.id);

    if (!artistID) return;

    const albumsData = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`,
      artistParams
    )
      .then((result) => result.json())
      .then((data) => data.items as Album[]); // 🔹 типізуємо масив

    setAlbums(albumsData);
  }

  return (
    <section className="py-14 bg-yellow-100 min-h-screen w-full">
      <div className="flex justify-center mb-10">
        <div className="flex gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Шукати альбоми улюбленого виконавця"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={search}
            className="bg-black text-yellow-400 font-bold px-4 py-2 rounded hover:bg-gray-900 transition"
          >
            Search
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {albums.map((album) => (
            <div
              key={album.id}
              className="bg-white rounded-lg shadow-lg w-64 flex flex-col items-center overflow-hidden m-3"
            >
              <div className="p-6">
                <img
                  src={album.images[0]?.url}
                  alt={album.name}
                  className="w-full h-56 object-cover rounded"
                />
              </div>

              <div className="px-4 pb-8 text-center flex flex-col items-center gap-3">
                <h3 className="font-bold text-lg">{album.name}</h3>
                <p className="text-gray-700">
                  Release Date: <br /> {album.release_date}
                </p>
                <a
                  href={album.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white font-bold px-4 py-2 rounded hover:bg-gray-900 transition"
                >
                  Album Link
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Search;
