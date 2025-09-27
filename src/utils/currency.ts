/**
 * Utility functions for currency formatting in Indian Rupees (INR)
 */

/**
 * Formats a number as Indian Rupees using the proper Indian numbering system
 * @param amount - The numeric amount to format
 * @returns Formatted currency string (e.g., "₹1,00,000.00")
 */
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formats a number as Indian Rupees without decimal places for whole numbers
 * @param amount - The numeric amount to format
 * @returns Formatted currency string (e.g., "₹1,00,000" or "₹1,00,000.50")
 */
export const formatINRCompact = (amount: number): string => {
  const isWholeNumber = amount % 1 === 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: isWholeNumber ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
};