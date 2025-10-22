import React from "react";
import SubscriptionList from "./components/SubscriptionList";
import AddSubscriptionForm from "./components/AddSubscriptionForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
        Subscription Keeper
      </h1>

      {/* App Container */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        {/* Add Subscription Form */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Add New Subscription
          </h2>
          <AddSubscriptionForm />
        </div>

        {/* Subscription List */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            My Subscriptions
          </h2>
          <SubscriptionList />
        </div>
      </div>
    </div>
  );
}

export default App;
