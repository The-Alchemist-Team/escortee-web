import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS } from "./constants";

export const loginUser = (dispatch, payload) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: AUTH_REQUEST });
    const { email, password } = payload;
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        dispatch({ type: AUTH_SUCCESS, payload: user });
        resolve(user);
      })
      .catch((error) => {
        dispatch({ type: AUTH_FAILURE, payload: error });
        reject(error);
      });
  });
};

export const registerUser = (dispatch, payload) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: AUTH_REQUEST });
    const { email, password, name } = payload;
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        await addDoc(collection(db, "users"), {
          name,
          uid: user.user.uid,
        });

        dispatch({ type: AUTH_SUCCESS, payload: user });
        resolve(user);
      })
      .catch((error) => {
        dispatch({ type: AUTH_FAILURE, payload: error });
        reject(error);
      });
  });
};

export const googleLogin = (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: AUTH_REQUEST });
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        dispatch({ type: AUTH_REQUEST });
        GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        dispatch({ type: AUTH_SUCCESS, payload: user });
        resolve(user);
        user &&
          (await addDoc(collection(db, "users"), {
            name: user.displayName,
            uid: user.uid,
          }));
      })
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        dispatch({ type: AUTH_FAILURE, payload: error });
        reject(error);
      });
  });
};

export const facebookLogin = (dispatch) => {
  return new Promise((resolve, reject) => {});
};
