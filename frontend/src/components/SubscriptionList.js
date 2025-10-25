import React, { useEffect, useState } from "react";
import SubscriptionPage from "./SubscriptionPage";


function SubscriptionList({refresh}) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);


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

  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/subscriptions/delete/${id}`, { method: "DELETE" });
    setSelectedSub(null);
    fetchSubscriptions();
  };

  const handleEdit = async (updatedSub) => {
    await fetch(`http://127.0.0.1:8000/subscriptions/${updatedSub.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSub),
    });
    setSelectedSub(null);
    fetchSubscriptions();
  };

return (
    <div className="space-y-3">
      <ul className="divide-y divide-gray-200">
        {subscriptions.map((sub) => (
          <li
            key={sub.id}
            onClick={() => setSelectedSub(sub)}
            className="bg-gray-50 m-4 hover:bg-gray-100 transition rounded-xl p-4 shadow-sm flex justify-between items-center"
          >
            <div class="flex items-center gap-3">
              
              {/* Color TAG */}
              <div
                class="w-9 h-9 rounded-full "
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
              <p className="text-lg font-semibold text-gray-700">
                ${sub.price}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {selectedSub && (
        <SubscriptionPage
          subscription={selectedSub}
          onClose={() => setSelectedSub(null)}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default SubscriptionList;
