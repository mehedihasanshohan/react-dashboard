// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TeamContent = ({ users }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100"
    >
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Team Members</h2>
          <p className="text-sm text-slate-400 mt-1">Manage your team and their access levels.</p>
        </div>
        <button className="bg-[#006D35] text-white px-6 py-3 rounded-full text-sm font-black flex items-center gap-2 shadow-lg hover:bg-[#005a2c] transition-all">
          <Plus size={18} /> Invite Member
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50 text-slate-400 text-[11px] uppercase tracking-[0.2em] font-black">
              <th className="pb-4 pl-4">Member</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Joining Date</th>
              <th className="pb-4 text-right pr-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users?.map((user) => (
              <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="py-5 pl-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#D1FAE5] text-[#006D35] flex items-center justify-center font-black text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-5">
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                    user.status === 'active'
                    ? 'bg-green-50 text-green-600 border border-green-100'
                    : 'bg-slate-50 text-slate-400 border border-slate-100'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-5 text-sm text-slate-500 font-medium">
                  {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="py-5 text-right pr-4">
                  <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TeamContent;