import React, { useEffect, useState } from "react";

function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/subscriptions")
      .then((res) => res.json())
      .then((data) => setSubscriptions(data))
      .catch((err) => console.error("Error fetching subscriptions:", err));
  }, []);

//   return (
//     <div>
//       <ul>
//         {subscriptions.map((sub) => (
//           <li key={sub.id}>
//             {sub.name} — ${sub.price} (Renews on {sub.renewal_date})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
return (
    <div className="space-y-3">
      <ul className="divide-y divide-gray-200">
        {subscriptions.map((sub) => (
          <li
            key={sub.id}
            className="bg-gray-50 m-4 hover:bg-gray-100 transition rounded-xl p-4 shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-medium text-gray-800">{sub.name}</p>
              <p className="text-sm text-gray-600">
                Renews on{" "}
                <span className="font-semibold text-gray-700">
                  {sub.renewal_date}
                </span>
              </p>
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
