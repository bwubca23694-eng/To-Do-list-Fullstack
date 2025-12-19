import React from "react";
import { FaHome, FaInfoCircle, FaSignOutAlt, FaTasks } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow-md">
      {/* Left Section - Logo + Links */}
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FaTasks className="text-yellow-400 text-3xl" />
          <span className="text-xl font-bold">TodoApp</span>
        </div>

        {/* Nav Links */}
        <a
          href="/"
          className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-200"
        >
          <FaHome /> <span>Home</span>
        </a>

        <a
          href="/about"
          className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-200"
        >
          <FaInfoCircle /> <span>About</span>
        </a>
      </div>

      {/* Right Section - Logout Button */}
      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-200 shadow">
        <FaSignOutAlt /> <span>Logout</span>
      </button>
    </nav>
  );
}

export default Navbar;
