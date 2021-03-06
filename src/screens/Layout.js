import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/Auth/AuthContext";

const Layout = () => {
  const { user } = useAuthContext();

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-yellow-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6 gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 492.91 530.03"
            className="w-9"
          >
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <path
                  d="M101,231.77c-.88-9.24-8.89-16.05-17.8-15.13l-9,.92L93,389.43l6.6-.67c8.91-.92,15.47-9.22,14.59-18.46Z"
                  style={{ fill: "#4d1516" }}
                />
                <path
                  d="M412.56,220.05c-8.9-1-17,5.77-17.9,15L380.53,373.49c-.94,9.23,5.57,17.58,14.47,18.56l6.08.67,17.77-172Z"
                  style={{ fill: "#4d1516" }}
                />
                <path
                  d="M486.36,245.12c.94-9.23-5.57-17.58-14.47-18.56l-9.18-1c0-.18,0-.37,0-.56C462.72,100.93,366,0,247.12,0,129.21,0,33.12,99.28,31.55,221.94l-7.74.79c-8.91.92-15.47,9.22-14.59,18.46,0,0-28.55,56.92,14.84,145.51l.49-.25a16.15,16.15,0,0,0,15.7,8.4l43.43-4.46L65.53,218.45C68.85,116.79,149,35.15,247.12,35.15c99.18,0,180,83.46,181.66,186.68L411.88,393.9l42.45,4.66c8.9,1,16.95-5.77,17.89-15C508.17,312.92,486.36,245.12,486.36,245.12Z"
                  style={{ fill: "#4d1516" }}
                />
                <path
                  d="M247.46,161.18a128,128,0,0,0-123.12,163c2,6.85,4.08,13.66,7.44,19.82C158,392.09,247.46,530,247.46,530s89.43-137.95,115.68-186c3.36-6.16,5.49-13,7.43-19.82a128,128,0,0,0-123.11-163Zm0,184.37a56.46,56.46,0,1,1,44.11-21.34A56.28,56.28,0,0,1,247.46,345.55Z"
                  style={{ fill: "#f05050" }}
                />
              </g>
            </g>
          </svg>
          <Link to="/" className="font-semibold text-xl tracking-tight">
            Escortee App
          </Link>
        </div>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow"></div>
          <div>
            {user ? (
              <div className="flex gap-2">
                <p className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                  {user.displayName}
                </p>
                <Link
                  to="/dashboard"
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                >
                  <p>Go to dashboard</p>
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                <a>Login</a>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
