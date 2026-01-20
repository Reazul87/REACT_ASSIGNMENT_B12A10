import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ children, to, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "font-bold text-[#FF6F00] bg-transparent"
          : "font-medium text-white/80 transition-all duration-200 hover:text-[#FF6F00] bg-transparent"
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;
