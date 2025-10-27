
export default function SideBar(user) {
  return (
     <aside className=" w-1/6 mx-6 flex flex-col justify-between">
        <div>
          <div className="pt-15 flex flex-col items-start space-y-3 ">
            <div className="w-14 h-14 bg-white rounded-xl mb-2" />
            <div>
             <h2 className="font-semibold text-lg">{user.displayName || "User"}</h2>
            <p className="text-sm text-gray-400">{user.email|| "email"}</p>
            </div>
          </div>

          <nav className="mt-16 flex flex-col space-y-4 text-gray-400">
            <p className="text-xl font-medium hover:text-white transition">Dashboard</p>
            <p className="text-xl font-semibold text-white">Subscriptions</p>
          </nav>
        </div>
      </aside>
  );
}