import React, { useEffect, useState } from "react";

function SubscriptionList({refresh}) {
  const [subscriptions, setSubscriptions] = useState([]);

 const fetchSubscriptions = async () => {
   try {
    const response = await fetch("http://127.0.0.1:8000/subscriptions");
    const data = await response.json();
    setSubscriptions(data);
  } catch (error) {
    console.error("Failed to fetch:", error);
  }
 }
  useEffect(() => {
    fetchSubscriptions();
  }, [refresh]); // re-fetch when new sub is added

return (
    <div className="space-y-3">
      <ul className="divide-y divide-gray-200">
        {subscriptions.map((sub) => (
          <li
            key={sub.id}
            className="bg-gray-50 m-4 hover:bg-gray-100 transition rounded-xl p-4 shadow-sm flex justify-between items-center"
          >
            <div class="flex items-center gap-3">
              
              {/* Color TAG */}
              <div
                class="w-10 h-10 rounded-full border border-gray-300"
                style={{ backgroundColor: sub.color || "#9CA3AF" }} // default gray
              ></div>

              <div class= "flex flex-col">
              <p className="text-lg font-medium text-gray-800">{sub.name}</p>
              <p className="text-sm text-gray-600">
                Renews on{" "}
                <span className="font-semibold text-gray-700">
                  {sub.renewal_date}
                </span>
              </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-semibold text-purple-600">
                ${sub.price}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubscriptionList;
