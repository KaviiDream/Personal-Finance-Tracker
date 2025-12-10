import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';

const SavingsGoals = () => {
  const { goals, addGoal } = useFinance();
  const [form, setForm] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.targetAmount) return;
    await addGoal(form);
    setForm({ name: '', targetAmount: '', currentAmount: '' });
  };

  return (
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-4">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
        <h3 className="text-sm font-semibold text-slate-800 mb-2">Savings goals</h3>
        <p className="text-xs text-slate-500 mb-3">
          Track how close you are to important targets like an emergency fund or travel budget.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-sm">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">Goal name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g. Emergency fund"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Target (Rs.)</label>
              <input
                type="number"
                name="targetAmount"
                value={form.targetAmount}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Current (Rs.)</label>
              <input
                type="number"
                name="currentAmount"
                value={form.currentAmount}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="flex justify-end mt-1">
            <button
              type="submit"
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary-600 text-white text-xs font-medium hover:bg-primary-700"
            >
              Add goal
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 text-sm">
        <h4 className="text-xs font-semibold text-slate-700 mb-2">Progress</h4>
        {goals.length === 0 ? (
          <p className="text-xs text-slate-500">No goals yet. Add one on the left.</p>
        ) : (
          <div className="space-y-3 max-h-56 overflow-auto pr-1">
            {goals.map((goal) => {
              const target = goal.targetAmount || 0;
              const current = Math.min(goal.currentAmount || 0, target || Infinity);
              const percent = target > 0 ? Math.min((current / target) * 100, 100) : 0;
              return (
                <div key={goal.id} className="flex flex-col gap-1">
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs font-medium text-slate-800 truncate mr-2">
                      {goal.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Rs. {current.toFixed(0)} / Rs. {target.toFixed(0)}
                    </p>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        percent >= 100
                          ? 'bg-emerald-500'
                          : percent >= 70
                          ? 'bg-amber-500'
                          : 'bg-primary-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500">
                    {percent >= 100 ? 'Goal reached! 🎉' : `${percent.toFixed(0)}% complete`}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavingsGoals;
