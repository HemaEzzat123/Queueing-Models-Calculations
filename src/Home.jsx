import React from "react";

function Home() {
  return (
    <div className="mt-12 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Card 1 */}
      <div className="p-8 sm:p-10 md:p-12 border border-gray-300 rounded-2xl shadow-2xl bg-gradient-to-r from-white to-gray-100 text-black mb-8 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
          About Project
        </h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700">
          This project is a queuing system model designed to help users simulate
          and calculate various queue parameters, providing insights into
          efficiency and optimization.
        </p>
      </div>

      {/* Card 2 */}
      <div className="p-8 sm:p-10 md:p-12 border border-gray-300 rounded-2xl shadow-2xl bg-gradient-to-r from-white to-gray-100 text-black mb-8 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
          About Calculate Queue
        </h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700">
          The calculation module allows users to compute essential queue metrics
          such as arrival rate, service rate, waiting time, and system
          utilization to enhance decision-making.
        </p>
      </div>

      {/* Card 3 */}
      <div className="p-8 sm:p-10 md:p-12 border border-gray-300 rounded-2xl shadow-2xl bg-gradient-to-r from-white to-gray-100 text-black transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
          About Simulation
        </h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700">
          The simulation module provides a dynamic visualization of queue
          behavior under different conditions, allowing users to analyze and
          predict system performance.
        </p>
      </div>
    </div>
  );
}

export default Home;
