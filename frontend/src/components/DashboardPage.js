import React from "react";

export default function DashboardPage({ user }) {
  return (
<div class="flex w-full">
    <main className="flex-1 bg-[#F7F8FC] text-gray-800 p-10 rounded-l-3xl flex justify-center items-center">
    <div className="w-full max-w-2xl h-[85vh] rounded-2xl flex flex-col">
        <p className="text-3xl text-center font-semibold text-[#201537] mb-6">
            Welcome back, {user.displayName || "User"}!
            </p>
      </div>
      </main>
    </div>
  );
}
