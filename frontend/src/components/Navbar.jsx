import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="bg-[#333] p-5 w-full fixed top-0 flex justify-between items-center z-50">
      <div className="text-white text-lg uppercase tracking-wider font-semibold">
        User Management
      </div>
      <ul className="flex gap-5">
        <li>
          <Link
            className={`text-white  px-4 py-2 transition-colors duration-300 rounded hover:bg-[#555] ${location.pathname === "/" ? "bg-[#555]" : ""} `}
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/add"
            className={`text-white  px-4 py-2 transition-colors duration-300 rounded hover:bg-[#555] ${location.pathname === "/add" ? "bg-[#555]" : ""}`}
          >
            Add User
          </Link>
        </li>
        {/* <li>
          <Link
            to="/edit"
            className={`text-white px-4 py-2 transition-colors duration-300 rounded hover:bg-[#555] ${location.pathname === "/edit" ? "bg-[#555]" : ""}`}
          >
            Edit User
          </Link>
        </li>
        <li>
          <Link
            to="/user"
            className={`text-white px-4 py-2 transition-colors duration-300 rounded hover:bg-[#555] ${location.pathname === "/user" ? "bg-[#555]" : ""}`}
          >
            User Detail
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
