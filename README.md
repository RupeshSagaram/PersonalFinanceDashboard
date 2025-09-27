# Personal Finance Dashboard

A frontend-only React application for tracking personal income, expenses, and budgets. All data is stored locally in the browser using localStorage - no backend required!

## Features

- **Transaction Management**: Add, view, and delete income and expense transactions
- **Budget Tracking**: Set monthly or yearly budgets and track progress with visual indicators
- **Data Visualization**: Interactive charts showing spending trends and category breakdowns
- **Dashboard Overview**: Quick stats showing income, expenses, and net worth
- **Local Storage**: All data persists between sessions using browser localStorage
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- React 19 with TypeScript
- Vite for fast development and building
- Recharts for data visualization
- CSS3 for responsive styling
- LocalStorage for data persistence

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PersonalFinanceDashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Adding Transactions**: Select income or expense, enter amount, choose category, add description, and set date
2. **Setting Budgets**: Choose a category, set budget amount, and select monthly or yearly period
3. **Viewing Analytics**: Charts automatically update to show spending trends and category breakdowns
4. **Managing Data**: Delete transactions or budgets using the delete buttons

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main stats dashboard
│   ├── TransactionForm.tsx  # Add transaction form
│   ├── TransactionList.tsx  # Transaction history
│   ├── BudgetManager.tsx    # Budget management
│   └── SpendingChart.tsx    # Data visualization
├── contexts/
│   └── FinanceContext.tsx   # React context for state management
├── utils/
│   └── localStorage.ts      # LocalStorage utilities
├── types.ts             # TypeScript interfaces
├── App.tsx             # Main app component
├── main.tsx            # React entry point
└── index.css           # Global styles
```

## Contributing

This is a frontend-only project designed for personal use. Feel free to fork and customize for your needs!

## License

MIT License - feel free to use this project for personal or commercial purposes.