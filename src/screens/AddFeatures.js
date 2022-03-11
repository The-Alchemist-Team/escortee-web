import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";

const AddFeatures = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [features, setFeatures] = useState([]);
  const [selected, setSelected] = useState();
  const [coord, setCoord] = useState("");

  const { docid, from } = location.state;

  const features_list = [
    "Wheelchair",
    "Braille",
    "Tactiles",
    "Washroom",
    "Gluten Free Food",
    "Lifts",
    "Step Free",
    "Autism",
    "Parking",
    "Search",
    "Sign Language",
    "Special Needs",
    "Assistance",
    "Sign Board",
    "Eating Aids",
    "Elevator",
    "Large Print",
    "Intellectual",
    "Disability",
    "Wheelchair Ramp",
  ];

  const docRef = doc(db, "places", docid);
  useEffect(() => {
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        if (docSnap.data().features) {
          setFeatures(docSnap.data().features);
        }
      } else {
        alert("Error Fetching Features");
      }
    });
  }, []);

  const onNewFeatureAddHandler = (e) => {
    e.preventDefault();
    setFeatures((prev) => [...prev, { type: selected, coord: coord }]);
    setCoord("");
  };
  const onSaveHandler = (e) => {
    e.preventDefault();
    updateDoc(docRef, { features }).then(() => {
      navigate(from);
    });
  };
  return (
    <div className="flex flex-col flex-wrap h-60">
      <div className="flex flex-col justify-center items-center h-screen w-screen ">
        <form
          className="flex flex-col w-1/2 gap-2 p-3  rounded-lg "
          onSubmit={onNewFeatureAddHandler}
        >
          <select
            className="form-select appearance-none
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
            }}
          >
            {features_list.map((feature, index) => {
              return (
                <option key={feature} value={feature} selected={index === 0}>
                  {feature}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            placeholder="Google Plus Code"
            className="border-2 border-primary bg-red transition h-12 px-5 pr-16 rounded-md focus:outline-none w-full text-black text-lg "
            value={coord}
            onChange={(e) => {
              setCoord(e.target.value);
            }}
          />
          <button
            className="bg-yellow-400 px-7 py-5 rounded-lg shadow-lg  text-white"
            type="submit"
          >
            Add feature
          </button>
        </form>
        <div className="w-3/4 ">
          <div className="grid grid-cols-3 gap-4">
            {features.map((feature, index) => {
              return (
                <div className="relative block p-6 max-w-sm w-80 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {feature.type}
                  </h5>
                  <p class="font-normal text-gray-700 dark:text-gray-400">
                    {feature.coord}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 flex gap-5">
        <button
          className="bg-yellow-400 px-7 py-5 rounded-lg shadow-lg  text-white"
          onClick={() => {
            navigate(from);
          }}
        >
          Cancel
        </button>
        <button
          className="bg-yellow-400 px-7 py-5 rounded-lg shadow-lg  text-white"
          onClick={onSaveHandler}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddFeatures;
