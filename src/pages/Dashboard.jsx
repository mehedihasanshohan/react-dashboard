import React, { useEffect, useState } from "react";
import api from "../api/axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { LayoutDashboard, Users, ShoppingCart, BarChart3, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/api/overview");
        setStats(response.data);
      } catch (error) {
        console.error("Data fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="h-screen w-full bg-[#030014] flex items-center justify-center text-blue-400 animate-pulse font-mono tracking-widest">
      SYNCING WITH NEURAL LINK...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030014] text-white flex">
      {/* 1. Futuristic Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/20 backdrop-blur-xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            <span className="font-black tracking-tighter text-xl">NEXUS</span>
          </div>

          <nav className="space-y-2">
            <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
            <NavItem icon={<Users size={20} />} label="Users" />
            <NavItem icon={<ShoppingCart size={20} />} label="Products" />
            <NavItem icon={<BarChart3 size={20} />} label="Analytics" />
          </nav>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all text-slate-500"
        >
          <LogOut size={20} /> <span className="font-bold text-sm">TERMINATE</span>
        </button>
      </aside>

      {/* 2. Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black italic tracking-tight">COMMAND CENTER</h1>
            <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest">Real-time system telemetry</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-blue-400 font-bold tracking-[0.2em] mb-1">NODE STATUS</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <span className="text-xs font-mono">ENCRYPTED_CONNECTED</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Users" value={stats?.totalUsers || "1,284"} detail="+12% from last cycle" />
          <StatCard title="Active Nodes" value={stats?.activeSessions || "842"} detail="Stable Connection" />
          <StatCard title="System Load" value="24%" detail="Optimal Performance" />
          <StatCard title="Revenue" value={`$${stats?.revenue || "42.5k"}`} detail="Target reached" />
        </div>

        {/* Placeholder for Charts / Table */}
        <div className="mt-10 h-80 w-full bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center italic text-slate-700">
           [ Graph / Analytics Component Loading... ]
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active }) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
    {icon} <span className="font-bold text-sm">{label}</span>
  </div>
);

const StatCard = ({ title, value, detail }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-blue-500/30 transition-all"
  >
    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">{title}</p>
    <h3 className="text-3xl font-black mb-2 tracking-tighter">{value}</h3>
    <p className="text-[10px] text-blue-400 font-medium italic">{detail}</p>
  </motion.div>
);

export default Dashboard;