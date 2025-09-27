import React, { useState } from 'react';
import { useFinance } from '../contexts/FinanceContext';
import { EXPENSE_CATEGORIES } from '../types';

const BudgetManager: React.FC = () => {
  const { budgets, transactions, addBudget, deleteBudget } = useFinance();
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !amount) {
      alert('Please fill in all fields');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    // Check if budget already exists for this category
    if (budgets.find(b => b.category === category)) {
      alert('Budget already exists for this category');
      return;
    }

    addBudget({
      category,
      amount: parsedAmount,
      period,
    });

    setCategory('');
    setAmount('');
  };

  const getBudgetProgress = (budget: any) => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const spent = transactions
      .filter(t => 
        t.type === 'expense' && 
        t.category === budget.category &&
        (budget.period === 'monthly' ? t.date.startsWith(currentMonth) : true)
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const percentage = (spent / budget.amount) * 100;
    return { spent, percentage: Math.min(percentage, 100) };
  };

  return (
    <div className="card">
      <h2>Budget Manager</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <label>Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {EXPENSE_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Budget Amount ($)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label>Period</label>
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value as 'monthly' | 'yearly')}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Budget
        </button>
      </form>

      {budgets.length === 0 ? (
        <p>No budgets set. Create your first budget above!</p>
      ) : (
        <div>
          <h3>Your Budgets</h3>
          {budgets.map(budget => {
            const { spent, percentage } = getBudgetProgress(budget);
            return (
              <div key={budget.id} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{budget.category}</strong>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      ${spent.toFixed(2)} / ${budget.amount.toFixed(2)} ({budget.period})
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteBudget(budget.id)}
                    className="btn btn-danger"
                    style={{ padding: '5px 10px', fontSize: '12px' }}
                  >
                    Delete
                  </button>
                </div>
                <div className="budget-progress">
                  <div 
                    className={`budget-progress-bar ${
                      percentage > 90 ? 'danger' : percentage > 70 ? 'warning' : ''
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  {percentage.toFixed(1)}% used
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BudgetManager;