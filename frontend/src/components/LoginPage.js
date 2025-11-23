import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import SignupPage from "./SignUpPage";
import ForgotPassword from "./ForgotPassword";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white w-full rounded-lg p-2 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
            >
              {showPassword ? (
                // Eye slash icon (hide)
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                // Eye icon (show)
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          
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
