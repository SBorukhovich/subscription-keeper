import React, { useState } from "react";

function SubscriptionModal({ subscription, onClose, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(subscription, subscription.color);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
  };

  const handleSave = () => {
    onEdit(form);
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
          {isEditing ? "Edit" : "Subscription Details"}
        </h2>
        
        {/* EDIT MODE */}
        <div className="space-y-3">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-400 border-dashed rounded-lg p-2"
              />
              <input
                type="date"
                name="renewal_date"
                value={form.renewal_date}
                onChange={handleChange}
                className="w-full border border-gray-400 border-dashed  rounded-lg p-2"
              />
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-gray-400 border-dashed rounded-lg p-2"
              />
              <input
                type="color"
                name="color"
                value={form.color}
                defaultValue={"#9CA3AF"}
                onChange={handleChange}
                className=" w-10 h-10"
              />
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {subscription.name}</p>
              <p><strong>Renews on:</strong> {subscription.renewal_date}</p>
              <p><strong>Price:</strong> ${subscription.price}</p>
            </>
          )}
        </div>

        <div className="flex justify-between mt-6">
          {isEditing ? (
              <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Save
            </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>

            <button
                onClick={() => onDelete(subscription.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>

            </>
            
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Edit
            </button>
          )
          }
          

          

          
        </div>
      </div>
    </div>
  );
}

export default SubscriptionModal;
