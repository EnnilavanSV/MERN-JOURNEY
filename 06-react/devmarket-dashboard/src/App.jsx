import { useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import RevenueChart from "./components/RevenueChart";
import OrdersChart from "./components/OrdersChart";
import RecentOrders from "./components/RecentOrders";
import AIAssistant from "./components/AIAssistant";
import { stats } from "./data/dashboardData";

function Dashboard() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-950" : "bg-gray-50"}`}>
      {/* Navbar */}
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Page title */}
          <div>
            <h1
              className={`text-2xl font-bold
                             ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Overview
            </h1>
            <p
              className={`text-sm mt-1
                           ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Welcome back, Ennilavan. Here's what's happening.
            </p>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2
                          lg:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <StatCard key={stat.id} {...stat} />
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <OrdersChart />
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentOrders />
            <AIAssistant />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
