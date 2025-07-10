# Chapa Frontend Interview Assignment

This project is a frontend assignment built with **React**, **TypeScript**, and **Vite**. It demonstrates a simple dashboard for managing users and transactions, with a focus on clean code, modular structure, and basic state management using Redux.

## Features

- **Authentication**: Basic login flow and user session management.
- **Dashboard**: Overview of wallet balance and recent transactions.
- **User Management**: View, manage, and display users in a table.
- **Transaction Summary**: Table view of user payment summaries.
- **Recent Transactions**: Table view of recent transactions for the logged-in user.
- **Reusable Components**: Shared table and page header components for consistent UI.
- **API Integration**: Fetches data from mock API endpoints.

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```
2. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
3. **Open in browser**
   Visit [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

- `src/pages/` — Main pages (Login, Dashboard, Users, Transactions, etc.)
- `src/features/` — Redux slices, selectors, and thunks
- `src/shared/components/` — Reusable UI components (Table, PageHeader, etc.)
- `src/api/` — API handlers and browser/server mocks
- `src/constants/` — Static data and links
- `src/types/` — TypeScript type definitions

## Challenge & Reflection

**Time:** Due to overtime working, I couldn't implement all the ideas I had in mind. Some features I wanted to add or improve include:

- Rebuilding the project in **Next.js**, which I'm more comfortable with
- Implementing a **light and dark theme** toggle
- Displaying data in a better styled **chart**
- Improving the **color theme** for a more polished look
- Preparing more **custom, reusable components** for the UI

Despite these constraints, the project demonstrates the core requirements and a modular approach. Thank you for reviewing my submission!

## Login Credentials

You can use the following credentials to log in to the app:

| Role         | Username     | Password   |
|--------------|-------------|------------|
| User         | alice       | userpass   |
| User         | bob         | userpass   |
| Admin        | admin       | adminpass  |
| Super Admin  | superadmin  | superpass  |
