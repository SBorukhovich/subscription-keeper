import React, { useState } from "react";

function SubscriptionModal({ subscription, onClose, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
      ...subscription,
    });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
  };

  const handleSave = () => {
     onEdit({
      ...form,
      price: parseFloat(form.price),
    });
    setIsEditing(false);
  };
  

  if (!subscription) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.54)] flex justify-center items-center z-50 transition-opacity duration-300 ease-out opacity-100">
      
      <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative transform transition-all duration-300 ease-out scale-100 opacity-100"
>       
            <button
              onClick={onClose}
              class="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              ×
            </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {isEditing ? "Edit" : `${subscription.name}`}
        </h2>
        
        {/* EDIT MODE */}
        <div className="space-y-3">
          {isEditing ? (
            <>
              <label className="mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-400 border-dashed rounded-lg p-2"
              />
              <label className="mb-2">Renewal Date</label>
              <input
                type="date"
                name="renewal_date"
                value={form.renewal_date}
                onChange={handleChange}
                className="w-full border border-gray-400 border-dashed rounded-lg p-2"
              />
              <label className="mb-2">Price $</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-gray-400 border-dashed rounded-lg p-2"
              />
              
            <label class="text-sm mb-2 ">Notes</label>
              <textarea
                name="notes"
                value={form.notes || ""}
                onChange={handleChange}
                className="w-full border border-gray-400 border-dashed rounded-lg p-2"
              />
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Tag Color:</label>
                <input
                  type="color"
                  name="color"
                  value={form.color || "#9CA3AF"}
                  onChange={handleChange}
                  className="w-10 h-10 cursor-pointer"
                />
              </div>
            </>
          ) : (
            <>
              <p><strong>Renews on:</strong> {subscription.renewal_date}</p>
              <p><strong>Price:</strong> ${subscription.price}
                {!subscription.isMonthly && (
                  <span className="text-sm text-gray-500 ml-1">
                    (${(subscription.price / 12).toFixed(2)}/mo)
                  </span>
                )}
              </p>
              <p><strong>Renewal Type:</strong> {subscription.automatic_renewal ? "Automatic" : "Manual"}</p>
              <p><strong>Billing Cycle:</strong> {subscription.isMonthly ? "Monthly" : "Annual"}</p>
              {subscription.notes ? (
                <p className=""><strong className="text-red-500">Notes:</strong> {subscription.notes || "None"}</p>
              ) : null}
            </>
          )}
        </div>

        <div className="flex justify-between mt-6">
          {isEditing ? (
            <>
              <button
                onClick={() => onDelete(subscription.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubscriptionModal;
