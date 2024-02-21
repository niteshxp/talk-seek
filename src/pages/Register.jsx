import React, { useState } from "react";
import addIMG from "../assets/add.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, "images/rivers.jpg");
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.id), {});
            navigate("/");
          });
        }
      );
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className=" w-1/3 my-28 mx-auto text-center border-2 border-black bg-yellow-50 rounded-xl">
      <h1 className="text-lg font-semibold">Chat App</h1>
      <h5 className="text-lg">SignUp</h5>
      <form onSubmit={handleSubmit} className="flex flex-col items-center my-4">
        <input
          className="bg-gray-200 cursor-pointer py-1 px-8 my-2 font-medium rounded-lg"
          type="text"
          placeholder="Enter Your Name"
        />
        <input
          className="bg-gray-200 cursor-pointer py-1 px-8 my-2 font-medium rounded-lg"
          type="email"
          placeholder="Enter Your Email"
        />
        <input
          className="bg-gray-200 cursor-pointer py-1 px-8 my-2 font-medium rounded-lg"
          type="password"
          placeholder="Enter Your Password"
        />
        <input className="w-64 my-2 hidden" type="file" id="avatar" />
        <label
          className="w-64 my-2 flex justify-evenly items-center"
          htmlFor="avatar"
        >
          <img className="w-8 cursor-pointer" src={addIMG} alt="avatar" />{" "}
          <span className="cursor-pointer">Add Profile Photo</span>
        </label>
        <button className="w-64 py-1 my-4 rounded-lg bg-purple-500 cursor-pointer">
          Sign Up
        </button>
        {err && <span>Error occured!</span>}
      </form>
      <p className="my-4">
        Already have an account?
        <span className="font-medium italic">
          {" "}
          <Link to="/login">Login</Link>
        </span>
      </p>
    </div>
  );
};

export default Register;
