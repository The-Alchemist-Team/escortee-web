import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { googleLogin, loginUser } from "../context/Auth/actions";
import { useAuthDispatchContext } from "../context/Auth/AuthContext";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useAuthDispatchContext();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state ? location.state.from : { pathname: "/" };

  const googleLoginHandler = (e) => {
    e.preventDefault();
    googleLogin(dispatch)
      .then((data) => {
        navigate(from);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(dispatch, { email, password })
      .then((data) => {
        navigate(from);
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 class="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={submitHandler}>
          <div class="mt-4">
            <div>
              <label class="block" for="email">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div class="mt-4">
              <label class="block">Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div class="flex items-baseline justify-between">
              <button
                type="submit"
                class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              >
                Login
              </button>
              <Link
                to="/register"
                class="text-sm text-blue-600 hover:underline"
              >
                Don't have a account?
              </Link>
            </div>
          </div>
        </form>
        <button
          className="w-full rounded-lg mt-5 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={googleLoginHandler}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
