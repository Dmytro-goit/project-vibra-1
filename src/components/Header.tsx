import { useState } from "react";
import { FaMusic } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#search", label: "Search" },
  ];

  return (
    <header className="bg-yellow-100 sticky top-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-black rounded"
        >
          <FaMusic className="text-black text-2xl" />
          <h1 className="text-2xl font-bold text-black">Vibra</h1>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex space-x-6"
          aria-label="Primary navigation"
        >
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-black hover:text-gray-800 transition-colors duration-200 
                         focus:outline-none focus:ring-2 focus:ring-black focus:rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Log In Button (Desktop) */}
        <nav className="hidden md:block" aria-label="Log In">
          <a
            href="#login"
            className="bg-black hover:bg-gray-800 text-yellow-100 px-6 py-2 rounded-full
                       transition-colors duration-200 shadow-md focus:outline-none focus:ring-2
                       focus:ring-black focus:ring-offset-2"
          >
            Log In
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-black rounded"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <aside
            id="mobile-menu"
            className="md:hidden absolute top-16 left-0 right-0 bg-yellow-100 shadow-lg py-4 px-4"
            aria-label="Mobile menu"
          >
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="block text-black hover:text-gray-800 transition-colors
                                 duration-200 py-2 px-2 focus:outline-none focus:ring-2 focus:ring-black focus:rounded"
                      onClick={toggleMenu}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#login"
                    className="block bg-black hover:bg-gray-800 text-yellow-100 px-6 py-2 rounded-full
                               transition-colors duration-200 text-center focus:outline-none focus:ring-2 focus:ring-black focus:rounded"
                    onClick={toggleMenu}
                  >
                    Log In
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </header>
  );
};

export default Header;
