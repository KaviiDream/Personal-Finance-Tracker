import React from 'react';

const MonthFilter = ({ month, year, onChange }) => {
  const now = new Date();
  const currentYear = year || now.getFullYear();

  const handleMonthChange = (e) => {
    onChange({ month: Number(e.target.value), year: currentYear });
  };

  const handleYearChange = (e) => {
    onChange({ month, year: Number(e.target.value) });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Month
        </label>
        <select
          value={month}
          onChange={handleMonthChange}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {Array.from({ length: 12 }).map((_, idx) => (
            <option key={idx + 1} value={idx + 1}>
              {new Date(2000, idx, 1).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Year
        </label>
        <input
          type="number"
          value={currentYear}
          onChange={handleYearChange}
          className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default MonthFilter;
