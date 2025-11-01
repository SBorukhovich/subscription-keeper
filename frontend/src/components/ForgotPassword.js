import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../firebase";
import LoginPage from "./LoginPage"; // adjust the path if needed

const ForgotPassword = () => {
  const auth = getAuth();
  const [resetEmail, setResetEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [goBackToLogin, setGoBackToLogin] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        setMessage("Password reset email sent! Check your inbox.");
      })
      .catch((error) => {
          console.error("Error sending reset email:", error);

        setError(error.message);
      });
  };

  if (goBackToLogin) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="my-10 text-center text-5xl font-bold tracking-tight text-[#bbf451]">
          Subscription <br /> Keeper
        </h2>
        <h2 className="text-2xl text-white font-bold text-center mb-4">
          Reset your password
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-2">{message}</p>}

        <form onSubmit={handleForgotPassword} className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="bg-white w-full border rounded-lg p-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Send Reset Email
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Remembered your password?{" "}
          <button
            onClick={() => setGoBackToLogin(true)}
            className="text-blue-400 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
