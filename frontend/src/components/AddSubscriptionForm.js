import React, { useState } from "react";

function AddSubscriptionForm({onAdd}) {
  const [form, setForm] = useState({ name: "", price: "", renewal_date: "" });

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
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add subscription");
      }

      const newSub = await response.json();
      onAdd(newSub); // Update the list in parent
      setForm({ name: "", price: "", renewal_date: "" });
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
        class = "text-slate-600 h-10 mr-4 mb-4 pl-2 w-full bg-gray-100 text-sm rounded-md"
        name="renewal_date"
        placeholder="(YYYY-MM-DD)"
        value={form.renewal_date}
        onChange={handleChange}
        required
        
      />
      <button type="submit" class="p-0 mx-30 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
        Add</button>
    </div>
    </form>
  );
}

export default AddSubscriptionForm;
