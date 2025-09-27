import React from 'react';
import { FinanceProvider } from './contexts/FinanceContext';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import BudgetManager from './components/BudgetManager';
import SpendingChart from './components/SpendingChart';

const App: React.FC = () => {
  return (
    <FinanceProvider>
      <div className="container">
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#333', marginBottom: '10px' }}>
            Personal Finance Dashboard
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Track your income, expenses, and budgets all in one place
          </p>
        </header>

        <Dashboard />

        <div className="grid grid-2">
          <TransactionForm />
          <BudgetManager />
        </div>

        <SpendingChart />

        <TransactionList />
      </div>
    </FinanceProvider>
  );
};

export default App;