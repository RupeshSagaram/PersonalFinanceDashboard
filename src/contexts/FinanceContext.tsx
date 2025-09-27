import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, Budget } from '../types';
import { saveTransactions, loadTransactions, saveBudgets, loadBudgets } from '../utils/localStorage';

interface FinanceContextType {
  transactions: Transaction[];
  budgets: Budget[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  deleteBudget: (id: string) => void;
  updateBudget: (id: string, budget: Omit<Budget, 'id'>) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

interface FinanceProviderProps {
  children: ReactNode;
}

export const FinanceProvider: React.FC<FinanceProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    setTransactions(loadTransactions());
    setBudgets(loadBudgets());
  }, []);

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    saveBudgets(budgets);
  }, [budgets]);

  const addTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...transactionData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addBudget = (budgetData: Omit<Budget, 'id'>) => {
    const budget: Budget = {
      ...budgetData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setBudgets(prev => [...prev, budget]);
  };

  const deleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
  };

  const updateBudget = (id: string, budgetData: Omit<Budget, 'id'>) => {
    setBudgets(prev => prev.map(b => b.id === id ? { ...budgetData, id } : b));
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        budgets,
        addTransaction,
        deleteTransaction,
        addBudget,
        deleteBudget,
        updateBudget,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};