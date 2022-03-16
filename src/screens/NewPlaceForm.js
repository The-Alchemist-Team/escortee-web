import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Places from "../common/icon/Places";
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
    <div class="flex  h-screen w-full justify-center items-center px-80">
      <form onSubmit={submitHandler} class="w-3/4">
        <div class="">
          <div class="w-1/2 px-3 ">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Name of the building
            </label>
            <input
              type="text"
              className="px-1 bg-gray"
              class="appearance-none block w-full bg-white-200 text-gray-700 border border-yellow-500 rounded py-2 px-4 mb-4 leading-tight focus:outline-none focus:bg-white"
              placeholder="Building name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Address
            </label>
            <input
              type="text"
              className="appearance-none block w-full bg-white-200 text-gray-700 border border-yellow-500 rounded py-2 px-4 mb-4 leading-tight focus:outline-none focus:bg-white"
              placeholder="Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            ></input>
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Description
            </label>
            <input
              type="text"
              className="px-1 bg-gray"
              class="appearance-none block w-full bg-white-200 text-gray-700 border border-yellow-500 rounded py-2 px-4 mb-4  leading-tight focus:outline-none focus:bg-white"
              placeholder="Describe your place"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></input>
            <button
              type="submit"
              class="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="w-52 rotate-12">
        <Places />
      </div>
    </div>
  );
};

export default NewPlaceForm;
