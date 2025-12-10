import React from 'react';
import SavingsGoals from '../components/SavingsGoals';

const GoalsPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Savings goals</h2>
          <p className="text-sm text-slate-500">
            Define and track your long-term savings targets.
          </p>
        </div>
      </div>

      <SavingsGoals />
    </div>
  );
};

export default GoalsPage;
