import React, { useEffect, useState } from "react";

function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/subscriptions")
      .then((res) => res.json())
      .then((data) => setSubscriptions(data))
      .catch((err) => console.error("Error fetching subscriptions:", err));
  }, []);

  return (
    <div>
      <ul>
        {subscriptions.map((sub) => (
          <li key={sub.id}>
            {sub.name} — ${sub.price} (Renews on {sub.renewal_date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubscriptionList;
