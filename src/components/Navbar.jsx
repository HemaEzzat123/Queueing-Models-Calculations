import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 shadow-lg">
      {/* Container for brand + nav items */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4">
        {/* Brand / Logo */}
        <div className="text-white text-xl sm:text-2xl font-bold mb-2 sm:mb-0">
          Queuing System Model
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-2 sm:space-x-4">
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:px-6 rounded transition-all duration-300 shadow-md">
              Home
            </button>
          </Link>
          <Link to="/calculate">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:px-6 rounded transition-all duration-300 shadow-md">
              Calculate
            </button>
          </Link>
          <Link to="/simulation">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 sm:px-6 rounded transition-all duration-300 shadow-md">
              Simulation
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
