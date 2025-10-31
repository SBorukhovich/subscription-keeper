import React, { useState } from "react";
import SubscriptionList from "../components/SubscriptionList";
import AddSubscriptionForm from "../components/AddSubscriptionForm";
import SubscriptionPageStatistic from "./SubscriptionPageStatistic";
import { useAuth } from "./AuthContext";       

     
export default function SubscriptionsPage() {
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const currentDate = new Date();
  const currentMonthName = currentDate.toLocaleString('en-US', { month: 'long' });

  const handleAdd = () => {
    setRefresh(!refresh);
    setShowModal(false);
  };

  return (
    <div class="flex w-full">
    <main className="flex-1 bg-[#F7F8FC] text-gray-800 p-10 rounded-l-3xl flex justify-center items-center">
    <div className="w-full max-w-2xl h-[85vh] rounded-2xl flex flex-col">
      <div className="flex justify-between px-4 pt-4">
        <h2 className="text-2xl font-semibold text-[#201537]">
          My Subscriptions
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-black bg-[#bbf451] hover:bg-[#aae340] font-medium rounded-lg px-5 py-2.5"
        >
          + Add
        </button>
        
      </div>
      <p className="pl-4 text-left text-md text-gray-600 ">{currentMonthName + " " + currentDate.getFullYear()}</p>
    
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <SubscriptionList refresh={refresh} />
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.54)] flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold text-purple-600 mb-4 text-center">
              New Subscription
            </h2>
            <AddSubscriptionForm onAdd={handleAdd} />
          </div>
        </div>
        
      )}
      
         </div>
   
    </main>
    {/* place for statistics */}
    <div className="bg-gray-100 w-full max-w-90 rounded-r-3xl">
        <div className="p-14 text-center">
            <SubscriptionPageStatistic user={user} />
          </div>
      </div>
    </div>
  );
}
