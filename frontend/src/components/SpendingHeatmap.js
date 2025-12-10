import React, { useMemo } from 'react';

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const SpendingHeatmap = ({ month, year, transactions }) => {
  const { grid, max } = useMemo(() => {
    const grid = Array.from({ length: 5 }, () => Array(7).fill(0));

    transactions.forEach((tx) => {
      if (tx.type !== 'expense') return;
      const d = new Date(tx.date);
      if (d.getMonth() + 1 !== month || d.getFullYear() !== year) return;
      const day = d.getDate();
      const weekday = d.getDay();
      const weekIndex = Math.floor((day - 1) / 7);
      if (weekIndex < 0 || weekIndex > 4) return;
      grid[weekIndex][weekday] += tx.amount || 0;
    });

    let max = 0;
    grid.forEach((row) =>
      row.forEach((v) => {
        if (v > max) max = v;
      })
    );

    return { grid, max };
  }, [transactions, month, year]);

  if (max === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mt-4">
      <h3 className="text-sm font-semibold text-slate-800 mb-2">
        Spending heatmap (expenses only)
      </h3>
      <p className="text-xs text-slate-500 mb-3">
        Darker squares mean higher spending on that weekday/week of the month.
      </p>
      <div className="overflow-x-auto">
        <table className="text-[10px] text-slate-600">
          <thead>
            <tr>
              <th className="px-1 py-1 text-left">Week</th>
              {weekdayLabels.map((label) => (
                <th key={label} className="px-1 py-1 text-center">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.map((row, weekIndex) => (
              <tr key={weekIndex}>
                <td className="pr-1 py-1 text-slate-500">W{weekIndex + 1}</td>
                {row.map((value, weekday) => {
                  const intensity = value > 0 ? 0.2 + 0.8 * (value / max) : 0.05;
                  return (
                    <td key={weekday} className="px-0.5 py-0.5">
                      <div
                        className="w-6 h-6 rounded-sm border border-slate-100"
                        style={{
                          backgroundColor: `rgba(248, 113, 113, ${intensity.toFixed(2)})`,
                        }}
                        title={`W${weekIndex + 1} ${weekdayLabels[weekday]}: Rs. ${value.toFixed(0)}`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpendingHeatmap;
