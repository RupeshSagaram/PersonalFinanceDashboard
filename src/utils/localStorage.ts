import { Transaction, Budget } from '../types';

const TRANSACTIONS_KEY = 'finance_transactions';
const BUDGETS_KEY = 'finance_budgets';

export const saveTransactions = (transactions: Transaction[]): void => {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};

export const loadTransactions = (): Transaction[] => {
  const stored = localStorage.getItem(TRANSACTIONS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveBudgets = (budgets: Budget[]): void => {
  localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
};

export const loadBudgets = (): Budget[] => {
  const stored = localStorage.getItem(BUDGETS_KEY);
  return stored ? JSON.parse(stored) : [];
};