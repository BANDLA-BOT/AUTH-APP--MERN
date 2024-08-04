import axios from "axios";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const SignUp = () => {
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
        .post("/api/auth/signup", formData)
        .then((res) => {
          console.log(res.data.message);
          setLoading(false)
          setError(false)
          console.log(res.data)
          navigate('/signin')
        })
        .catch((error) => {
         console.log(error.data)
        });
    } catch (error) {
      setLoading(true)
      setError(true)
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
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
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          {
            loading ? 'Loading...' : 'Sign Up'
        }
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account already ?</p>
        <Link to={"/signin"}>
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className="text-red-600 mt-3">{error && "Something went wrong"}</p>
    </div>
  );
};

export default SignUp;
