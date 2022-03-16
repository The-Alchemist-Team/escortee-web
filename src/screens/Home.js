import React from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/Auth/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-20">
        <p className="font-bold text-7xl ">
          Let The Specials Experience{" "}
          <p className="text-yellow-400">Exploring</p>
        </p>
        <button
          className="px-9 py-5 w-80  bg-yellow-400 text-white font-bold text-3xl rounded-xl"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Lets get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
