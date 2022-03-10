import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import useAxiosWithCallback from "../hooks/useAxiosWithCallback";

const Verify = () => {
  const [gstin, setGstin] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const { docid } = location.state;
  const { from } = location.state;
  const docRef = doc(db, "places", docid);

  const verifyHandler = (e) => {
    e.preventDefault();
    fetchData(
      {
        url: `http://sheet.gstincheck.co.in/check/41157293718b2eca0a8f317e6823767f/${gstin}`,
      },
      (data) => {
        console.log(data);
        if (data.flag) {
          updateDoc(docRef, { isVerified: true }).then(() => {
            navigate(from);
          });
        }
      }
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <form onSubmit={verifyHandler}>
      <label>GSTIN</label>
      <input
        value={gstin}
        onChange={(e) => {
          setGstin(e.target.value);
        }}
      />
      <button onClick={() => {}}>Verify</button>
    </form>
  );
};

export default Verify;
