import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";

const AddFeatures = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { docid, from } = location.state;
  const docRef = doc(db, "places", docid);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [coord, setCoord] = useState("");
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

  const [features, setFeatures] = useState([]);

  const onNewFeatureAddHandler = (e) => {
    e.preventDefault();
    setFeatures((prev) => [...prev, { type: selected, coord: coord }]);
    setCoord("");
    setSelected(null);
    setShowForm(false);
  };
  const onSaveHandler = (e) => {
    e.preventDefault();
    updateDoc(docRef, { features }).then(() => {
      navigate(from);
    });
  };
  return (
    <div className="flex flex-col flex-wrap h-60">
      <button
        onClick={() => {
          setShowForm((prev) => true);
        }}
      >
        Add New Feature
      </button>
      <h1>Added Features</h1>
      {features.map((feature, index) => {
        return (
          <div key={index}>
            <div className="flex justify-between">
              <p>{feature.type}</p>
              <p>{feature.coord}</p>
            </div>
            <hr />
          </div>
        );
      })}

      {showForm && (
        <form onSubmit={onNewFeatureAddHandler}>
          <select
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
            }}
          >
            {features_list.map((feature) => {
              return (
                <option key={feature} value={feature}>
                  {feature}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            value={coord}
            onChange={(e) => {
              setCoord(e.target.value);
            }}
          />
          <button type="submit">Add</button>
        </form>
      )}
      <button onClick={onSaveHandler}>Save</button>
    </div>
  );
};

export default AddFeatures;
