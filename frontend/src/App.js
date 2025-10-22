import React from "react";
import SubscriptionList from "./components/SubscriptionList";
import AddSubscriptionForm from "./components/AddSubscriptionForm";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Subscription Keeper - Subscription Manager</h1>
      <AddSubscriptionForm />
      <SubscriptionList />
    </div>
  );
}

export default App;
