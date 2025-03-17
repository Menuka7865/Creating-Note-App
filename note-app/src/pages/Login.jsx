import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordInput from '../compnents/PasswordInput';
import { validateEmail } from '../utilis/helper';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Please enter a valid password.");
      hasError = true;
    }

    if (!hasError) {
      console.log("Logging in with", email, password);
    }
  };

  return (
    <>
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

            <button type='submit' className='btn-primary'>Login</button>
            
            <p className='text-sm text-center mt-4'>
              Not registered yet?{" "}
              <Link to='/signup' className='font-medium text-primary underline'>Create an Account</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
