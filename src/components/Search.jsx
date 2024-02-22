import React, { useContext, useState } from "react";
import { AVATAR_IMG } from "../utils/constants";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc, (db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      setErr(true);
    }
    setUser(null);
    setUsername("");
  };
  return (
    <div>
      <div className="p-1 m-1">
        <input
          className="rounded-lg px-1 bg-transparent border cursor-pointer text-gray-100"
          type="text"
          placeholder="find a user"
          value={username}
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div onClick={handleSelect} className="p-2 cursor-pointer flex">
          <img
            className="h-12 w-12 object-cover rounded-full"
            src={user.photoURL}
            alt="user"
          />
          <div>
            <span className="mx-2 text-white text-sm">{user.displayName}</span>
          </div>
        </div>
      )}
      <hr className="mb-2" />
    </div>
  );
};

export default Search;
