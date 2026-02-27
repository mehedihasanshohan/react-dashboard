import React, { useEffect, useState } from "react";
import api from "../api/axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  LogOut,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  Play,
  MoreHorizontal,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";
import AnalyticsContent from "../components/AnalyticsContent";
import TasksContent from "../components/TaskContent";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/api/dashboard");
        setData(response.data);
      } catch (error) {
        console.error("Data fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="h-screen w-full bg-[#F8F9FB] flex items-center justify-center">
        <div className="text-[#006D35] font-black text-xl animate-pulse tracking-widest">
          INITIALIZING NEXUS...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#1A1C1E] flex p-5 gap-5 font-sans">
      {/* 1. Sidebar */}
      <aside
        className="w-64 bg-white rounded-[2.5rem] p-8 flex flex-col
      justify-between shadow-sm border border-slate-100 lg:flex"
      >
        <div>
          <div className="flex items-center gap-3 mb-12 px-2">
            <div
              className="w-9 h-9 bg-[#006D35] rounded-full flex items-center
            justify-center text-white font-black text-xl"
            >
              D
            </div>
            <span className="font-bold text-2xl tracking-tight">Donezo</span>
          </div>
          <nav className="space-y-4">
            <NavItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              active={activeMenu === "Dashboard"}
              onClick={() => setActiveMenu("Dashboard")}
            />
            <NavItem
              icon={<Users size={20} />}
              label="Team"
              active={activeMenu === "Team"}
              onClick={() => setActiveMenu("Team")}
            />
            <NavItem
              icon={<BarChart3 size={20} />}
              label="Analytics"
              active={activeMenu === "Analytics"}
              onClick={() => setActiveMenu("Analytics")}
            />
            <NavItem
              icon={<Users size={20} />}
              label="Tasks"
              active={activeMenu === "Tasks"}
              onClick={() => setActiveMenu("Tasks")}
            />
          </nav>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2
         text-slate-400 hover:text-red-500 font-bold transition-all"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* 2. Main Area */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Top Header */}
        <header className="flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={18}
            />
            <input
              type="text"
              placeholder="Search task"
              className="w-full bg-white rounded-full py-3.5 pl-12 pr-4
            shadow-sm border-none text-sm outline-none focus:ring-1 focus:ring-green-100"
            />
          </div>
          <div className="flex items-center gap-5">
            <div className="p-2.5 bg-white rounded-full shadow-sm text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors">
              <Bell size={20} />
            </div>
            <div className="flex items-center gap-3 bg-white p-1.5 pr-5 rounded-full shadow-sm cursor-pointer border border-slate-50">
              <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=me" alt="user" />
              </div>
              <div>
                <p className="text-xs font-black leading-none">
                  Toteck Michael
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  tmichael20@mail.com
                </p>
              </div>
            </div>
          </div>
        </header>

        {activeMenu === "Dashboard" ? (
          <div className="flex gap-6 flex-1 overflow-y-auto">
            {/* Left Column */}
            <div className="flex-[2.2] space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-black tracking-tight">
                    Dashboard
                  </h1>
                  <p className="text-slate-400 text-sm mt-1">
                    Plan, prioritize, and accomplish your tasks with ease.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    className="bg-[#006D35] text-white px-6 py-3 rounded-full
                   text-sm font-black flex items-center gap-2 shadow-lg"
                  >
                    <Plus size={18} strokeWidth={3} /> Add Project
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatBox
                  title="Total Projects"
                  value="24"
                  growth={data?.overview?.growth}
                  active
                />
                <StatBox title="Ended Projects" value="10" growth="5" />
                <StatBox title="Running Projects" value="12" growth="8" />
                <StatBox title="Pending Project" value="2" isSmall />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="bg-white p-7 rounded-[2.5rem] shadow-sm">
                  <h3 className="font-black text-lg mb-6">Project Analytics</h3>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={data?.analytics}>
                      <Bar dataKey="views" radius={[6, 6, 6, 6]}>
                        {data?.analytics?.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={index === 2 ? "#006D35" : "#D1FAE5"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white p-7 rounded-[2.5rem] shadow-sm">
                  <h3 className="font-black text-lg mb-6">Reminders</h3>
                  <div className="bg-[#F8F9FB] p-5 rounded-3xl">
                    <p className="text-sm font-black">
                      Meeting with Arc Company
                    </p>
                    <button
                      className="mt-5 w-full bg-[#006D35] text-white py-3
                    rounded-2xl text-xs font-black"
                    >
                      Start Meeting
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-6 min-w-75">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm">
                <h3 className="font-black text-lg mb-8">Project Progress</h3>
                <div className="relative w-40 h-40 flex items-center justify-center mx-auto">
                  <span className="absolute text-3xl font-black">
                    {data?.overview?.growth}%
                  </span>
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#F1F5F9"
                      strokeWidth="14"
                      fill="transparent"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#006D35"
                      strokeWidth="14"
                      strokeDasharray={440}
                      strokeDashoffset={
                        440 - (440 * (data?.overview?.growth || 0)) / 100
                      }
                      fill="transparent"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : activeMenu === "Team" ? (
          <TeamContent users={data?.users} />
        ) : activeMenu === "Analytics" ? (
          <AnalyticsContent analyticsData={data?.analytics} />
        ) : activeMenu === "Tasks" ? (
          <TasksContent tasks={data?.products} />
        ) : (
          <div
            className="flex-1 flex items-center justify-center bg-white
          rounded-[2.5rem] text-slate-400 font-bold italic"
          >
            Analytics Content Coming Soon...
          </div>
        )}
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-4 px-5 py-4 rounded-[1.2rem] cursor-pointer transition-all ${active ? "bg-[#D1FAE5] text-[#006D35] font-black shadow-sm" : "text-slate-400 font-bold hover:bg-slate-50"}`}
  >
    {icon} <span className="text-[15px]">{label}</span>
  </div>
);

// eslint-disable-next-line no-unused-vars
const StatBox = ({ title, value, growth, active, isSmall }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className={`p-6 rounded-2xl shadow-sm border transition-all ${active ? "bg-[#006D35] text-white border-transparent" : "bg-white text-slate-800 border-slate-50"}`}
  >
    <p className="text-[10px] font-black uppercase opacity-60">{title}</p>
    <div className="text-4xl font-black my-2 tracking-tighter">{value}</div>
    {growth && (
      <p className="text-[10px] font-black flex items-center gap-1 opacity-90">
        <ArrowUpRight size={14} strokeWidth={3} /> {growth}% Increase
      </p>
    )}
  </motion.div>
);

const TeamContent = ({ users }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100"
    >
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Team Members
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Manage your team and their access levels.
          </p>
        </div>
        <button className="bg-[#006D35] text-white px-6 py-3 rounded-full text-sm font-black flex items-center gap-2">
          + Invite Member
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50 text-slate-400 text-[11px] uppercase tracking-widest font-black">
              <th className="pb-4 pl-4">Member</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Joining Date</th>
              <th className="pb-4 text-right pr-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users?.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="py-5 pl-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D1FAE5] text-[#006D35] flex items-center justify-center font-black text-xs">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </td>
                <td className="py-5">
                  <span
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase ${user.status === "active" ? "bg-green-50 text-green-600" : "bg-slate-50 text-slate-400"}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-5 text-sm text-slate-500">
                  {new Date(user.joinDate).toLocaleDateString()}
                </td>
                <td className="py-5 text-right pr-4">
                  <MoreHorizontal className="inline text-slate-300" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Dashboard;
