import React, { useEffect, useState } from "react";
import SubscriptionPage from "./SubscriptionPage";
import { useAuth } from "./AuthContext";


function SubscriptionList({refresh}) {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);


 const fetchSubscriptions = async () => {
   try {
    const response = await fetch(`http://127.0.0.1:8000/subscriptions/${user.uid}`);
    const data = await response.json();
    const today = new Date();

    // Overdue subscriptions appear first
    // Then sort by closest upcoming renewal_date
    const sorted = data.sort((a, b) => {
      const dateA = new Date(a.renewal_date);
      const dateB = new Date(b.renewal_date);

      const isOverdueA = dateA < today;
      const isOverdueB = dateB < today;

      if (isOverdueA && !isOverdueB) return -1; // a overdue → goes first
      if (!isOverdueA && isOverdueB) return 1;  // b overdue → goes first

      return dateA - dateB;
    });

    setSubscriptions(sorted);
  } catch (error) {
    console.error("Failed to fetch:", error);
  }
 }
  useEffect(() => {
    fetchSubscriptions();
  }, [refresh]); // re-fetch when new sub is added

  const handleDelete = async (id) => {
  await fetch(`http://127.0.0.1:8000/subscriptions/delete/${id}?user_id=${user.uid}`, {method: "DELETE",})
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
  
 const getBadge = (renewalDate) => {
    const today = new Date();
    const renewDate = new Date(renewalDate);
    const diffDays = Math.ceil((renewDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return (
        <span className="ml-4 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          Overdue
        </span>
      );
    } else if (diffDays <= 5) {
      return (
        <span className="ml-4 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
          Soon
        </span>
      );
    }
    return null;
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
              {getBadge(sub.renewal_date)}
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
