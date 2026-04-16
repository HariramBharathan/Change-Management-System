import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { motion } from 'motion/react';
import { ChangeRequest } from '../types';
import { TrendingUp, FileText, CheckCircle2, Clock } from 'lucide-react';

interface AnalyticsProps {
  requests: ChangeRequest[];
}

export const Analytics: React.FC<AnalyticsProps> = ({ requests }) => {
  const stats = useMemo(() => {
    const total = requests.length;
    const implemented = requests.filter(r => r.status === 'IMPLEMENTED').length;
    const pending = requests.filter(r => r.status.startsWith('PENDING')).length;
    const rejected = requests.filter(r => r.status.includes('REJECTED')).length;

    const typeData = [
      { name: 'Internal Marks', value: requests.filter(r => r.type === 'marks').length },
      { name: 'Exam Date', value: requests.filter(r => r.type === 'date').length },
      { name: 'Exam Venue', value: requests.filter(r => r.type === 'venue').length },
      { name: 'Revaluation', value: requests.filter(r => r.type === 'revaluation').length },
    ];

    const statusData = [
      { name: 'Implemented', value: implemented, color: '#10b981' },
      { name: 'Pending', value: pending, color: '#f59e0b' },
      { name: 'Rejected', value: rejected, color: '#ef4444' },
    ];

    return { total, implemented, pending, rejected, typeData, statusData };
  }, [requests]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Requests</p>
              <p className="text-2xl font-bold text-zinc-800">{stats.total}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Implemented</p>
              <p className="text-2xl font-bold text-zinc-800">{stats.implemented}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Pending</p>
              <p className="text-2xl font-bold text-zinc-800">{stats.pending}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Success Rate</p>
              <p className="text-2xl font-bold text-zinc-800">
                {stats.total > 0 ? Math.round((stats.implemented / stats.total) * 100) : 0}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm"
        >
          <h3 className="text-lg font-bold text-zinc-800 mb-6">Requests by Type</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.typeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--chart-text)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--chart-text)', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'var(--chart-cursor)' }}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: 'var(--chart-cursor)',
                    color: 'var(--chart-text)'
                  }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm"
        >
          <h3 className="text-lg font-bold text-zinc-800 mb-6">Status Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: 'var(--chart-cursor)',
                    color: 'var(--chart-text)'
                  }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
