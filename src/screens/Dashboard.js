import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Arrow from "../common/icon/Arrow";
import Loading from "../common/icon/Loading";
import { useAuthContext } from "../context/Auth/AuthContext";
import { useFetchUserPlaces } from "../hooks/useFetchUserPlaces";

const Dashboard = ({ history }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { docs, isLoading, error } = useFetchUserPlaces("places", user.uid);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center flex-col w-screen mt-10">
      <div className="grid grid-cols-3 gap-4">
        {docs.length === 0 && (
          <div className="relative bottom-10 flex flex-col h-screen w-full justify-center col-span-3 items-center">
            <p className="relative bottom-24 font-bold text-5xl w-3/4">
              You have not added any places yet. Please{" "}
              <span className="text-yellow-400">Add a new place</span>{" "}
            </p>

            <div className="rotate-180 scale-50 absolute bottom-32 right-0">
              <Arrow />
            </div>
          </div>
        )}
        {docs.map(({ docid, doc }) => {
          return (
            <div
              onClick={(e) => {
                e.preventDefault();
                navigate(`${location.pathname}/add-feature`, {
                  state: {
                    from: location.pathname,
                    docid: docid.id,
                  },
                });
              }}
              key={`${docid}${doc.name}${doc.address}`}
              // onClick={(e) => {

              // }}
            >
              <div className="relative block p-6 max-w-sm w-80 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {doc.name}
                </h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">
                  {doc.description}
                </p>
                {!doc.isVerified && (
                  <button
                    className="absolute right-2 top-1 text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`${location.pathname}/verify`, {
                        state: {
                          from: location.pathname,
                          docid: docid.id,
                        },
                      });
                    }}
                  >
                    Verify
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="absolute bottom-10 right-10 bg-yellow-400 px-7 py-5 rounded-lg shadow-lg  text-white"
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
