import React from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/Auth/AuthContext";

const Home = () => {
  return (
    <div>
      <p>Home</p>
      <Link to="/dashboard">dashboard</Link>
    </div>
  );
};

export default Home;
