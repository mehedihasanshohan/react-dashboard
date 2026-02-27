import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AnalyticsContent = ({ analyticsData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-50">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Avg. Conversion</p>
          <h2 className="text-3xl font-black mt-2 text-[#006D35]">12.4%</h2>
          <p className="text-[10px] text-green-500 font-bold mt-1">+2.1% from last week</p>
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-50">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Clicks</p>
          <h2 className="text-3xl font-black mt-2 text-slate-800">
            {analyticsData?.reduce((acc, curr) => acc + curr.clicks, 0).toLocaleString()}
          </h2>
          <p className="text-[10px] text-slate-400 font-bold mt-1">Real-time tracking</p>
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 bg-gradient-to-br from-[#006D35] to-[#004D25] text-white">
          <p className="text-xs font-black opacity-70 uppercase tracking-widest">Performance</p>
          <h2 className="text-3xl font-black mt-2">Excellent</h2>
          <p className="text-[10px] opacity-80 font-bold mt-1">Based on neural insights</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-50">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-black tracking-tight">Traffic Overview</h3>
            <p className="text-xs text-slate-400">Detailed views and engagement metrics per day.</p>
          </div>
          <select className="bg-slate-50 border-none text-[10px] font-black rounded-full px-4 py-2 outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#006D35" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#006D35" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 600}}
                dy={10}
              />
              <YAxis hide={true} />
              <Tooltip
                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '15px' }}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#006D35"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorViews)"
              />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#D1FAE5"
                strokeWidth={3}
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 flex gap-6 justify-center border-t border-slate-50 pt-6">
           <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#006D35]"></span>
              <span className="text-[11px] font-black text-slate-500 uppercase">Page Views</span>
           </div>
           <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#D1FAE5] border border-slate-200"></span>
              <span className="text-[11px] font-black text-slate-500 uppercase">Clicks</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsContent;