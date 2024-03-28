import React, { Fragment, useContext, useState } from "react";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import myContext from "../../context/myContext";
import SearchBar from "../../components/searchBar/SearchBar";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { mode, toggleMode } = context;

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  const cartItems = useSelector((state) => state.cart);

  // navList Data
  const navList = (
    <ul className="flex space-x-5 text-white font-medium text-md px-5 ">
      {/* Home */}
      <li>
        <Link
          to={"/"}
          className="text-md font-medium text-gray-700 cursor-pointer hover:font-bold hover:text-green-900  "
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          Home
        </Link>
      </li>

      {/* All Product */}
      <li>
        <Link
          to={"/allproduct"}
          className="text-md font-medium text-gray-700 cursor-pointer  hover:text-green-900 hover:font-bold"
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          All Product
        </Link>
      </li>

      {/* Signup */}
      {!user ? (
        <li>
          <Link
            to={"/signup"}
            className="text-md font-medium text-gray-700 cursor-pointer hover:text-green-900 hover:font-bold"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Signup
          </Link>
        </li>
      ) : (
        ""
      )}

      {/* login */}
      {!user ? (
        <li>
          <Link
            to={"/login"}
            className="text-md font-medium text-gray-700 cursor-pointer  hover:font-bold"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Login
          </Link>
        </li>
      ) : (
        ""
      )}

      {/* User */}
      {user?.role === "user" && (
        <li>
          <Link
            to={"/user-dashboard"}
            className="text-md font-medium text-gray-700 cursor-pointer hover:text-green-900 hover:font-bold"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            {user?.name}
          </Link>
        </li>
      )}

      {/* Admin */}
      {user?.role === "admin" && (
        <li>
          <Link
            to={"/admin-dashboard"}
            className="text-md font-medium text-gray-700 cursor-pointer hover:text-green-900 hover:font-bold"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            {user?.name}
          </Link>
        </li>
      )}

      {/* logout */}
      {user && (
        <li
          onClick={logout}
          className="text-md font-medium text-green-700 cursor-pointer  hover:font-bold "
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          logout
        </li>
      )}

      <div className="flex lg:ml-6 ">
        <button className="" onClick={toggleMode}>
          {mode === "light" ? (
            <FiSun className="text-black hover:font-bold" size={30} />
          ) : "dark" ? (
            <BsFillCloudSunFill size={30} />
          ) : (
            ""
          )}
        </button>
      </div>

      {/* Cart */}
      <div className="ml-4 flow-root lg:ml-6">
        <Link
          to={"/cart"}
          className="group -m-2 flex items-center p-2"
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-black"
          >
            <path
              style={{ color: mode === "dark" ? "white" : "" }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              className="text-black"
            />
          </svg>

          <span
            className="ml-2 text-sm font-medium text-gray-700 group-"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            ({cartItems.length})
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </Link>
      </div>
    </ul>
  );
  return (
    <nav
      className="sticky top-0 bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl "
      style={{
        backgroundColor: mode === "dark" ? "#282c34" : "",
        color: mode === "dark" ? "white" : "",
      }}
    >
      {/* main  */}
      <div
        className="lg:flex lg:justify-between items-center py-3 lg:px-3 "
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        {/* left  */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className=" font-bold hover:text-green-500 text-2xl text-center">
              ShopEaze
            </h2>
          </Link>
        </div>

        <SearchBar />
        {/* right  */}
        <div className="right flex justify-center mb-4 lg:mb-0 ">
          {navList}</div>

        {/* Search Bar  */}
      </div>
    </nav>
  );
}

export default Navbar;
