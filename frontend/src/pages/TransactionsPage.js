import React, { useMemo, useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionTable from '../components/TransactionTable';
import MonthFilter from '../components/MonthFilter';
import { useFinance } from '../context/FinanceContext';

const TransactionsPage = () => {
  const now = new Date();
  const { categories, transactions, addTransaction, updateTransaction, deleteTransaction } = useFinance();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const handleFilterChange = ({ month: m, year: y }) => {
    if (m) setMonth(m);
    if (y) setYear(y);
  };

  const handleCreateOrUpdate = async (data) => {
    setError('');
    try {
      if (editing) {
        const id = editing.id || editing._id;
        await updateTransaction(id, data);
        setEditing(null);
      } else {
        await addTransaction(data);
      }
    } catch (err) {
      setError('Failed to save transaction');
    }
  };

  const handleEdit = (tx) => {
    setEditing(tx);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
    } catch (err) {
      setError('Failed to delete transaction');
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const d = new Date(tx.date);
      return d.getMonth() + 1 === month && d.getFullYear() === year;
    });
  }, [transactions, month, year]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Transactions</h2>
          <p className="text-sm text-slate-500">
            Manage all your income and expense records.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-3 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <TransactionForm
        categories={categories}
        onSubmit={handleCreateOrUpdate}
        editing={!!editing}
        initialValues={editing}
      />

      <MonthFilter month={month} year={year} onChange={handleFilterChange} />

      <TransactionTable
        transactions={filteredTransactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TransactionsPage;
