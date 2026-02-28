import { useEffect, useState } from "react";
import api from "../api/axios";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  MessageSquare,
  Plus,
  ArrowUpRight,
  MoreHorizontal,
  ChevronRight,
  Play,
  Pause,
  Square,
  UserPlus,
  Import,
} from "lucide-react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Cell,
  XAxis,
  Tooltip,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import AnalyticsContent from "../components/AnalyticsContent";
import TasksContent from "../components/TaskContent";

// ── Helpers ────────────────────────────────────────────────────────────────────
const avatarColors = ["#D1FAE5", "#FEF3C7", "#DBEAFE", "#FCE7F3", "#EDE9FE"];
const avatarTextColors = [
  "#059669",
  "#D97706",
  "#2563EB",
  "#DB2777",
  "#7C3AED",
];
const projectColors = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"];
const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// ── Sub-components ─────────────────────────────────────────────────────────────

const NavItem = ({ icon, label, active, badge, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all select-none ${
      active
        ? "bg-[#D1FAE5] text-[#006D35] font-extrabold"
        : "text-slate-400 font-semibold hover:bg-slate-100"
    }`}
  >
    <span className={active ? "text-[#006D35]" : "text-slate-400"}>{icon}</span>
    <span className="text-[13px] flex-1">{label}</span>
    {badge && (
      <span className="bg-[#006D35] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </div>
);

const StatCard = ({ title, value, growth, active, note }) => (
  <motion.div
    whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`p-5 rounded-2xl border transition-all cursor-default ${
      active
        ? "bg-[#006D35] text-white border-transparent shadow-lg shadow-green-200"
        : "bg-white text-slate-800 border-slate-100 shadow-sm"
    }`}
  >
    <p
      className={`text-[10px] font-black uppercase tracking-widest ${active ? "text-green-200" : "text-slate-400"}`}
    >
      {title}
    </p>
    <div className="text-4xl font-black my-2 tracking-tight">
      {value ?? "—"}
    </div>
    {growth != null && (
      <p
        className={`text-[10px] font-black flex items-center gap-1 ${active ? "text-green-200" : "text-emerald-500"}`}
      >
        <ArrowUpRight size={12} strokeWidth={3} />
        {growth}% Increased from last month
      </p>
    )}
    {note && (
      <p
        className={`text-[10px] font-semibold ${active ? "text-green-200" : "text-slate-400"}`}
      >
        {note}
      </p>
    )}
  </motion.div>
);

// ── Main Dashboard ─────────────────────────────────────────────────────────────

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [timerRunning, setTimerRunning] = useState(true);
  const { logout, user } = useAuth();
const displayName = user?.name || "Pilot";

  // ── Fetch all dashboard data from /api/dashboard ──
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/api/dashboard");
        setData(response.data);
        console.log("Fetched dashboard data:", response.data);
      } catch (error) {
        console.error("Data fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-[#006D35] font-black text-xl animate-pulse tracking-widest">
          INITIALIZING NEXUS...
        </div>
      </div>
    );
  }

  // ── Destructure real API data ──
  const overview = data?.overview ?? {}; // { growth, activeUsers, revenue, totalUsers }
  const users = data?.users ?? []; // [{ id, name, email, status, joinDate }]
  const analyticsRaw = data?.analytics ?? []; // [{ date, views, clicks, conversions }]
  const products = data?.products ?? []; // [{ id, name, price, sales, category }]

  // ── Derived stats from real data ──
  const totalProjects = products.length;
  const endedProjects = products.filter((p) => p.sales > 300).length;
  const runningProjects = products.filter(
    (p) => p.sales >= 100 && p.sales <= 300,
  ).length;
  const pendingProjects = products.filter((p) => p.sales < 100).length;

  // ── Chart data: map analytics with short day labels ──
  const analyticsChartData = analyticsRaw.map((item, i) => ({
    ...item,
    label: DAY_LABELS[i % DAY_LABELS.length],
  }));
  const maxViews = Math.max(...analyticsChartData.map((d) => d.views), 0);

  // ── Donut progress from overview.growth ──
  const circumference = 327;
  const growthPct = overview.growth ?? 0;

  return (
    <div
      className="min-h-screen bg-[#F3F4F6] text-[#1A1C1E] flex p-4 gap-4"
      style={{ fontFamily: "'DM Sans', 'Nunito', system-ui, sans-serif" }}
    >
      {/* ── Sidebar ── */}
      <aside className="w-56 bg-white rounded-3xl p-5 flex flex-col justify-between shadow-sm border border-slate-100 shrink-0">
        <div>
          <div className="flex items-center gap-2.5 mb-8 px-1">
            <div className="w-8 h-8 bg-[#006D35] rounded-full flex items-center justify-center text-white font-black text-base shadow-md shadow-green-200">
              D
            </div>
            <span className="font-black text-xl tracking-tight">Donezo</span>
          </div>

          <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 px-4 mb-2">
            Menu
          </p>
          <nav className="space-y-1">
            <NavItem
              icon={<LayoutDashboard size={16} />}
              label="Dashboard"
              active={activeMenu === "Dashboard"}
              onClick={() => setActiveMenu("Dashboard")}
            />
            {/* badge shows real products count */}
            <NavItem
              icon={<CheckSquare size={16} />}
              label="Tasks"
              badge={products.length || undefined}
              active={activeMenu === "Tasks"}
              onClick={() => setActiveMenu("Tasks")}
            />
            <NavItem
              icon={<Calendar size={16} />}
              label="Calendar"
              active={activeMenu === "Calendar"}
              onClick={() => setActiveMenu("Calendar")}
            />
            <NavItem
              icon={<BarChart3 size={16} />}
              label="Analytics"
              active={activeMenu === "Analytics"}
              onClick={() => setActiveMenu("Analytics")}
            />
            <NavItem
              icon={<Users size={16} />}
              label="Team"
              active={activeMenu === "Team"}
              onClick={() => setActiveMenu("Team")}
            />
          </nav>

          <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 px-4 mb-2 mt-6">
            General
          </p>
          <nav className="space-y-1">
            <NavItem
              icon={<Settings size={16} />}
              label="Settings"
              active={false}
              onClick={() => {}}
            />
            <NavItem
              icon={<HelpCircle size={16} />}
              label="Help"
              active={false}
              onClick={() => {}}
            />
            <NavItem
              icon={<LogOut size={16} />}
              label="Logout"
              active={false}
              onClick={logout}
            />
          </nav>
        </div>

        <div className="bg-[#006D35] rounded-2xl p-4 text-white mt-4">
          <p className="text-[10px] font-black text-green-200 uppercase tracking-wide mb-1">
            Mobile App
          </p>
          <p className="text-xs font-black leading-tight mb-3">
            Download our Mobile App
          </p>
          <button className="w-full bg-white text-[#006D35] text-[10px] font-black py-2 rounded-xl hover:bg-green-50 transition-colors">
            Download
          </button>
        </div>
      </aside>

      {/* ── Main Area ── */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Header */}
        <header className="flex justify-between items-center bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
          <div className="relative w-72">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={15}
            />
            <input
              type="text"
              placeholder="Search task"
              className="w-full bg-[#F8F9FB] rounded-full py-2.5 pl-10 pr-12 text-xs outline-none focus:ring-2 focus:ring-green-100 border border-transparent"
            />
            <kbd className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] bg-slate-200 text-slate-400 px-1.5 py-0.5 rounded font-mono">
              ⌘F
            </kbd>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 bg-[#F8F9FB] rounded-full text-slate-400 hover:bg-slate-100 transition-colors">
              <MessageSquare size={16} />
            </button>
            <button className="p-2 bg-[#F8F9FB] rounded-full text-slate-400 hover:bg-slate-100 transition-colors relative">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-400 rounded-full" />
            </button>
            {/* <div className="flex items-center gap-2.5 bg-[#F8F9FB] pl-1.5 pr-4 py-1.5 rounded-full cursor-pointer hover:bg-slate-100 transition-colors border border-slate-100">
              <img
                src={user?.avatar || "https://i.pravatar.cc/150?u=fallback"}
                alt="user"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-[11px] font-black leading-none">
                  {user?.displayName || "Guest User"}
                </p>
                <p className="text-[9px] text-slate-400 mt-0.5">
                  {user?.email || "No email provided"}
                </p>
              </div>
            </div> */}

            {/* Change this part in your Header inside Dashboard.jsx */}
<div className="flex items-center gap-2.5 bg-[#F8F9FB] pl-1.5 pr-4 py-1.5 rounded-full cursor-pointer hover:bg-slate-100 transition-colors border border-slate-100">
  <img
    src={user?.avatar || `https://ui-avatars.com/api/?name=${displayName}&background=006D35&color=fff`}
    alt="user"
    className="w-8 h-8 rounded-full object-cover"
  />
  <div>
    <p className="text-[11px] font-black leading-none">
      {/* Use the displayName variable we defined at the top of the component */}
      {displayName}
    </p>
    <p className="text-[9px] text-slate-400 mt-0.5">
      {user?.email || "Authenticated User"}
    </p>
  </div>
</div>

          </div>
        </header>

        {/* ── Animated Pages ── */}
        <AnimatePresence mode="wait">
          {/* ════════════════════════════════
              DASHBOARD VIEW
          ════════════════════════════════ */}
          {activeMenu === "Dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-4 flex-1"
            >
              {/* Left Column */}
              <div className="flex-1 space-y-4 min-w-0">
                {/* Title Row */}
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-3xl font-black tracking-tight">
                      Dashboard
                    </h1>
                    <p className="text-slate-400 text-xs mt-1">
                      Plan, prioritize, and accomplish your tasks with ease.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-[#006D35] text-white px-5 py-2.5 rounded-full text-xs font-black flex items-center gap-1.5 shadow-lg shadow-green-200 hover:bg-[#005a2b] transition-colors">
                      <Plus size={14} strokeWidth={3} /> Add Project
                    </button>
                    <button className="bg-white text-slate-600 px-5 py-2.5 rounded-full text-xs font-black flex items-center gap-1.5 border border-slate-200 hover:bg-slate-50 transition-colors">
                      <Import size={14} /> Import Data
                    </button>
                  </div>
                </div>

                {/* ── Stats — values from data.products + data.overview ── */}
                <div className="grid grid-cols-4 gap-3">
                  {/* Total = all products */}
                  <StatCard
                    title="Total Projects"
                    value={totalProjects}
                    growth={overview.growth}
                    active
                  />
                  {/* Ended = products with sales > 300 */}
                  <StatCard
                    title="Ended Projects"
                    value={endedProjects}
                    growth={
                      overview.growth
                        ? +(overview.growth * 0.3).toFixed(1)
                        : null
                    }
                  />
                  {/* Running = products with 100–300 sales */}
                  <StatCard
                    title="Running Projects"
                    value={runningProjects}
                    growth={
                      overview.growth
                        ? +(overview.growth * 0.5).toFixed(1)
                        : null
                    }
                  />
                  {/* Pending = products with sales < 100 */}
                  <StatCard
                    title="Pending Project"
                    value={pendingProjects}
                    note="On Queue"
                  />
                </div>

                {/* ── Analytics Chart + Reminders ── */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Chart — data.analytics[].views */}
                  <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="font-black text-sm mb-4">
                      Project Analytics
                    </h3>
                    <ResponsiveContainer width="100%" height={130}>
                      <BarChart data={analyticsChartData} barSize={20}>
                        <XAxis
                          dataKey="label"
                          tick={{
                            fontSize: 9,
                            fill: "#94a3b8",
                            fontWeight: 700,
                          }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          cursor={false}
                          contentStyle={{
                            background: "#1e293b",
                            border: "none",
                            borderRadius: 8,
                            color: "#fff",
                            fontSize: 11,
                          }}
                          formatter={(v) => [v.toLocaleString(), "Views"]}
                        />
                        <Bar dataKey="views" radius={[6, 6, 6, 6]}>
                          {analyticsChartData.map((entry, i) => (
                            <Cell
                              key={i}
                              // Highlight bar with the highest views value
                              fill={
                                entry.views === maxViews ? "#006D35" : "#D1FAE5"
                              }
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Reminders */}
                  <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="font-black text-sm mb-4">Reminders</h3>
                    <div className="bg-[#F8F9FB] p-4 rounded-2xl">
                      <p className="text-xs font-black">
                        Meeting with Arc Company
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Time: 02:00 pm - 04:00 pm
                      </p>
                      <button className="mt-4 w-full bg-[#006D35] text-white py-2.5 rounded-xl text-[11px] font-black flex items-center justify-center gap-2 hover:bg-[#005a2b] transition-colors">
                        <Play size={12} fill="white" /> Start Meeting
                      </button>
                    </div>
                  </div>
                </div>

                {/* ── Team Collaboration — data.users ── */}
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-black text-sm">Team Collaboration</h3>
                    <button className="flex items-center gap-1 text-[10px] font-black text-slate-500 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-colors">
                      <Plus size={10} strokeWidth={3} /> Add Member
                    </button>
                  </div>
                  <div className="space-y-3">
                    {users.map((user, i) => (
                      <div key={user.id} className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
                          style={{
                            background: avatarColors[i % avatarColors.length],
                            color:
                              avatarTextColors[i % avatarTextColors.length],
                          }}
                        >
                          {getInitials(user.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-black text-slate-700 leading-none truncate">
                            {user.name}
                          </p>
                          <p className="text-[9px] text-slate-400 mt-0.5 truncate">
                            {user.email}
                          </p>
                        </div>
                        {/* status badge — from user.status */}
                        <span
                          className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wide shrink-0 ${
                            user.status === "active"
                              ? "bg-green-50 text-green-600"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {user.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Right Column ── */}
              <div className="w-56 space-y-4 shrink-0">
                {/* Project Progress — overview.growth as % */}
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="font-black text-sm mb-5">Project Progress</h3>
                  <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                    <svg
                      className="w-full h-full -rotate-90"
                      viewBox="0 0 120 120"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        stroke="#F1F5F9"
                        strokeWidth="10"
                        fill="none"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        stroke="#006D35"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={
                          circumference - (circumference * growthPct) / 100
                        }
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-2xl font-black">{growthPct}%</span>
                      <p className="text-[8px] text-slate-400 font-semibold mt-0.5">
                        Growth
                        <br />
                        Rate
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-3 mt-4 flex-wrap">
                    {[
                      { color: "#006D35", label: "Completed" },
                      { color: "#34D399", label: "In Progress" },
                      { color: "#E2E8F0", label: "Pending" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ background: item.color }}
                        />
                        <span className="text-[8px] text-slate-500 font-semibold">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Products / Projects — data.products ── */}
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-black text-sm">Project</h3>
                    <button className="flex items-center gap-0.5 text-[9px] font-black text-slate-500 border border-slate-200 px-2 py-1 rounded-full hover:bg-slate-50">
                      <Plus size={9} strokeWidth={3} /> New
                    </button>
                  </div>
                  <div className="space-y-3">
                    {products.map((product, i) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-2.5"
                      >
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            background:
                              projectColors[i % projectColors.length] + "20",
                          }}
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              background:
                                projectColors[i % projectColors.length],
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-black text-slate-700 leading-none truncate">
                            {product.name}
                          </p>
                          <p className="text-[8px] text-slate-400 mt-0.5">
                            ${product.price} · {product.sales} sales
                          </p>
                        </div>
                        <ChevronRight
                          size={12}
                          className="text-slate-300 shrink-0"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Tracker */}
                <div className="bg-[#0d1f13] p-5 rounded-3xl text-white">
                  <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-3">
                    Time Tracker
                  </p>
                  <p className="text-3xl font-black tracking-tight mb-4">
                    01:24:08
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTimerRunning(!timerRunning)}
                      className="w-9 h-9 bg-[#006D35] rounded-full flex items-center justify-center hover:bg-[#00502a] transition-colors"
                    >
                      {timerRunning ? (
                        <Pause size={14} fill="white" />
                      ) : (
                        <Play size={14} fill="white" />
                      )}
                    </button>
                    <button className="w-9 h-9 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                      <Square size={12} fill="white" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════════════════════════════
              TEAM VIEW — data.users
          ════════════════════════════════ */}
          {activeMenu === "Team" && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex-1"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-black tracking-tight">
                    Team Members
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage your team and their access levels.
                  </p>
                </div>
                <button className="bg-[#006D35] text-white px-5 py-2.5 rounded-full text-xs font-black flex items-center gap-1.5 shadow-md shadow-green-200">
                  <UserPlus size={14} /> Invite Member
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-50 text-slate-300 text-[10px] font-black uppercase tracking-widest">
                    <th className="pb-3 text-left pl-3">Member</th>
                    <th className="pb-3 text-left">Status</th>
                    <th className="pb-3 text-left">Joining Date</th>
                    <th className="pb-3 text-right pr-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.map((user, i) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 pl-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black"
                            style={{
                              background: avatarColors[i % avatarColors.length],
                              color:
                                avatarTextColors[i % avatarTextColors.length],
                            }}
                          >
                            {getInitials(user.name)}
                          </div>
                          <div>
                            <p className="text-xs font-black text-slate-800">
                              {user.name}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span
                          className={`text-[9px] font-black px-2.5 py-1.5 rounded-lg uppercase ${
                            user.status === "active"
                              ? "bg-green-50 text-green-600"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 text-xs text-slate-500 font-semibold">
                        {new Date(user.joinDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 text-right pr-3">
                        <MoreHorizontal
                          className="inline text-slate-300 cursor-pointer hover:text-slate-500"
                          size={18}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {/* ════════════════════════════════
              ANALYTICS VIEW — data.analytics
          ════════════════════════════════ */}
          {activeMenu === "Analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1"
            >
              <AnalyticsContent analyticsData={data?.analytics} />
            </motion.div>
          )}

          {/* ════════════════════════════════
              TASKS VIEW — data.products
          ════════════════════════════════ */}
          {activeMenu === "Tasks" && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1"
            >
              <TasksContent tasks={data?.products} />
            </motion.div>
          )}

          {/* Fallback */}
          {activeMenu === "Calendar" && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex items-center justify-center bg-white rounded-3xl text-slate-300 font-black text-xl border border-slate-100"
            >
              Calendar Coming Soon...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
