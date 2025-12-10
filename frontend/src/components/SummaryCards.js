import React from 'react';

const SummaryCards = ({ summary }) => {
  const { income = 0, expense = 0, balance = 0 } = summary || {};

  const cards = [
    {
      label: 'Total Income',
      value: income,
      color: 'bg-emerald-500/10 text-emerald-600',
      badge: 'Income',
    },
    {
      label: 'Total Expense',
      value: expense,
      color: 'bg-rose-500/10 text-rose-600',
      badge: 'Expense',
    },
    {
      label: 'Balance',
      value: balance,
      color: 'bg-primary-500/10 text-primary-600',
      badge: 'Balance',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl bg-white shadow-sm border border-slate-200 p-4 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {card.label}
            </p>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${card.color}`}>
              {card.badge}
            </span>
          </div>
          <p className={`text-2xl font-semibold ${card.color}`}>
            Rs. {card.value.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
