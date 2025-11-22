import { useAuth } from "./components/AuthContext";
import LoginPage from "./components/LoginPage";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Subscriptions from "./components/SubscriptionsPage";
import Dashboard from "./components/DashboardPage";

function App() {
  const { user } = useAuth();
  
  if (!user) return <LoginPage />;
  
  return (
    <Router>
    <div header class=" ">
    <div className="pt-4 flex text-gray-100 rounded-3xl overflow-hidden mr-4 ">
     <SideBar displayName={user.displayName} email={user.email} photoURL={user.photoURL} />
        <Routes>
            <Route path="/" element={<Subscriptions />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
    </div>
  </div>
  </Router>
  );
}

export default App;
