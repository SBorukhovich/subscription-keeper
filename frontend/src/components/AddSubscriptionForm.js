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
      <div class="flex flex-col items-center px-4">
      <input
        class = "h-10 pl-4 mr-4 mb-4 outline-lime-200 outline-solid outline-2 rounded-md"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        class = "h-10 pl-4 mr-4 mb-4 outline-lime-200 outline-solid outline-2 rounded-md" 
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        class = "h-10 pl-4 mr-4 mb-4 outline-lime-200 outline-solid outline-2 rounded-md"
        name="renewal_date"
        placeholder="(YYYY-MM-DD)"
        value={form.renewal_date}
        onChange={handleChange}
        required
        
      />
      <button type="submit" class="mx-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add</button>
    </div>
    </form>
  );
}

export default AddSubscriptionForm;
