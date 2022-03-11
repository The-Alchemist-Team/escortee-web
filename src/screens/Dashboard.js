import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
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
    <div className="flex justify-center items-center flex-col w-screen mt-10">
      <div className="grid grid-cols-3 gap-4">
        {docs.map(({ docid, doc }) => {
          return (
            <div
              key={`${docid}${doc.name}${doc.address}`}
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
              <Link
                to="#"
                className="block p-6 max-w-sm w-80 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {doc.name}
                </h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">
                  {doc.description}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
      {/* <div
            key={`${docid}${doc.name}${doc.address}`}
            class="max-w-sm w-full lg:max-w-full lg:flex"
          >
            <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div class="mb-8">
                <p class="text-sm text-gray-600 flex items-center">
                  <svg
                    className="fill-current text-gray-500 w-3 h-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  Members only
                </p>
                <div className="text-gray-900 font-bold text-xl mb-2">
                  Can coffee make you a better developer?
                </div>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src="/img/jonathan.jpg"
                  alt="Avatar of Jonathan Reinink"
                />
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">Jonathan Reinink</p>
                  <p className="text-gray-600">Aug 18</p>
                </div>
              </div>
            </div>
          </div> */}

      {/* <div key={`${docid}${doc.name}${doc.address}`}>
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
          </div> */}

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
