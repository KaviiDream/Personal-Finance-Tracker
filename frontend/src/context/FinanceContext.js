import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const FinanceContext = createContext(null);

const API_BASE = process.env.REACT_APP_API_BASE || '/api';

const initialCategories = [
  {
    id: 'cat-salary',
    name: 'Salary',
    type: 'income',
    icon: '💼',
    isDefault: true,
    monthlyBudget: 0,
  },
  {
    id: 'cat-food',
    name: 'Food',
    type: 'expense',
    icon: '🍔',
    isDefault: true,
    monthlyBudget: 20000,
  },
  {
    id: 'cat-rent',
    name: 'Rent',
    type: 'expense',
    icon: '🏠',
    isDefault: true,
    monthlyBudget: 50000,
  },
  {
    id: 'cat-shopping',
    name: 'Shopping',
    type: 'expense',
    icon: '🛒',
    isDefault: true,
    monthlyBudget: 15000,
  },
];

const initialGoals = [
  {
    id: 'goal-emergency',
    name: 'Emergency Fund',
    targetAmount: 200000,
    currentAmount: 50000,
  },
  {
    id: 'goal-travel',
    name: 'Travel Fund',
    targetAmount: 100000,
    currentAmount: 20000,
  },
];

export const FinanceProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const loadInitial = async () => {
      try {
        const [catRes, txRes, goalRes] = await Promise.all([
          axios.get(`${API_BASE}/categories`),
          axios.get(`${API_BASE}/transactions`),
          axios.get(`${API_BASE}/goals`),
        ]);

        setCategories(catRes.data || initialCategories);

        const txData = (txRes.data && txRes.data.transactions)
          ? txRes.data.transactions
          : txRes.data || [];
        setTransactions(txData);

        setGoals(goalRes.data || initialGoals);
      } catch (error) {
        console.error('Failed to load data from API, falling back to defaults', error);
        setCategories(initialCategories);
        setTransactions([]);
        setGoals(initialGoals);
      }
    };

    loadInitial();
  }, []);

  const addCategory = async (category) => {
    const payload = {
      name: category.name,
      type: category.type,
      icon: category.icon,
      monthlyBudget: Number(category.monthlyBudget || 0),
    };

    const res = await axios.post(`${API_BASE}/categories`, payload);
    const saved = {
      ...res.data,
      monthlyBudget:
        typeof res.data.monthlyBudget === 'number'
          ? res.data.monthlyBudget
          : Number(category.monthlyBudget || 0),
    };

    setCategories((prev) => [...prev, saved]);
    return saved;
  };

  const addTransaction = async (tx) => {
    const res = await axios.post(`${API_BASE}/transactions`, tx);
    const saved = res.data;
    setTransactions((prev) => [saved, ...prev]);
    return saved;
  };

  const updateTransaction = async (id, updates) => {
    const res = await axios.put(`${API_BASE}/transactions/${id}`, updates);
    const saved = res.data;
    setTransactions((prev) =>
      prev.map((tx) => ((tx._id || tx.id) === id ? saved : tx))
    );
    return saved;
  };

  const deleteTransaction = async (id) => {
    await axios.delete(`${API_BASE}/transactions/${id}`);
    setTransactions((prev) => prev.filter((tx) => (tx._id || tx.id) !== id));
  };

  const addGoal = async (goal) => {
    const payload = {
      name: goal.name,
      targetAmount: Number(goal.targetAmount || 0),
      currentAmount: Number(goal.currentAmount || 0),
    };

    const res = await axios.post(`${API_BASE}/goals`, payload);
    const saved = res.data;
    setGoals((prev) => [saved, ...prev]);
    return saved;
  };

  const updateGoal = async (id, updates) => {
    const res = await axios.put(`${API_BASE}/goals/${id}`, updates);
    const saved = res.data;
    setGoals((prev) =>
      prev.map((g) => ((g._id || g.id) === id ? saved : g))
    );
    return saved;
  };

  const deleteGoal = async (id) => {
    await axios.delete(`${API_BASE}/goals/${id}`);
    setGoals((prev) => prev.filter((g) => (g._id || g.id) !== id));
  };

  const value = useMemo(
    () => ({
      categories,
      transactions,
      goals,
      addCategory,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      addGoal,
      updateGoal,
      deleteGoal,
    }),
    [categories, transactions, goals]
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
