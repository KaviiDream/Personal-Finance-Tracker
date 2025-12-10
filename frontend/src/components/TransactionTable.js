import React from 'react';

const TransactionTable = ({ transactions, onEdit, onDelete }) => {
  if (!transactions.length) {
    return (
      <div className="bg-white border border-dashed border-slate-300 rounded-xl p-6 text-center text-sm text-slate-500">
        No transactions yet. Add your first one above.
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Date
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Description
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Category
            </th>
            <th className="px-4 py-2 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Amount
            </th>
            <th className="px-4 py-2 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id || tx._id} className="border-b border-slate-100 last:border-none">
              <td className="px-4 py-2 align-middle text-slate-700">
                {new Date(tx.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 align-middle text-slate-700">
                {tx.description || '-'}
              </td>
              <td className="px-4 py-2 align-middle text-slate-700">
                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                  {tx.category}
                </span>
              </td>
              <td className="px-4 py-2 align-middle text-right font-medium">
                <span
                  className={
                    tx.type === 'income'
                      ? 'text-emerald-600'
                      : 'text-rose-600'
                  }
                >
                  {tx.type === 'income' ? '+' : '-'}Rs. {tx.amount.toFixed(2)}
                </span>
              </td>
              <td className="px-4 py-2 align-middle text-right text-xs">
                <button
                  onClick={() => onEdit(tx)}
                  className="inline-flex items-center px-2 py-1 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(tx.id || tx._id)}
                  className="inline-flex items-center px-2 py-1 rounded border border-rose-200 text-rose-600 hover:bg-rose-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
