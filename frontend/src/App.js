import React, { useState } from "react";
import SubscriptionList from "./components/SubscriptionList";
import AddSubscriptionForm from "./components/AddSubscriptionForm";
import { useAuth } from "./components/AuthContext";
import LoginPage from "./components/LoginPage";
import SideBar from "./components/SideBar";
import SubscriptionPageStatistic from "./components/SubscriptionPageStatistic";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Subscriptions from "./components/SubscriptionsPage";
import Dashboard from "./components/DashboardPage";

function App() {
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = () => {
    setRefresh(!refresh); // toggle refresh flag to reload list
    setShowModal(false); 
  };
  
  if (!user) return <LoginPage />;


  return (
    <Router>
    <div header class=" ">
      {/* <div class="py-2 ml-6 flex justify-between">
      <h2 className="text-2xl font-bold text-[#bbf451] ">
        Subscription Keeper
      </h2>
      <div class="  text-right">
        

      </div>
    </div> */}

    <div className="pt-4 flex text-gray-100 rounded-3xl overflow-hidden mr-4 ">

     <SideBar displayName={user.displayName} email={user.email} photoURL={user.photoURL} />
      
      
        
        <Routes>
            <Route path="/" element={<Subscriptions />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
    
    </div>
    
  </div>
  </Router>
  );
}

export default App;
