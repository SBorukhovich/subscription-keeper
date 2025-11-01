import { Link, useLocation } from "react-router-dom";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

export default function SideBar(user) {
  const location = useLocation();
  const path = location.pathname || "/";
  console.log("User object:", user);

  const isActive = (p) => {
    // treat "/" as subscriptions
    if (p === "/subscriptions" && (path === "/" || path === "/subscriptions")) return true;
    return path === p;
  };

  const activeClass = "text-xl font-semibold text-white";
  const inactiveClass = "text-xl font-medium text-gray-400 hover:text-white transition";

  return (
     <aside className=" w-1/6 mx-6 flex flex-col justify-between">
      <p>
        <h1 className="text-3xl font-bold text-[#bbf451] ">Subscription Keeper</h1>
      </p>
          <div className="pt-15 flex flex-col items-start space-y-3">
            {/* Profile image */}
            {user?.photoURL && (
              <div className="w-14 h-14 rounded-xl overflow-hidden mb-2">
                <img
                  src={user.photoURL}
                  alt="User profile"
                  className="w-14 h-14 rounded-xl object-cover"
                />
              </div>
            )}
            <div>
            {/* Display name */}
            {user?.displayName && (
              <h2 className="font-semibold text-lg">{user.displayName}</h2>
            )}

            {/* Email (always shown if available) */}
            {user?.email && (
              <p className="text-sm text-gray-400">{user.email}</p>
            )}
          </div>
          </div>
          <nav className="mt-16 flex flex-col space-y-4 text-gray-400">
          <Link to="/subscriptions" className={isActive("/subscriptions") ? activeClass : inactiveClass}>
            Subscriptions
          </Link>
          <Link to="/dashboard" className={isActive("/dashboard") ? activeClass : inactiveClass}>
            Dashboard
          </Link>
          
          </nav>
          <div className="h-full place-content-end items-center">
        <button 
         onClick={handleSignOut} 
          className="text-white hover:bg-red-600 p-1 rounded">
          Sign Out
        </button>
        </div> 
    
      </aside>
  );
}