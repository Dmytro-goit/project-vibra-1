// заміни на своє зображення

const Hero = () => {
  const stats = [
    { value: "150+", label: "Artists" },
    { value: "500+", label: "Albums" },
    { value: "2000+", label: "Tracks" },
    { value: "50+", label: "Playlists" },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-white">
      <article
        className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 flex flex-col-reverse lg:flex-row 
      items-center gap-10 lg:gap-20"
      >
        {/* Лівий контент */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <hgroup>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
              Feel the{" "}
              <mark className="text-yellow-500 bg-transparent">Vibe</mark> of
              Music
            </h1>
            <p className="text-base sm:text-lg text-black mb-8 max-w-lg mx-auto lg:mx-0">
              Discover new artists, listen to tracks, and create your personal
              playlists. Vibra brings the music world to your fingertips.
            </p>
          </hgroup>

          {/* Кнопки */}
          <nav className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <a
              href="#search"
              className="bg-black hover:bg-gray-800 text-yellow-100 px-8 py-3 rounded-full text-center transition shadow-lg"
              aria-label="Search Music"
            >
              Search Music
            </a>
            <a
              href="#about"
              className="border border-black text-black hover:bg-yellow-200 px-8 py-3 rounded-full text-center transition"
              aria-label="About Vibra"
            >
              About Vibra
            </a>
          </nav>

          {/* Статистика */}
          <aside className="py-4">
            <ul className="flex flex-wrap justify-center gap-4 md:gap-8 text-center">
              {stats.map((stat, index) => (
                <li key={index} className="px-2">
                  <strong className="text-2xl font-bold text-black">
                    {stat.value}
                  </strong>
                  <small className="block text-sm text-black">
                    {stat.label}
                  </small>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Праве зображення */}
        <figure className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <span
              className="bg-black rounded-full w-80 h-80 absolute -top-10 -left-10 opacity-10"
              aria-hidden="true"
            ></span>
            <span
              className="bg-yellow-500 rounded-full w-64 h-64 absolute -bottom-10 -right-10 opacity-20"
              aria-hidden="true"
            ></span>
            <img
              alt="Music vibes"
              className="relative z-10 rounded-full shadow-2xl w-full max-w-xs md:max-w-sm object-cover"
              width="400"
              height="400"
              loading="eager"
            />
          </div>
        </figure>
      </article>
    </section>
  );
};

export default Hero;
