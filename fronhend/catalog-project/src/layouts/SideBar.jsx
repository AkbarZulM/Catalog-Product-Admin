import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import "../assets/styles/SideBar.css";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setIsOpen((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "";
      return !prev;
    });
  };

  const isLinkActive = (path) => location.pathname === path;

  return (
    <div className="cointainer w-[260px] bg-white h-screen shadow-lg flex flex-col items-center">
      <div className="pt-6">
        <img src="/public/image/logo.png" alt="Logo" />
      </div>
      <ul className="pt-10 w-full flex flex-col items-center">
        <li className="w-full px-6 pt-2">
          <NavLink
            to="/admin/dashboard"
            className={`rounded-lg flex items-center gap-4 py-2 px-2 transition-all duration-300 ${
              isLinkActive("/admin/dashboard") ? "bg-[#E4C59E] shadow-md" : ""
            }`}
          >
            <img
              src="/public/image/icons8-home-27.png"
              alt="Home"
              className="w-[25px] h-[25px]"
            />
            <span
              className={`text-[16px] transition-colors duration-300 ${
                isLinkActive("/admin/dashboard")
                  ? "text-[#BB8760]"
                  : "text-gray-500"
              }`}
            >
              Dashboard
            </span>
            <img
              src="/public/image/icons8-back-17.png"
              alt="Arrow"
              className="w-4 h-4 ml-auto opacity-0"
            />
          </NavLink>
        </li>

        <li className="w-full px-6 pt-6">
          <div
            onClick={handleToggle}
            className={`rounded-lg flex items-center gap-4 py-2 px-2 cursor-pointer transition-all duration-300 ${
              isOpen ? "bg-[#E4C59E] shadow-md" : ""
            }`}
          >
            <img
              src="/public/image/icons8-service-27.png"
              alt="Service"
              className="w-6 h-6"
            />
            <span
              className={`text-[16px] transition-colors duration-300 ${
                isOpen ? "text-[#BB8760]" : "text-gray-500"
              }`}
            >
              Services
            </span>
            <img
              src="/public/image/icons8-back-17.png"
              alt="Arrow"
              className={`w-4 h-4 ml-auto transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </li>
        {isOpen && (
          <li className="w-full px-6 pt-4">
            <ul className="flex flex-col gap-2 pl-8">
              <li className="flex items-center">
                {isLinkActive("/admin/products") && (
                  <div className="w-1.5 h-5 bg-[#BB8760] rounded mr-2"></div>
                )}
                <NavLink
                  to="/admin/products"
                  className="flex items-center gap-2 text-sm"
                >
                  <i className="fas fa-users"></i>
                  <span>Data Product</span>
                </NavLink>
              </li>
              <li className="flex items-center">
                {isLinkActive("/admin/create-product") && (
                  <div className="w-1.5 h-5 bg-[#BB8760] rounded mr-2"></div>
                )}
                <NavLink
                  to="/admin/create-product"
                  className="flex items-center gap-2 text-sm"
                >
                  <i className="fas fa-shopping-cart"></i>
                  <span>Create Product</span>
                </NavLink>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideBar;
