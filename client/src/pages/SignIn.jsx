import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    await axios.post("/api/auth/login", formData)
    .then((res)=>{
      if(res.data.login){
        dispatch(signInSuccess(res.data.user))
        navigate('/')
      }
    })
    .catch((err)=>{
      console.log(err)
      dispatch(signInFailure(err.message))
    })
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          Sign In
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have account yet?</p>
        <Link to={"/signup"}>
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p  className="text-red-700 mt-3">{!error ? <p>{error}</p>:'Something went wrong!'}</p>
    </div>
  );
};

export default SignIn;
