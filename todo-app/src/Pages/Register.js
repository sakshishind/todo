import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", {
        email,
        password
      });

      alert(res.data.message);
      navigate("/"); // go to login

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-amber-50 h-screen">
        
        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-xl shadow-lg">
          
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-stone-800">
            Sign Up
          </h2>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleRegister} className="space-y-6">

              <div>
                <label className="block text-sm font-medium text-stone-700">
                  Email address
                </label>

                <div className="mt-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="block w-full rounded-md bg-stone-200 px-3 py-2 text-stone-800 outline-none placeholder:text-stone-400 focus:ring-2 focus:ring-stone-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700">
                  Password
                </label>

                <div className="mt-2">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="block w-full rounded-md bg-stone-200 px-3 py-2 text-stone-800 outline-none placeholder:text-stone-400 focus:ring-2 focus:ring-stone-200"
                  />
                </div>
              </div>
 
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-stone-400 px-3 py-2 text-sm font-semibold text-white hover:bg-stone-500"
                >
                  Sign Up
                </button>
              </div>

            </form>

            <p className="mt-8 text-center text-sm text-stone-500">
              Already have an account?{" "}
              <a href="/" className="font-semibold text-stone-500 hover:text-stone-700">
                Sign In
              </a>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
