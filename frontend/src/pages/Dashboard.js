import React, { useMemo, useState } from 'react';
import SummaryCards from '../components/SummaryCards';
import MonthFilter from '../components/MonthFilter';
import TransactionTable from '../components/TransactionTable';
import { MonthlyOverview } from '../components/MonthlyOverview';
import MonthlyCharts from '../components/MonthlyCharts';
import { useFinance } from '../context/FinanceContext';

const Dashboard = () => {
  const now = new Date();
  const { transactions } = useFinance();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [error, setError] = useState('');

  const yearTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const d = new Date(tx.date);
      return d.getFullYear() === year;
    });
  }, [transactions, year]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const d = new Date(tx.date);
      return d.getMonth() + 1 === month && d.getFullYear() === year;
    });
  }, [transactions, month, year]);

  const summary = useMemo(() => {
    try {
      const income = filteredTransactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + (t.amount || 0), 0);
      const expense = filteredTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + (t.amount || 0), 0);
      const balance = income - expense;
      return { income, expense, balance };
    } catch (e) {
      setError('Failed to calculate summary');
      return { income: 0, expense: 0, balance: 0 };
    }
  }, [filteredTransactions]);

  const handleFilterChange = ({ month: m, year: y }) => {
    if (m) setMonth(m);
    if (y) setYear(y);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>
          <p className="text-sm text-slate-500">
            Overview of your income, expenses, and balance.
          </p>
        </div>
      </div>

      <MonthFilter month={month} year={year} onChange={handleFilterChange} />

      {error && (
        <div className="mb-3 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}
      <>
        <SummaryCards summary={summary} />
        <MonthlyCharts year={year} transactions={yearTransactions} />
        <MonthlyOverview year={year} transactions={yearTransactions} />
        <h3 className="text-sm font-semibold text-slate-700 mb-2 mt-4">
          Recent Transactions
        </h3>
        <TransactionTable
          transactions={filteredTransactions.slice(0, 5)}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      </>
    </div>
  );
};

export default Dashboard;
