import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import SignupPage from "./SignUpPage";
import ForgotPassword from "./ForgotPassword";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message);
    }
  };

   if (isSignup) {
    return <SignupPage onSwitchToLogin={() => setIsSignup(false)} />;
  }
    if (forgotPassword) {
    return <ForgotPassword onSwitchToLogin={() => forgotPassword(false)} />;
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
        <div class=" sm:mx-auto sm:w-full sm:max-w-sm">       
         <h2 class="my-10 text-center text-5xl font-bold tracking-tight text-[#bbf451]">
          Subscription <br></br> Keeper
          </h2>
          
        <h2 className="text-2xl text-white font-bold text-center mb-4">Login to continue</h2>
        
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white w-full bg-border border-cyan-400 rounded-lg p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white w-full rounded-lg p-2"
            required
          />
          
          <button
            type="submit"
            className="bg-indigo-500  hover:bg-indigo-400 w-full  text-white py-2 rounded-lg 0"
          >
            Login
          </button>
        </form>
         <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm mb-6">or</p>
          <button
            onClick={handleGoogleSignIn}
            className="my-2 border-white border text-white flex items-center justify-center w-full rounded-lg py-2 hover:bg-gray-500 transition"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2 "
            />
            <span className=" font-medium">Sign in with Google</span>
          </button>
           <button
           onClick={() => setIsSignup(true)}
            className="border-white border flex items-center justify-center w-full rounded-lg py-2 hover:bg-gray-500 transition"
          >
            <span className=" text-white ">Sign Up</span>
          </button>
          </div>
        <p class="mt-2 text-center text-sm text-indigo-400 hover:text-indigo-300 " onClick={() => setForgotPassword(true)}>Forgot password?</p>
        
      </div>
    </div>
  );
}

export default LoginPage;
