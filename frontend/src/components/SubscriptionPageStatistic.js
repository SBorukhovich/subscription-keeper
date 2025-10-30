import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Fetch all subscriptions for a user
async function getData(userId) {
  const res = await fetch(`http://127.0.0.1:8000/subscriptions/${userId}`);
  if (!res.ok) throw new Error(`Failed to fetch subscriptions: ${res.status}`);
  const data = await res.json();
  return data; // array of subscription objects
}

// Calculate total from subscription data
function getTotal(subscriptions) {
  const sum = subscriptions.reduce((acc, sub) => acc + (Number(sub.price) || 0), 0);
  return Number(sum.toFixed(2));
}

export default function DashboardStatistic({ user }) {
  const [total, setTotal] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user?.uid) {
      setTotal(null);
      setData([]);
      return;
    }

    let ignore = false;

    (async () => {
      try {
        const subs = await getData(user.uid);
        if (ignore) return;

        // Map subscriptions to pie chart data
        const chartData = subs.map((sub) => ({
          name: sub.name,
          value: Number(sub.price) || 0,
          color: sub.color || "#9CA3AF",
        }));

        setData(chartData);
        setTotal(getTotal(subs));
      } catch (e) {
        console.error("Failed to fetch subscriptions:", e);
        if (!ignore) {
          setTotal(null);
          setData([]);
        }
      }
    })();

    return () => {
      ignore = true;
    };
  }, [user?.uid]);

  return (
    <div>
      <p className="text-2xl font-semibold text-black">
        Total</p>
      <p className="text-2xl font-bold text-gray-800 my-4">
        {total === null ? "Loading..." : `$${total}`}
      </p>
      <div className="w-full h-48">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
