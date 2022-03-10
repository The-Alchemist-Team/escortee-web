import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/Auth/AuthContext";
import { useFetchUserPlaces } from "../hooks/useFetchUserPlaces";

const Dashboard = ({ history }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { docs, isLoading, error } = useFetchUserPlaces("places", user.uid);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1>name</h1>
        <p>address</p>
        <p>description</p>
        <p></p>
      </div>
      {docs.map(({ docid, doc }) => {
        return (
          <div key={`${docid}${doc.name}${doc.address}`}>
            <div className="flex justify-between">
              <h1>{doc.name}</h1>
              <p>{doc.address}</p>
              <p>{doc.description}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`${location.pathname}/add-feature`, {
                    state: {
                      from: location.pathname,
                      docid: docid.id,
                    },
                  });
                }}
              >
                Add Features
              </button>
              {!doc.isVerified ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`${location.pathname}/verify`, {
                      state: {
                        from: location.pathname,
                        docid: docid.id,
                      },
                    });
                  }}
                >
                  verify
                </button>
              ) : (
                <p></p>
              )}
            </div>
            <hr />
          </div>
        );
      })}

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
