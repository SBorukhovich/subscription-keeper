import React, { useState } from "react";
import SubscriptionList from "./components/SubscriptionList";
import AddSubscriptionForm from "./components/AddSubscriptionForm";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = () => {
    setRefresh(!refresh); // toggle refresh flag to reload list
    setShowModal(false); 
  };
  
  return (
    <div className="min-h-screen bg-[#201537] flex flex-col items-center py-10 px-4">
      {/* Header */}
      <h1 className="text-4xl font-bold text-[#bbf451] mb-8 text-center">
        Subscription Keeper
      </h1>

      {/* App Container */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        {/* Add Subscription Form */}
        

        {/* Subscription List */}
        <div>
          <h2 className="text-2xl font-semibold text-[#201537] m-4">
            My Subscriptions
          </h2>
          <SubscriptionList refresh={refresh} />
           <button
            onClick={() => setShowModal(true)}
            class="m-4 text-black bg-[#bbf451] hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text px-5 py-2.5"
          >+ Add</button>
        </div>
        </div>

      {/* Add Subscription Modal */}
      {showModal && (
        // 👇 FADE-IN BACKDROP
        <div
          class="fixed inset-0 bg-[rgba(0,0,0,0.54)] bg-opacity-25 flex justify-center items-center z-50 transition-opacity duration-300 ease-out opacity-100"
          onClick={() => setShowModal(false)}
        >
          {/* 👇 POPUP CONTAINER WITH SCALE/FADE ANIMATION */}
          <div
            class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative transform transition-all duration-300 ease-out scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              class="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              ×
            </button>

            <h2 class="text-2xl font-semibold text-purple-600 mb-4 text-center">
              New Subscription
            </h2>

            <AddSubscriptionForm onAdd={handleAdd} />
          </div>
      </div>
      )}
    </div>
  );
}

export default App;
