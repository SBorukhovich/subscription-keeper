import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const API_URL = process.env.REACT_APP_API_URL 

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    monthlyCount: 0,
    annualCount: 0,
    totalYearlySpending: 0,
    totalMonthlySpending: 0, 
    mostExpensive: null,
    leastExpensive: null,
    overdueSubscriptions: [],
    nextToExpire: null,
  });

  useEffect(() => {
    if (!user?.uid) {
      setStats({
        monthlyCount: 0,
        annualCount: 0,
        totalYearlySpending: 0,
        totalMonthlySpending: 0,
        mostExpensive: null,
        leastExpensive: null,
        overdueSubscriptions: [],
        nextToExpire: null,
      });
      return;
    }

    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`${API_URL}/subscriptions/${user.uid}`);
        const data = await response.json();

        if (data.length === 0) {
          setStats({
            monthlyCount: 0,
            annualCount: 0,
            totalYearlySpending: 0,
            totalMonthlySpending: 0,
            mostExpensive: null,
            leastExpensive: null,
            overdueSubscriptions: [],
            nextToExpire: null,
          });
          return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Count monthly and annual subscriptions
        const monthlyCount = data.filter(sub => sub.isMonthly === true).length;
        const annualCount = data.filter(sub => sub.isMonthly === false).length;

        // Calculate total yearly spending
        const totalYearlySpending = data.reduce((total, sub) => {
          const price = Number(sub.price) || 0;
          // Convert monthly to yearly (monthly * 12), annual stays as is
          return total + (sub.isMonthly ? price * 12 : price);
        }, 0);

        // Calculate total monthly spending
        const totalMonthlySpending = data.reduce((total, sub) => {
          const price = Number(sub.price) || 0;
          // Monthly stays as is, convert annual to monthly (annual / 12)
          return total + (sub.isMonthly ? price : price / 12);
        }, 0);

        // Find most and least expensive subscriptions
        const validPriceSubs = data.filter(sub => Number(sub.price) > 0);
        let mostExpensive = null;
        let leastExpensive = null;

        if (validPriceSubs.length > 0) {
          const normalized = validPriceSubs.map(sub => {
            // Convert annual price to monthly equivalent
            const monthlyEquivalent = sub.isMonthly ? Number(sub.price) : Number(sub.price) / 12;
            return { ...sub, monthlyEquivalent };
          });

          mostExpensive = normalized.reduce((max, sub) => 
            sub.monthlyEquivalent > max.monthlyEquivalent ? sub : max
          );

          leastExpensive = normalized.reduce((min, sub) => 
            sub.monthlyEquivalent < min.monthlyEquivalent ? sub : min
          );
        }

        // Find overdue subscriptions
        const overdueSubscriptions = data.filter(sub => {
          const renewDate = new Date(sub.renewal_date);
          renewDate.setHours(0, 0, 0, 0);
          return renewDate < today;
        });

        // Find next subscription to expire
        const futureSubscriptions = data.filter(sub => {
          const renewDate = new Date(sub.renewal_date);
          renewDate.setHours(0, 0, 0, 0);
          return renewDate >= today;
        });

        let nextToExpire = null;
        if (futureSubscriptions.length > 0) {
          nextToExpire = futureSubscriptions.reduce((closest, sub) => {
            const subDate = new Date(sub.renewal_date);
            const closestDate = new Date(closest.renewal_date);
            return subDate < closestDate ? sub : closest;
          });
        }

        setStats({
          monthlyCount,
          annualCount,
          totalYearlySpending: Number(totalYearlySpending.toFixed(2)),
          totalMonthlySpending: Number(totalMonthlySpending.toFixed(2)), // Add this calculation
          mostExpensive,
          leastExpensive,
          overdueSubscriptions,
          nextToExpire,
        });

      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
        setStats({
          monthlyCount: 0,
          annualCount: 0,
          totalYearlySpending: 0,
          totalMonthlySpending: 0,
          mostExpensive: null,
          leastExpensive: null,
          overdueSubscriptions: [],
          nextToExpire: null,
        });
      }
    };

    fetchSubscriptions();
  }, [user?.uid]);

  return (
    <div className="flex flex-col w-full bg-[#F7F8FC] rounded-3xl items-center">
      <main className="text-gray-800 p-10 w-full">
        <div className="h-[85vh]">
          <div className="flex flex-col">
            <p className="text-3xl text-center font-semibold text-[#201537] mb-6">
              Statistics Dashboard
            </p>
          </div>
          <div className="text-black grid grid-cols-4 grid-rows-2 gap-4 w-full h-4/5">

          {/* Total Yearly Spending */}
            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
              <div className="text-md text-gray-600 text-center">Total Yearly Spending</div>
              <div className="pt-10 text-3xl font-bold text-[#201537] mb-2">${stats.totalYearlySpending}</div>
            </div>

          {/* Total Monthly Spending */}
            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
              <div className="text-md text-gray-600 text-center">Total Monthly Spending</div>
              <div className="pt-10 text-3xl font-bold text-[#201537] mb-2">${stats.totalMonthlySpending}</div>
            </div>

            {/* Monthly Subscriptions */}
            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
              <div className="text-md text-gray-600 text-center">Monthly Subscriptions</div>
              <div className="pt-10 text-3xl font-bold text-[#201537] mb-2">{stats.monthlyCount}</div>
            </div>

            {/* Annual Subscriptions */}
            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
              <div className="text-md text-gray-600 text-center">Annual Subscriptions</div>
              <div className="pt-10 text-3xl font-bold text-[#201537] mb-2">{stats.annualCount}</div>
            </div>

            
            {/* Most Expensive */}
            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
              <div className="text-md text-gray-600 text-center mb-2">Most Expensive Per Month</div>
              
              <div className="text-lg pt-10 font-bold text-[#201537] text-center">
                {stats.mostExpensive ? stats.mostExpensive.name : "N/A"}
              </div>
              {stats.mostExpensive && (
                <div className="text-sm text-gray-500">${stats.mostExpensive.price}</div>
              )}
            </div>
  
            {/* Least Expensive */}
            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center ">
              <div className="text-md text-gray-600 text-center mb-2">Least Expensive Per Month</div>
              <div className="text-lg pt-10 font-bold text-[#201537] text-center">
                {stats.leastExpensive ? stats.leastExpensive.name : "N/A"}
              </div>
              {stats.leastExpensive && (
                <div className="text-sm text-gray-500">${stats.leastExpensive.price}</div>
              )}
            </div>

            {/* Next to Expire */}
            <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
              <div className="text-md text-gray-600 text-center mb-2">Next to Expire</div>
              <div className="text-lg pt-10 font-bold text-[#201537] text-center">
                {stats.nextToExpire ? stats.nextToExpire.name : "N/A"}
              </div>
              {stats.nextToExpire && (
                <div className="text-sm text-gray-500">{stats.nextToExpire.renewal_date}</div>
              )}
            </div>

            {/* Overdue Subscriptions */}
            <div className="bg-white p-4 rounded-lg shadow flex flex-col">
              <div className="text-md text-gray-600 text-center mb-2">Overdue Subscriptions</div>
              <div className="flex-1 overflow-y-auto">
                {stats.overdueSubscriptions.length > 0 ? (
                  <div className="space-y-1">
                    {stats.overdueSubscriptions.map((sub, index) => (
                      <div key={index} className="text-3xl pt-10 font-bold text-red-600 text-center">
                        {sub.name}
                        <div className="text-sm ">{sub.renewal_date}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-lg pt-10 font-bold text-[#201537] text-center">N/A</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}