import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white text-green-400 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-serif font-bold">
          <a href="/" className="text-green-500 hover:text-yellow-200">
            My Bible
          </a>
        </div>

        <div className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-yellow-300">
            Home
          </a>
          <a href="/" className="hover:text-yellow-300">
            Kitab Suci
          </a>
          <a href="/" className="hover:text-yellow-300">
            BookMark
          </a>
          <a href="/" className="hover:text-yellow-300">
            About
          </a>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center text-green-500 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-green-500 text-white py-4 px-6 space-y-4"
        >
          <a href="/" className="block hover:text-yellow-300">
            Home
          </a>
          <a href="/" className="block hover:text-yellow-300">
            Kitab Suci
          </a>
          <a href="/" className="block hover:text-yellow-300">
            BookMark
          </a>
          <a href="/" className="block hover:text-yellow-300">
            About
          </a>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
