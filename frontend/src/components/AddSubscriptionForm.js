import React, { useState } from "react";

function AddSubscriptionForm() {
  const [form, setForm] = useState({ name: "", price: "", renewal_date: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`Added: ${data.data.name}`);
        setForm({ name: "", price: "", renewal_date: "" });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        name="renewal_date"
        placeholder="Renewal Date (YYYY-MM-DD)"
        value={form.renewal_date}
        onChange={handleChange}
        required
        
      />
      <button type="submit">Add Subscription</button>
    </form>
  );
}

export default AddSubscriptionForm;
