import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../compnents/PasswordInput';
import { validateEmail } from '../utilis/helper';
import axiosInstance from '../utilis/axiosinstance';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate(); // ✅ Get the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setServerError("");

    let hasError = false;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Please enter a valid password.");
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);

        // ✅ Use navigate here
        navigate("/");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      setServerError(message);
    }
  };

  return (
    <div className='flex items-center justify-center mt-28'>
      <div className='w-96 border rounded bg-white px-7 py-10'>
        <form onSubmit={handleLogin}>
          <h4 className='text-2xl mb-7'>Login</h4>

          <input
            type="text"
            placeholder='Email'
            className='input-box'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className='text-red-500 text-xs pb-1'>{emailError}</p>}

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className='text-red-500 text-xs pb-1'>{passwordError}</p>}
          {serverError && <p className='text-red-500 text-xs pb-1'>{serverError}</p>}

          <button type='submit' className='btn-primary'>Login</button>

          <p className='text-sm text-center mt-4'>
            Not registered yet?{" "}
            <Link to='/signup' className='font-medium text-primary underline'>Create an Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
