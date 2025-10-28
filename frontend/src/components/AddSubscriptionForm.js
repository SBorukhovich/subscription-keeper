import React, { useState } from "react";
import { useAuth } from "./AuthContext";


function AddSubscriptionForm({onAdd}) {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", price: "", renewal_date: "", color: "#9CA3AF", isMonthly: "true", automatic_renewal: "true", notes: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: parseFloat(form.price),
          renewal_date: form.renewal_date,
          color: form.color,
          user_id: user.uid,
          isMonthly: form.isMonthly === "true",
          automatic_renewal: form.automatic_renewal === "true",
          notes: form.notes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add subscription");
      }

      const newSub = await response.json();
      onAdd(newSub); // Update the list in parent
      setForm({ name: "", price: "", renewal_date: "", color:"", isMonthly: "true", automatic_renewal: "true", notes: "" }); 
    } catch (error) {
      console.error(error);
      alert("Error adding subscription.");
    }

  };
  

  return (
    <form  onSubmit={handleSubmit}>
      <div class="flex flex-col x-4">
      <label class="mb-2 ">Name</label>
      <input
        class = "text-slate-600 bg-gray-100 w-full h-10 pl-2 mr-4 mb-4  text-sm rounded-md"
        name="name"
        placeholder="Amazon"
        value={form.name}
        onChange={handleChange}
        required
      />
      <label class="mb-2 ">Price</label>
      <input
        class = "text-slate-600 h-10 mr-4 mb-4 pl-2 bg-gray-100 w-full text-sm rounded-md" 
        name="price"
        placeholder="14.99"
        value={form.price}
        onChange={handleChange}
        required
      />
      <label class="mb-2 ">Renewal Date</label>
      <input
        class="text-slate-600 h-10 mr-4 mb-4 px-2 bg-gray-100 w-full text-sm rounded-md"        
        type="date"
        name="renewal_date"
        value={form.renewal_date}
        onChange={handleChange}
        required
      />
      {/* Renewal Type */}
        <fieldset className="mb-4">
          <legend className="text-sm text-gray-700 mb-2">Renewal Type</legend>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="automatic_renewal"
                value="true"
                checked={form.automatic_renewal === "true"}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span className="text-sm text-gray-700">Automatic</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="automatic_renewal"
                value="false"
                checked={form.automatic_renewal === "false"}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span className="text-sm text-gray-700">Manual</span>
            </label>
          </div>
        </fieldset> 

        {/* Billing Cycle */}
        <fieldset className="mb-4">
          <legend className="text-sm text-gray-700 mb-2">Billing Cycle</legend>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="isMonthly"
                value="true"
                checked={form.isMonthly === "true"}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span className="text-sm text-gray-700">Monthly</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="isMonthly"
                value="false"
                checked={form.isMonthly === "false"}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span className="text-sm text-gray-700">Annual</span>
            </label>
          </div>
        </fieldset>
        <label class="mb-2 ">Notes</label>
        <textarea
          class="text-slate-600 bg-gray-100 w-full h-20 pl-2 mr-4 mb-4 text-sm rounded-md"
          name="notes"
          value={form.notes}
          onChange={handleChange}
      />
       {/*  Color Picker */}
      <div class="mb-4 flex items-center gap-2">
        <label class="text-sm text-gray-700">Tag Color:</label>
        <input
          type="color"
          name="color"
          value={form.color}
          onChange={handleChange}
          class="w-10 h-10  cursor-pointer "
        />
      </div>
      <button type="submit" class="p-0 mx-30 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
        Add</button>
    </div>
    </form>
  );
}

export default AddSubscriptionForm;
