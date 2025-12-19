import React from "react";
import { FaTasks, FaCheckCircle, FaLightbulb, FaClock, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FaTasks className="text-blue-500" /> About Todo App
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mb-10">
        The <span className="font-semibold text-blue-600">Todo App</span> is a
        simple and powerful tool to organize your daily tasks. It helps you stay
        productive, manage time effectively, and never miss important tasks.
      </p>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-10">
        {/* Feature 1 */}
        <div className="p-6 bg-white shadow rounded-xl text-center hover:shadow-lg transition">
          <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-3" />
          <h2 className="text-lg font-semibold">Manage Your Tasks</h2>
          <p className="text-gray-600 text-sm">
            Add, edit, and delete todos easily with a clean interface.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="p-6 bg-white shadow rounded-xl text-center hover:shadow-lg transition">
          <FaClock className="text-yellow-500 text-4xl mx-auto mb-3" />
          <h2 className="text-lg font-semibold">Stay Organized</h2>
          <p className="text-gray-600 text-sm">
            Track remaining tasks and mark them complete when done.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="p-6 bg-white shadow rounded-xl text-center hover:shadow-lg transition">
          <FaLightbulb className="text-purple-500 text-4xl mx-auto mb-3" />
          <h2 className="text-lg font-semibold">Boost Productivity</h2>
          <p className="text-gray-600 text-sm">
            Focus on what matters most and save time every day.
          </p>
        </div>
      </div>

      {/* Home Button */}
      <Link to="/" className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
        <FaHome /> Back to Home
      </Link>
    </div>
  );
}

export default About;
