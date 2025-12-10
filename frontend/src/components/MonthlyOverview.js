import React, { useMemo } from 'react';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const MonthlyOverview = ({ year, transactions }) => {
  const data = useMemo(() => {
    const base = monthNames.map((name, index) => ({
      monthIndex: index,
      name,
      income: 0,
      expense: 0,
      balance: 0,
    }));

    transactions.forEach((tx) => {
      const d = new Date(tx.date);
      if (d.getFullYear() !== year) return;
      const m = d.getMonth();
      if (tx.type === 'income') {
        base[m].income += tx.amount || 0;
      } else if (tx.type === 'expense') {
        base[m].expense += tx.amount || 0;
      }
    });

    base.forEach((row) => {
      row.balance = row.income - row.expense;
    });

    return base;
  }, [transactions, year]);

  const maxAbs = useMemo(() => {
    return data.reduce((max, row) => {
      const v = Math.max(Math.abs(row.income), Math.abs(row.expense));
      return v > max ? v : max;
    }, 0) || 1;
  }, [data]);

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-slate-700 mb-2">
        Monthly analysis for {year}
      </h3>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full text-xs md:text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-slate-500 uppercase tracking-wide">
                Month
              </th>
              <th className="px-3 py-2 text-right font-semibold text-slate-500 uppercase tracking-wide">
                Income
              </th>
              <th className="px-3 py-2 text-right font-semibold text-slate-500 uppercase tracking-wide">
                Expense
              </th>
              <th className="px-3 py-2 text-right font-semibold text-slate-500 uppercase tracking-wide">
                Balance
              </th>
              <th className="px-3 py-2 text-left font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                Visual
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.monthIndex} className="border-b border-slate-100 last:border-none">
                <td className="px-3 py-2 text-slate-700">{row.name}</td>
                <td className="px-3 py-2 text-right text-emerald-600 font-medium">
                  ${row.income.toFixed(2)}
                </td>
                <td className="px-3 py-2 text-right text-rose-600 font-medium">
                  ${row.expense.toFixed(2)}
                </td>
                <td className="px-3 py-2 text-right font-semibold text-slate-800">
                  ${row.balance.toFixed(2)}
                </td>
                <td className="px-3 py-2 hidden md:table-cell">
                  <div className="flex items-center gap-1 h-4">
                    <div className="flex-1 bg-slate-100 rounded-full overflow-hidden h-1.5">
                      <div
                        className="h-full bg-emerald-500/70"
                        style={{ width: `${(row.income / maxAbs) * 100}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-slate-100 rounded-full overflow-hidden h-1.5">
                      <div
                        className="h-full bg-rose-500/70"
                        style={{ width: `${(row.expense / maxAbs) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyOverview;
