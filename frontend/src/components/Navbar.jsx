import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-[#00b4db] to-[#0083b0] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-white tracking-wide">
          🚀 Image Compressor
        </h1>

        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-white text-lg font-medium px-4 py-2 rounded-md transition duration-300 hover:bg-white hover:text-[#0083b0] shadow-sm"
            >
              Home
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
