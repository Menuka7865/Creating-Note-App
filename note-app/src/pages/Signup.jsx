import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../compnents/PasswordInput';
import { validateEmail } from '../utilis/helper';
import axiosInstance from '../utilis/axiosinstance';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
  
    setError("");
    setPasswordError("");
  
    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setPasswordError("Please enter the password");
      return;
    }
  
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name, // Changed from fullName to name
        email,
        password,
      });
  
      if (response.data?.error === false && response.data?.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setError(response.data?.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      const message = error.response?.data?.message || 
                     error.response?.data?.error?.message || 
                     "Signup failed. Please try again.";
      setError(message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl mb-7">Signup</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            {passwordError && (
              <p className="text-red-500 text-xs pb-1">{passwordError}</p>
            )}

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
