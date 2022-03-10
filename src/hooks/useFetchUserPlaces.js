import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

export function useFetchUserPlaces(path, uid) {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const queryRef = await query(
          collection(db, path),
          where("uid", "==", uid)
        );
        const docs = [];
        const querySnapshot = await getDocs(queryRef);
        querySnapshot.forEach((doc) => {
          docs.push({ docid: doc, doc: doc.data() });
        });
        setDocs(docs);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [path, uid]);

  return { docs, isLoading, error };
}
