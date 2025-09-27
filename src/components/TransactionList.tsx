import React from 'react';
import { useFinance } from '../contexts/FinanceContext';

const TransactionList: React.FC = () => {
  const { transactions, deleteTransaction } = useFinance();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (transactions.length === 0) {
    return (
      <div className="card">
        <h2>Recent Transactions</h2>
        <p>No transactions yet. Add your first transaction above!</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Recent Transactions</h2>
      <div className="transaction-list">
        {transactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <div>
              <div style={{ fontWeight: 'bold' }}>{transaction.description}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {transaction.category} • {formatDate(transaction.date)}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span 
                className={`transaction-amount ${
                  transaction.type === 'income' ? 'transaction-income' : 'transaction-expense'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </span>
              <button 
                onClick={() => deleteTransaction(transaction.id)}
                className="btn btn-danger"
                style={{ padding: '5px 10px', fontSize: '12px' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;