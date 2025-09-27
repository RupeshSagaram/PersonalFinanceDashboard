import React from 'react';
import { useFinance } from '../contexts/FinanceContext';
import { formatINRCompact } from '../utils/currency';

const Dashboard: React.FC = () => {
  const { transactions } = useFinance();

  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
  
  const currentMonthTransactions = transactions.filter(t => 
    t.date.startsWith(currentMonth)
  );

  const totalIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netIncome = totalIncome - totalExpenses;

  const allTimeIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const allTimeExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-value" style={{ color: '#28a745' }}>
          {formatINRCompact(totalIncome)}
        </div>
        <div className="stat-label">This Month Income</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-value" style={{ color: '#dc3545' }}>
          {formatINRCompact(totalExpenses)}
        </div>
        <div className="stat-label">This Month Expenses</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-value" style={{ color: netIncome >= 0 ? '#28a745' : '#dc3545' }}>
          {formatINRCompact(netIncome)}
        </div>
        <div className="stat-label">Net Income (This Month)</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-value">
          {transactions.length}
        </div>
        <div className="stat-label">Total Transactions</div>
      </div>

      <div className="stat-card">
        <div className="stat-value" style={{ color: '#28a745' }}>
          {formatINRCompact(allTimeIncome)}
        </div>
        <div className="stat-label">All Time Income</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-value" style={{ color: '#dc3545' }}>
          {formatINRCompact(allTimeExpenses)}
        </div>
        <div className="stat-label">All Time Expenses</div>
      </div>
    </div>
  );
};

export default Dashboard;