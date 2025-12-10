import React, { createContext, useContext, useMemo, useState } from 'react';

const FinanceContext = createContext(null);

const initialCategories = [
  { id: 'cat-salary', name: 'Salary', type: 'income', icon: '💼', isDefault: true },
  { id: 'cat-food', name: 'Food', type: 'expense', icon: '🍔', isDefault: true },
  { id: 'cat-rent', name: 'Rent', type: 'expense', icon: '🏠', isDefault: true },
  { id: 'cat-shopping', name: 'Shopping', type: 'expense', icon: '🛒', isDefault: true },
];

export const FinanceProvider = ({ children }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [transactions, setTransactions] = useState([]);

  const addCategory = (category) => {
    setCategories((prev) => [
      ...prev,
      {
        id: `cat-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        isDefault: false,
        ...category,
      },
    ]);
  };

  const addTransaction = (tx) => {
    setTransactions((prev) => [
      ...prev,
      {
        id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        ...tx,
      },
    ]);
  };

  const updateTransaction = (id, updates) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updates } : tx))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const value = useMemo(
    () => ({
      categories,
      transactions,
      addCategory,
      addTransaction,
      updateTransaction,
      deleteTransaction,
    }),
    [categories, transactions]
  );

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return ctx;
};
