import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className=" w-1/3 my-28 mx-auto text-center border-2 border-black bg-yellow-50 rounded-xl">
      <h1 className="text-lg font-semibold">Chat App</h1>
      <h5 className="text-lg">Log In</h5>
      <form onSubmit={handleSubmit} className="flex flex-col items-center my-4">
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

        <button className="w-64 py-1 my-4 rounded-lg bg-purple-500 cursor-pointer">
          Login
        </button>
        {err && <span>Error occured!</span>}
      </form>
      <p className="my-4">
        Don't have an account?
        <span className="font-medium italic">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </div>
  );
};

export default Login;
