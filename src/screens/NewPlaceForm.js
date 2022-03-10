import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { useAuthContext } from "../context/Auth/AuthContext";

const NewPlaceForm = () => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [address, setAddress] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state ? location.state.from : { pathname: "/" };

  const { user } = useAuthContext();
  const submitHandler = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "places"), {
      uid: user.uid,
      name,
      description,
      address,
      isVerified: false,
    })
      .then((data) => {
        navigate(from);
      })
      .catch((err) => alert(err));
  };
  return (
    <form onSubmit={submitHandler}>
      <label>Name of the building</label>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <label>Address</label>
      <input
        type="text"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      ></input>
      <label>Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewPlaceForm;
