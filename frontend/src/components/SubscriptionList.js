import React, { useEffect, useState } from "react";
import SubscriptionDetails from "./SubscriptionDetails";
import { useAuth } from "./AuthContext";


function SubscriptionList({refresh}) {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);

  // Check if renewal date has passed
  const isOverdue = (dateString) => {
    const renewDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    renewDate.setHours(0, 0, 0, 0);
    return renewDate < today;
  };

  // Auto-renew subscription if automatic and overdue
  const checkRenewalDate = async (sub) => {
    if (!sub.automatic_renewal || !isOverdue(sub.renewal_date)) {
      return sub; // no change needed
    }

    // Calculate next renewal date
    const currentDate = new Date(sub.renewal_date);
    let nextDate;

    if (sub.isMonthly) {
      // Add 1 month
      nextDate = new Date(currentDate);
      nextDate.setMonth(nextDate.getMonth() + 1);
    } else {
      // Annual: add 1 year
      nextDate = new Date(currentDate);
      nextDate.setFullYear(nextDate.getFullYear() + 1);
    }

    // Format as YYYY-MM-DD for backend
    const nextDateString = nextDate.toISOString().split('T')[0];

    try {
      // Update subscription with new renewal date
      const response = await fetch(`http://127.0.0.1:8000/subscriptions/${sub.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...sub,
          renewal_date: nextDateString,
        }),
      });

      if (!response.ok) {
        console.error(`Failed to auto-renew subscription ${sub.id}`);
        return sub;
      }

      const updated = await response.json();
      console.log(`Auto-renewed ${sub.name} to ${nextDateString}`);
      return updated;
    } catch (error) {
      console.error("Error auto-renewing subscription:", error);
      return sub;
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/subscriptions/${user.uid}`);
      const data = await response.json();

      // Check and auto-renew overdue automatic subscriptions
      const renewedData = await Promise.all(
        data.map(sub => checkRenewalDate(sub))
      );

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Overdue subscriptions appear first, then sort by closest upcoming renewal_date
      const sorted = renewedData.sort((a, b) => {
        const dateA = new Date(a.renewal_date);
        const dateB = new Date(b.renewal_date);
        dateA.setHours(0, 0, 0, 0);
        dateB.setHours(0, 0, 0, 0);

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
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [refresh]); // re-fetch when new sub is added

  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/subscriptions/delete/${id}?user_id=${user.uid}`, {method: "DELETE",});
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
    } else if (diffDays <= 5 && diffDays > 1) {
      return (
        <span className="ml-4 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
          {` ${diffDays} days` }
        </span>
      );
    } else if (diffDays <= 1) {
      return (
        <span className="ml-4 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
          {"1 day"}
        </span>
      );
    }
  };

  return (
    <div className="space-y-3">
      <ul className="divide-y divide-gray-200">
        {subscriptions.map((sub) => (
          <li
            key={sub.id}
            onClick={() => setSelectedSub(sub)}
            className="bg-gray-50 my-4 hover:bg-gray-100 transition rounded-xl p-4 shadow-sm flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              {/* Color TAG */}
              <div
                className="w-9 h-9 rounded-full"
                style={{ backgroundColor: sub.color || "#9CA3AF" }} // default gray
              ></div>

              <div className="flex flex-col">
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
        <SubscriptionDetails
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
