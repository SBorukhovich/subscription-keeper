import React, { useState } from "react";
import SubscriptionList from "./components/SubscriptionList";
import AddSubscriptionForm from "./components/AddSubscriptionForm";
import { useAuth } from "./components/AuthContext";
import LoginPage from "./components/LoginPage";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import SideBar from "./components/SideBar";


function App() {
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = () => {
    setRefresh(!refresh); // toggle refresh flag to reload list
    setShowModal(false); 
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
  

  
  if (!user) return <LoginPage />;

  return (
    /* Header 2 */
    <div HEADER class=" ">
      <div class="py-2 ml-6 flex justify-between">
      <h2 className="text-2xl font-bold text-[#bbf451] ">
        Subscription Keeper
      </h2>
      <div class="  text-right">
        
      <button
         onClick={handleSignOut}
         className="text-white hover:bg-red-600 px-3 py-1 mr-4 rounded"
      >Sign Out
      </button>
      </div>
    </div>

    <div className="flex text-gray-100 rounded-3xl overflow-hidden mr-4">

     <SideBar displayName={user.displayName} email={user.email} />
        
      <main className="justify-items-center flex-1 bg-[#F7F8FC] text-gray-800 p-10 rounded-l-3xl">
        <div className="w-full max-w-2xl rounded-2xl ">

          {/* Subscription List */}
          <div>
            <h2 className="text-2xl font-semibold text-[#201537] m-4">
              My Subscriptions
            </h2>
            <SubscriptionList refresh={refresh} />
            <div class="flex flex-row-reverse">
            <button
              onClick={() => setShowModal(true)}
              class="m-4 text-black bg-[#bbf451] hover:bg-[#aae340] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text px-5 py-2.5"
            >+ Add</button>
          </div>
          </div>
        </div>
          
        {/* Add New Subsciption Window*/}
        {showModal && (
          <div
            class="fixed inset-0 bg-[rgba(0,0,0,0.54)] bg-opacity-25 flex justify-center items-center z-50 transition-opacity duration-300 ease-out opacity-100"
            onClick={() => setShowModal(false)}
          >
            <div
              class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative transform transition-all duration-300 ease-out scale-100 opacity-100"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              <button
                onClick={() => setShowModal(false)}
                class="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
              >
                ×
              </button>

              <h2 class="text-2xl font-semibold text-purple-600 mb-4 text-center">
                New Subscription
              </h2>

              <AddSubscriptionForm onAdd={handleAdd} />
            </div>
        </div>
        )}
      </main>
      {/* place for statistics */}
      <div className="bg-gray-100 w-full max-w-90 rounded-r-lg">

      </div>
    </div>
    
  </div>
  );
}

export default App;
