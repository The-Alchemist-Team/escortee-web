import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate(location.pathname + "/add-place", {
            state: { from: location },
          });
        }}
      >
        Add a Place
      </button>
    </div>
  );
};

export default Dashboard;
