import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      await axios
        .post("/api/auth/login", formData)
        .then((res) => {
          if(res.data.message){
            setLoading(false)
            // setError(false)
            navigate('/')
          }
          console.log(res.data.user)
        })
        .catch((error) => {
         console.log(error)
        });
    } catch (error) {
      console.log('Something went wrong')
    }
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
        <button  className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          Sign In
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have account yet?</p>
        <Link to={"/signup"}>
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-600 mt-3">{error && "Something went wrong"}</p>
    </div>
  );
};

export default SignIn;
