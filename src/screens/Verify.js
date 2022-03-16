import { doc, updateDoc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../common/icon/Loading";
import { db } from "../config/firebase";
import useAxiosWithCallback from "../hooks/useAxiosWithCallback";

const Verify = () => {
  const [gstin, setGstin] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [docDataState, setDocDataState] = useState();
  const { isLoading, error, fetchData } = useAxiosWithCallback();
  const { docid } = location.state;
  const { from } = location.state;
  const docRef = doc(db, "places", docid);
  useEffect(() => {
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setDocDataState(docSnap.data());
      } else {
        console.log("No such document!");
      }
    });
  }, []);

  if (!docDataState) {
    return <Loading />;
  }

  console.log(docDataState);

  const verifyHandler = (e) => {
    e.preventDefault();
    setTimeout(() => {
      updateDoc(docRef, { isVerified: true }).then(() => {
        navigate(from);
        alert("Verified");
      });
    }, 3000);
    // fetchData(
    //   {
    //     url: `http://sheet.gstincheck.co.in/check/ab8572bfc22f79bf03fa888348e94138/${gstin}`,
    //   },
    //   (data) => {
    //     console.log(data);
    //     if (data.flag) {

    //     }
    //   }
    // );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <form onSubmit={verifyHandler}>
      <div className="flex flex-col items-center justify-center  w-full gap-10">
        <div className="w-1/2 text-center h-96 flex flex-col justify-center gap-5">
          <label className="font-bold text-xl">Verify your place</label>
          <input
            className="border-2 border-primary bg-red transition h-12 px-5 pr-16 rounded-md focus:outline-none w-full text-black text-lg "
            type="text"
            value={gstin}
            onChange={(e) => {
              setGstin(e.target.value);
            }}
            placeholder="GSTIN Number"
          />
        </div>
      </div>
      <button
        className="absolute bottom-10 right-10 bg-yellow-400 px-7 py-5 rounded-lg shadow-lg  text-white"
        type="submit"
      >
        Verify
      </button>
    </form>
  );
};

export default Verify;
