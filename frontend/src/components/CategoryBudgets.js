import React, { useMemo } from 'react';

const CategoryBudgets = ({ month, year, categories, transactions }) => {
  const rows = useMemo(() => {
    const expTx = transactions.filter((tx) => {
      const d = new Date(tx.date);
      return (
        tx.type === 'expense' &&
        d.getMonth() + 1 === month &&
        d.getFullYear() === year
      );
    });

    return categories
      .filter((c) => (c.monthlyBudget || 0) > 0)
      .map((cat) => {
        const spent = expTx
          .filter((tx) => tx.category === cat.name)
          .reduce((sum, tx) => sum + (tx.amount || 0), 0);
        const budget = cat.monthlyBudget || 0;
        const ratio = budget > 0 ? spent / budget : 0;
        let status = 'On track';
        let color = 'bg-emerald-500';

        if (ratio >= 1) {
          status = 'Over budget';
          color = 'bg-rose-500';
        } else if (ratio >= 0.9) {
          status = 'Nearly over budget';
          color = 'bg-amber-500';
        } else if (ratio >= 0.7) {
          status = 'Approaching limit';
          color = 'bg-amber-400';
        }

        return {
          id: cat.id,
          name: cat.name,
          icon: cat.icon,
          spent,
          budget,
          ratio: Math.min(ratio, 1),
          status,
          color,
        };
      })
      .sort((a, b) => b.spent - a.spent);
  }, [categories, transactions, month, year]);

  if (!rows.length) {
    return null;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mt-4">
      <h3 className="text-sm font-semibold text-slate-800 mb-2">
        Category budgets for this month
      </h3>
      <p className="text-xs text-slate-500 mb-3">
        See which categories are close to or over their planned monthly spending.
      </p>
      <div className="space-y-3 text-xs md:text-sm max-h-64 overflow-auto pr-1">
        {rows.map((row) => (
          <div key={row.id} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">{row.icon}</span>
                <span className="font-medium text-slate-800">{row.name}</span>
              </div>
              <span className="text-[11px] text-slate-500">
                Rs. {row.spent.toFixed(0)} / Rs. {row.budget.toFixed(0)}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full ${row.color}`}
                style={{ width: `${row.ratio * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500">{row.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBudgets;
