import { FaMusic, FaHeadphones, FaCompactDisc, FaUser } from "react-icons/fa";

const About = () => {
  const stats = [
    {
      value: "150+",
      label: "Artists",
      icon: <FaMusic className="text-yellow-500" aria-hidden="true" />,
    },
    {
      value: "500+",
      label: "Albums",
      icon: <FaCompactDisc className="text-yellow-500" aria-hidden="true" />,
    },
    {
      value: "2000+",
      label: "Tracks",
      icon: <FaHeadphones className="text-yellow-500" aria-hidden="true" />,
    },
    {
      value: "50+",
      label: "Playlists",
      icon: <FaUser className="text-yellow-500" aria-hidden="true" />,
    },
  ];

  const approachItems = [
    {
      icon: <FaMusic className="text-yellow-600" aria-hidden="true" />,
      text: "Discover new artists from around the world and explore different music genres.",
    },
    {
      icon: <FaHeadphones className="text-yellow-600" aria-hidden="true" />,
      text: "Listen to your favorite tracks and enjoy high-quality audio streaming.",
    },
    {
      icon: <FaCompactDisc className="text-yellow-600" aria-hidden="true" />,
      text: "Create playlists, share music with friends, and follow your favorite artists.",
    },
  ];

  return (
    <section id="about" className="py-14 overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        <article className="flex flex-col lg:flex-row items-center gap-12">
          {/* Зображення */}
          <figure className="lg:w-5/12 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl w-full max-w-md mx-auto">
              <img
                className="w-full h-auto object-cover aspect-[4/5]"
                loading="lazy"
                alt="Vibra music"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                aria-hidden="true"
              ></div>
            </div>
            <span
              className="hidden lg:block absolute -bottom-8 -left-8 w-32 h-32 rounded-full
            bg-yellow-500 opacity-20 z-0"
              aria-hidden="true"
            ></span>
            <span
              className="hidden lg:block absolute -top-8 -right-8 w-40 h-40 rounded-full
            bg-yellow-600 opacity-20 z-0"
              aria-hidden="true"
            ></span>
            <aside className="absolute bottom-1 -right-5 bg-black p-3 rounded-xl shadow-lg z-20">
              <strong className="text-2xl font-bold text-yellow-100">
                150+
              </strong>
              <small className="block text-xs font-medium text-yellow-200">
                Artists
              </small>
            </aside>
          </figure>

          {/* Контент */}
          <div className="lg:w-7/12">
            <header>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                About <span className="text-yellow-500">Vibra</span>
              </h2>
              <p className="text-lg text-black mb-6">
                Vibra is your ultimate music hub. Explore artists, albums, and
                playlists, and create your personal collection of tracks you
                love.
              </p>
            </header>

            {/* Our Approach */}
            <section className="m-8">
              <h3 className="text-xl font-semibold text-black mb-4">
                Our Approach
              </h3>
              <ul className="space-y-3">
                {approachItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <figure className="bg-yellow-100 p-1 rounded-full mr-3">
                      {item.icon}
                    </figure>
                    <p className="text-black">{item.text}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((item, index) => (
                <article
                  key={index}
                  className="bg-black p-4 rounded-lg shadow-sm flex items-center"
                >
                  <figure className="mr-3">{item.icon}</figure>
                  <div>
                    <strong className="text-xl font-bold text-yellow-100">
                      {item.value}
                    </strong>
                    <p className="text-sm text-yellow-200">{item.label}</p>
                  </div>
                </article>
              ))}
            </section>

            {/* Button */}
            <nav>
              <a
                href="#search"
                className="inline-block bg-black hover:bg-gray-800 text-yellow-100 px-6 py-3 rounded-full
              transition shadow-md focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Explore Music
              </a>
            </nav>
          </div>
        </article>

        {/* Mission Section */}
        <aside className="mt-20 bg-black rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
          <span
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-yellow-500 opacity-40"
            aria-hidden="true"
          ></span>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-yellow-100 mb-6">
              Our Mission
            </h3>
            <blockquote className="text-lg text-yellow-200 mb-6">
              "To connect music lovers with artists worldwide, making every
              moment a vibra moment."
            </blockquote>
            <figure className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                <FaUser className="text-black" aria-hidden="true" />
              </div>
              <figcaption>
                <cite className="font-semibold text-yellow-100 not-italic">
                  Alex Beat
                </cite>
                <p>Founder & Music Curator</p>
              </figcaption>
            </figure>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default About;
