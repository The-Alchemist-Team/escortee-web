import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/Auth/AuthContext";

const Home = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  console.log(user);
  if (user === null) {
    return <Navigate to="/login" state={{ from: "/" }} />;
  }

  return (
    <div>
      <button>Add A building</button>
    </div>
  );
};

export default Home;
