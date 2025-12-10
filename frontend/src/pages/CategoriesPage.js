import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';

const CategoriesPage = () => {
  const { categories, addCategory } = useFinance();
  const [form, setForm] = useState({
    name: '',
    type: 'expense',
    icon: '💰',
    monthlyBudget: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await addCategory(form);
      setForm({ name: '', type: 'expense', icon: '💰', monthlyBudget: '' });
    } catch (err) {
      setError('Failed to create category');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Categories</h2>
          <p className="text-sm text-slate-500">
            Organize your transactions into categories.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-3 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-col gap-3 mb-6 max-w-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="both">Both</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Monthly budget (Rs., optional)
          </label>
          <input
            type="number"
            name="monthlyBudget"
            value={form.monthlyBudget}
            onChange={handleChange}
            className="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Icon (emoji or short text)
          </label>
          <input
            type="text"
            name="icon"
            value={form.icon}
            onChange={handleChange}
            className="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          >
            Add Category
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {categories.map((cat) => (
          <div
            key={cat.id || cat.name}
            className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{cat.icon}</span>
              <div>
                <p className="text-sm font-medium text-slate-900">{cat.name}</p>
                <p className="text-xs text-slate-500 capitalize">
                  {cat.type}
                  {cat.monthlyBudget > 0 && (
                    <span className="ml-2 text-[11px] text-slate-400">
                      Budget: Rs. {cat.monthlyBudget.toFixed(0)}/month
                    </span>
                  )}
                </p>
              </div>
            </div>
            {cat.isDefault && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                Default
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
