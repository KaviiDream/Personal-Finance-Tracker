import React, { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0f766e', '#22c55e', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#f97316', '#eab308'];

const CategoryPieChart = ({ month, year, transactions }) => {
  const data = useMemo(() => {
    const map = new Map();

    transactions.forEach((tx) => {
      if (tx.type !== 'expense') return;
      const d = new Date(tx.date);
      if (d.getMonth() + 1 !== month || d.getFullYear() !== year) return;
      const key = tx.category || 'Other';
      map.set(key, (map.get(key) || 0) + (tx.amount || 0));
    });

    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [transactions, month, year]);

  if (!data.length) {
    return null;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mt-4">
      <h3 className="text-sm font-semibold text-slate-800 mb-2">
        Expense breakdown by category
      </h3>
      <p className="text-xs text-slate-500 mb-3">
        Shows how your spending is distributed across categories for this month.
      </p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`Rs. ${Number(value).toFixed(0)}`, name]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryPieChart;
