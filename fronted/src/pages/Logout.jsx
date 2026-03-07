import React from 'react'
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ children, className }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure?");

    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  };

  return (
    <li onClick={handleLogout} className={className}>
      {children}
    </li>
  );
}