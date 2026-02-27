// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, BarChart3, LogOut,
  Bell, Search, Plus, ArrowUpRight, Play, MoreHorizontal,
  CheckCircle2 
} from "lucide-react";

const TasksContent = ({ tasks }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Project Tasks</h2>
          <p className="text-slate-400 text-sm mt-1">Manage and track your product-based tasks.</p>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-600 transition-all shadow-sm">
            <Search size={20} />
          </button>
          <button className="bg-[#006D35] text-white px-6 py-3 rounded-2xl text-sm font-black flex items-center gap-2 shadow-lg shadow-green-900/10 hover:bg-[#005a2c] transition-all">
            <Plus size={18} /> New Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks?.map((task, idx) => (
          <motion.div
            key={task.id}
            whileHover={{ y: -5 }}
            className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-50 relative overflow-hidden group"
          >
            {/* Status Badge */}
            <div className="flex justify-between items-start mb-6">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                idx % 2 === 0 ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
              }`}>
                {task.category}
              </span>
              <button className="text-slate-200 group-hover:text-slate-400 transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-[#006D35] transition-colors">
              {task.name}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-8">
              Update the project details for {task.name}. Ensure the price point of ${task.price} remains competitive in the {task.category} market.
            </p>

            <div className="flex justify-between items-center pt-6 border-t border-slate-50">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    src={`https://i.pravatar.cc/100?u=${task.id + i}`}
                    alt="team"
                  />
                ))}
                <div className="w-8 h-8 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">+2</div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter leading-none mb-1">Budget</p>
                <p className="font-black text-slate-800">${task.price}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TasksContent;