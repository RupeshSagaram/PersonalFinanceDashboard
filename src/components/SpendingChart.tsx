import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useFinance } from '../contexts/FinanceContext';
import { MonthlyData } from '../types';

const SpendingChart: React.FC = () => {
  const { transactions } = useFinance();

  const getMonthlyData = (): MonthlyData[] => {
    const monthlyMap = new Map<string, { income: number; expense: number }>();

    transactions.forEach(transaction => {
      const month = transaction.date.slice(0, 7); // YYYY-MM format
      const monthName = new Date(transaction.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });

      if (!monthlyMap.has(month)) {
        monthlyMap.set(month, { income: 0, expense: 0 });
      }

      const data = monthlyMap.get(month)!;
      if (transaction.type === 'income') {
        data.income += transaction.amount;
      } else {
        data.expense += transaction.amount;
      }
    });

    // Convert to array and sort by date
    return Array.from(monthlyMap.entries())
      .map(([month, data]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short' 
        }),
        ...data
      }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .slice(-6); // Show last 6 months
  };

  const getCategoryData = () => {
    const categoryMap = new Map<string, number>();

    transactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        const current = categoryMap.get(transaction.category) || 0;
        categoryMap.set(transaction.category, current + transaction.amount);
      });

    return Array.from(categoryMap.entries())
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 8); // Top 8 categories
  };

  const monthlyData = getMonthlyData();
  const categoryData = getCategoryData();

  if (transactions.length === 0) {
    return (
      <div className="card">
        <h2>Spending Analysis</h2>
        <p>No data available. Add some transactions to see charts!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-2">
      <div className="card">
        <h3>Monthly Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, '']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#28a745" 
              strokeWidth={2} 
              name="Income"
            />
            <Line 
              type="monotone" 
              dataKey="expense" 
              stroke="#dc3545" 
              strokeWidth={2} 
              name="Expenses"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3>Expenses by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="category" 
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis />
            <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']} />
            <Bar dataKey="amount" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingChart;