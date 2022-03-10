import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { googleLogin, registerUser } from "../context/Auth/actions";
import { useAuthDispatchContext } from "../context/Auth/AuthContext";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useAuthDispatchContext();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state ? location.state.from : { pathname: "/" };

  const googleLoginHandler = (e) => {
    e.preventDefault();
    googleLogin(dispatch)
      .then((user) => {
        navigate(from);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    registerUser(dispatch, { name, email, password })
      .then((data) => {
        navigate(from);
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        ></input>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          value={password}
        ></input>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <button className="p-9" onClick={googleLoginHandler}>
        SignInWithGoogle
      </button>
    </div>
  );
};

export default Register;
