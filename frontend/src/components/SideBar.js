import { Routes, Route, Link } from "react-router-dom";
import Subscriptions from "./SubscriptionsPage";
import Dashboard from "./DashboardPage";

export default function SideBar(user) {
  return (
     <aside className=" w-1/6 mx-6 flex flex-col justify-between">
      <p>
        <h1 className="text-3xl font-bold text-[#bbf451] ">Subscription Keeper</h1>
      </p>
          <div className="pt-15 flex flex-col items-start space-y-3 ">
            <div className="w-14 h-14 bg-white rounded-xl mb-2" />
            <div>
             <h2 className="font-semibold text-lg">{user.displayName || "User"}</h2>
              <p className="text-sm text-gray-400">{user.email|| "email"}</p>
            </div>
          </div>

          <nav className="mt-16 flex flex-col space-y-4 text-gray-400">
            <p className="text-xl font-medium hover:text-white transition">Dashboard</p>
            <p className="text-xl font-semibold text-white">Subscriptions</p>
          </nav>
          <div class=" h-full place-content-end items-center">
          <button
         
         className="text-white hover:bg-red-600 p-1 rounded"
         >Sign Out
        </button>
        </div> 
    
      </aside>
  );
}